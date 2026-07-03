// @ts-nocheck
"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  startTransition,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mic,
  MicOff,
  MessageSquare,
  Send,
  Square,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import AvatarLipSync from "./AvatarLipSync";
import defaultBotVideo from "./assets/default_bot.mp4";
import fallbackVideo from "./assets/Fallback.mp4";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000").replace(/\/api\/?$/, "");
/** Timeout for FAQ search API */
const CHATBOT_REQUEST_TIMEOUT_MS = 90000;
const EDGE_MARGIN = 24;
const BOT_INTERRUPT_GRACE_MS = 900;
const TEASER_BOTTOM_GAP = 2;
const MODAL_BOTTOM_GAP = 10;
const TEASER_WIDTH = 210;
const TEASER_HEIGHT = 160;
const FAQ_NOT_FOUND_TEXT = "sorry, i don't have that knowledge.";
const CHATBOT_SUPPORT_FALLBACK_MESSAGE = `That's a great question! For the best and most accurate answer,
I'd recommend connecting directly with our support team -
they'll be happy to help you right away.

You can reach them at support@lmsathena.com

Looking forward to seeing you learn and grow with us!`;
const TEASER_PROMPTS = [
  "Hey there!👋",
  "Ask anything!!",
  "I am ready to help!",
  "Chat with me",
  "Need help?",
];

const normalizeFaqSearchPayload = (raw) => {
  const envelope = raw || {};
  const payload = envelope?.data || envelope || {};
  const candidates = [
    payload,
    envelope,
    payload?.result,
    payload?.faq,
    payload?.item,
  ].filter(Boolean);

  const findFirstString = (obj, keys) => {
    if (!obj || typeof obj !== "object") return "";
    for (const key of keys) {
      const value = obj[key];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }
    return "";
  };

  const textKeys = ["response", "answer", "text", "message", "title"];
  const videoKeys = [
    "videoUrl",
    "video_url",
    "url",
    "video",
    "videoLink",
    "video_link",
  ];

  let text = "";
  let videoUrl = "";

  for (const item of candidates) {
    if (!text) text = findFirstString(item, textKeys);
    if (!videoUrl) videoUrl = findFirstString(item, videoKeys);

    if (!videoUrl && Array.isArray(item?.results) && item.results.length > 0) {
      videoUrl = findFirstString(item.results[0], videoKeys);
      if (!text) text = findFirstString(item.results[0], textKeys);
    }

    if (!videoUrl && Array.isArray(item?.data) && item.data.length > 0) {
      videoUrl = findFirstString(item.data[0], videoKeys);
      if (!text) text = findFirstString(item.data[0], textKeys);
    }

    if (!videoUrl && Array.isArray(item?.faqs) && item.faqs.length > 0) {
      videoUrl = findFirstString(item.faqs[0], videoKeys);
      if (!text) text = findFirstString(item.faqs[0], textKeys);
    }
  }

  if (!text) {
    text = videoUrl
      ? "I found a relevant training video for your question."
      : "I could not find a matching video right now.";
  }

  return { text, videoUrl };
};

const isFaqNotFoundResponse = (raw) => {
  const envelope = raw || {};
  const payload = envelope?.data || envelope || {};
  const foundFlag =
    payload?.found ??
    envelope?.found ??
    payload?.result?.found ??
    payload?.faq?.found;

  if (foundFlag === false) {
    return true;
  }

  const candidateText = [
    payload?.response,
    payload?.answer,
    payload?.text,
    envelope?.response,
    envelope?.answer,
    envelope?.text,
  ]
    .find((value) => typeof value === "string" && value.trim())
    ?.trim()
    .toLowerCase();

  return candidateText === FAQ_NOT_FOUND_TEXT;
};

const CHAT_QUICK_PROMPTS = [
  "What is Creditor Academy?",
  "How can you help me?",
  "Tell me about your courses",
];

const FloatingMiniChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [micStatus, setMicStatus] = useState("idle");
  const [micMuted, setMicMuted] = useState(true); // mic starts muted
  const [showMicBlockedDialog, setShowMicBlockedDialog] = useState(false);
  const [isMinimizedToBorder, setIsMinimizedToBorder] = useState(false);
  const [hasDraggedTeaser, setHasDraggedTeaser] = useState(false);
  const [hasDraggedModal, setHasDraggedModal] = useState(false);

  // Start with an empty conversation so only user/bot messages show
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const autoSendTimerRef = useRef(null);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true); // Speaker on by default
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if bot is currently speaking
  const [avatarVisemes, setAvatarVisemes] = useState([]);
  const [avatarAudioUrl, setAvatarAudioUrl] = useState("");
  const [faqVideoUrl, setFaqVideoUrl] = useState("");
  const [shouldPlayWelcomeVideo, setShouldPlayWelcomeVideo] = useState(false);
  const hasPlayedGreetingRef = useRef(false);
  const hasStartedMicAfterGreetingRef = useRef(false);
  const greetingHasStartedPlayingRef = useRef(false);
  const prevIsSpeakingRef = useRef(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [voiceActivity, setVoiceActivity] = useState(0); // 0-1 for voice level
  const [showInterruptHint, setShowInterruptHint] = useState(false);
  const [avatarReady, setAvatarReady] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);
  const currentAudioRef = useRef(null); // Track current audio element for interruption
  const streamingIntervalRef = useRef(null); // Track streaming interval
  const videoStreamSyncRef = useRef(null); // Sync FAQ transcript to video playback
  const intentionalStopRef = useRef(false); // Track if mic stop was intentional
  const isSpeakingRef = useRef(false);
  const committedVoiceTranscriptRef = useRef("");
  const interruptBotRef = useRef(null);
  const sendTranscribedTextRef = useRef(null);
  const currentBotUtteranceRef = useRef("");
  const lastBotSpeechStartRef = useRef(0);
  const sessionIdRef = useRef(0); // Increment to invalidate in-flight async work
  const stopSpeechRecognitionRef = useRef(null);

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    interruptBotRef.current = () => {
      setAvatarAudioUrl("");
      setAvatarVisemes([]);
      setFaqVideoUrl("");
      setShouldPlayWelcomeVideo(false);
      setIsSpeaking(false);
      setIsTyping(false);
      setShowInterruptHint(false);
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
        streamingIntervalRef.current = null;
      }
      videoStreamSyncRef.current = null;
      setMessages((prev) =>
        prev.map((msg) => (msg.streaming ? { ...msg, streaming: false } : msg)),
      );
    };
  });

  useEffect(() => {
    // Set initial positions to bottom-right while leaving room from edges
    if (typeof window !== "undefined") {
      const defaultWidth = 600;
      const defaultHeight = 340;
      setPosition({
        x: Math.max(
          EDGE_MARGIN,
          window.innerWidth - defaultWidth - EDGE_MARGIN,
        ),
        y: Math.max(
          MODAL_BOTTOM_GAP,
          window.innerHeight - defaultHeight - MODAL_BOTTOM_GAP,
        ),
      });

      setTeaserPosition({
        x: Math.max(
          EDGE_MARGIN,
          window.innerWidth - TEASER_WIDTH - EDGE_MARGIN,
        ),
        y: Math.max(
          TEASER_BOTTOM_GAP,
          window.innerHeight - TEASER_HEIGHT - TEASER_BOTTOM_GAP,
        ),
      });
    }

    // No browser speech synthesis initialization needed
  }, []);

  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isTeaserDragging, setIsTeaserDragging] = useState(false);
  // Always start at {x:0,y:0} so server and client render identical HTML.
  // The real window-based position is set in the useEffect below after mount.
  const [teaserPosition, setTeaserPosition] = useState({ x: 0, y: 0 });
  const [teaserDragOffset, setTeaserDragOffset] = useState({ x: 0, y: 0 });
  const [teaserPromptIndex, setTeaserPromptIndex] = useState(0);
  const chatContainerRef = useRef(null);
  const isAtBottomRef = useRef(true);
  const wasChatOpenRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const prevScrollTopRef = useRef(0);
  const isTeaserDraggedRef = useRef(false);
  const teaserDragStartRef = useRef({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);
  const sendingRef = useRef(false); // Prevent duplicate sends

  useEffect(() => {
    if (isOpen) return undefined;

    const delay = 3000 + Math.floor(Math.random() * 2000);
    const timer = window.setTimeout(() => {
      setTeaserPromptIndex((prev) => (prev + 1) % TEASER_PROMPTS.length);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isOpen, teaserPromptIndex]);
  const handleClose = useCallback(() => {
    // Fresh session on next open: stop everything and wipe state
    sessionIdRef.current += 1;

    // Stop bot output immediately
    const stopBot = interruptBotRef.current;
    if (stopBot) stopBot();

    // Stop mic/STT + VAD (component doesn't unmount on close)
    const stopMic = stopSpeechRecognitionRef.current;
    if (stopMic) stopMic();

    // Clear timers (extra safety)
    if (autoSendTimerRef.current) {
      clearTimeout(autoSendTimerRef.current);
      autoSendTimerRef.current = null;
    }
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
    }
    videoStreamSyncRef.current = null;

    // Reset UI/conversation
    setMessages([]);
    setInputValue("");
    setIsTyping(false);
    setIsSpeakerOn(true);
    setIsSpeaking(false);
    setAvatarAudioUrl("");
    setAvatarVisemes([]);
    setFaqVideoUrl("");
    setShouldPlayWelcomeVideo(false);
    setShowInterruptHint(false);
    setIsConnecting(false);
    setAvatarReady(false);
    setVoiceActivity(0);

    // Reset greeting/mic-after-greeting flow
    hasPlayedGreetingRef.current = false;
    hasStartedMicAfterGreetingRef.current = false;
    greetingHasStartedPlayingRef.current = false;
    prevIsSpeakingRef.current = false;

    // Reset interrupt helpers
    currentBotUtteranceRef.current = "";
    lastBotSpeechStartRef.current = 0;
    sendingRef.current = false;
    committedVoiceTranscriptRef.current = "";

    // Set minimized state to false so we display the default teaser in the bottom-right
    setIsMinimizedToBorder(false);
    setHasDraggedTeaser(false);
    setHasDraggedModal(false);

    // Close UI
    setIsChatOpen(false);
    setIsOpen(false);
  }, []);

  const syncTranscriptToVideoTime = useCallback((videoEl) => {
    const sync = videoStreamSyncRef.current;
    if (!sync || sessionIdRef.current !== sync.sessionIdAtStart) return;
    if (!videoEl?.duration || !Number.isFinite(videoEl.duration)) return;

    const progress = Math.min(1, Math.max(0, videoEl.currentTime / videoEl.duration));
    const wordIndex = Math.min(
      sync.words.length,
      Math.max(0, Math.floor(progress * sync.words.length)),
    );
    const displayedText = sync.words.slice(0, wordIndex).join(" ");
    const isComplete = wordIndex >= sync.words.length;

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === sync.msgId
          ? { ...msg, content: displayedText, streaming: !isComplete }
          : msg,
      ),
    );
  }, []);

  const finishVideoSyncedTranscript = useCallback(() => {
    const sync = videoStreamSyncRef.current;
    if (!sync) return;

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === sync.msgId
          ? { ...msg, content: sync.words.join(" "), streaming: false }
          : msg,
      ),
    );
    videoStreamSyncRef.current = null;
  }, []);

  // Search FAQ content and return answer + video url
  const getBotResponseWithLipSync = useCallback(async (text) => {
    if (process.env.NODE_ENV === "development") {
      console.log("🤖 Requesting bot response with TTS:", { question: text });
    }

    try {
      const requestBody = {
        query: text,
        question: text,
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        CHATBOT_REQUEST_TIMEOUT_MS,
      );
      if (process.env.NODE_ENV === "development") {
        console.log(
          "⏱️ Chatbot request timeout:",
          CHATBOT_REQUEST_TIMEOUT_MS / 1000,
          "s",
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/api/chatbot/faq/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest", // Help with CORS
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (process.env.NODE_ENV === "development") {
        console.log(
          "📡 Response status:",
          response.status,
          response.statusText,
        );
      }

      if (!response.ok) {
        let errorText = "";
        try {
          errorText = await response.text();
        } catch (e) {
          errorText = "Could not read error response";
        }
        console.error(
          "❌ Bot response failed:",
          response.status,
          response.statusText,
          errorText,
        );

        // Handle specific error cases
        if (response.status === 401 || response.status === 403) {
          throw new Error("Authentication required. Please log in.");
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Validate response structure
      if (!data) {
        throw new Error("Empty response from server");
      }

      if (isFaqNotFoundResponse(data)) {
        return {
          text: CHATBOT_SUPPORT_FALLBACK_MESSAGE,
          videoUrl: fallbackVideo,
          audioUrl: "",
          visemes: [],
          emotion: "neutral",
        };
      }

      const payload = normalizeFaqSearchPayload(data);

      if (process.env.NODE_ENV === "development") {
        console.log("✅ Bot response received:", {
          hasText: !!payload.text,
          hasAudio: !!payload.audioUrl,
          visemeCount: payload.visemes?.length || 0,
        });
      }

      return {
        text: payload.text,
        videoUrl: payload.videoUrl || "",
        audioUrl: "",
        visemes: [],
        emotion: "neutral",
      };
    } catch (error) {
      console.error("❌ getBotResponseWithLipSync failed:", error);
      throw error;
    }
  }, []);

  // Text-only fallback if FAQ search payload parsing fails
  const getBotResponse = useCallback(async (text) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/chatbot/faq/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for authentication
          body: JSON.stringify({
            query: text,
            question: text,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log("📥 Fallback response:", data);
      const payload = normalizeFaqSearchPayload(data);
      return payload.text || "I'm not sure, please try again.";
    } catch (err) {
      console.error("❌ getBotResponse failed:", err);
      return "I'm sorry, I'm having trouble responding right now. Could you try again?";
    }
  }, []);

  // Fetch full response payload so audio + visemes stay synced with the avatar
  const startBotResponse = useCallback(
    async (promptText) => {
      const sessionIdAtStart = sessionIdRef.current;
      try {
        if (process.env.NODE_ENV === "development") {
          console.log("🚀 Starting bot response for:", promptText);
        }
        const payload = await getBotResponseWithLipSync(promptText);
        if (sessionIdRef.current !== sessionIdAtStart) return;
        const msgId = Date.now() + Math.random();
        const fullText = payload.text;
        const words = fullText.split(" ");
        setFaqVideoUrl(payload.videoUrl || "");
        setShouldPlayWelcomeVideo(false);

        currentBotUtteranceRef.current = fullText || "";

        // Add message with empty content initially
        setMessages((prev) => [
          ...prev,
          {
            id: msgId,
            content: "",
            fullText: fullText,
            isUser: false,
            videoUrl: payload.videoUrl || "",
            streaming: true,
          },
        ]);

        console.log("🎭 Setting avatar data:", {
          hasAudio: !!payload.audioUrl,
          visemeCount: payload.visemes?.length ?? 0,
          emotion: payload.emotion,
          speakerOn: true,
        });

        // Use startTransition to prevent synchronous suspension
        startTransition(() => {
          if (sessionIdRef.current !== sessionIdAtStart) return;
          setAvatarVisemes([]);
          setAvatarAudioUrl("");
          setShowInterruptHint(false);
        });

        // Calculate approximate duration from visemes or use default
        const estimatedDuration =
          payload.visemes && payload.visemes.length > 0
            ? payload.visemes[payload.visemes.length - 1].time * 1000
            : words.length * 200; // 200ms per word as fallback

        let currentWordIndex = 0;

        // Clear any existing streaming interval
        if (streamingIntervalRef.current) {
          clearInterval(streamingIntervalRef.current);
          streamingIntervalRef.current = null;
        }

        if (payload.videoUrl) {
          // Reveal transcript in sync with FAQ video playback (not ahead of it)
          videoStreamSyncRef.current = {
            msgId,
            words,
            sessionIdAtStart,
          };
        } else {
          // Stream words progressively for avatar/audio-only responses
          streamingIntervalRef.current = setInterval(() => {
            if (sessionIdRef.current !== sessionIdAtStart) {
              clearInterval(streamingIntervalRef.current);
              streamingIntervalRef.current = null;
              return;
            }
            if (currentWordIndex < words.length) {
              const displayedText = words
                .slice(0, currentWordIndex + 1)
                .join(" ");
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === msgId ? { ...msg, content: displayedText } : msg,
                ),
              );
              currentWordIndex++;
            } else {
              clearInterval(streamingIntervalRef.current);
              streamingIntervalRef.current = null;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === msgId ? { ...msg, streaming: false } : msg,
                ),
              );
            }
          }, estimatedDuration / Math.max(words.length, 1));
        }

        // Only warn in development about missing data
        if (process.env.NODE_ENV === "development") {
          console.log("🎭 Avatar data set:", {
            hasAudio: !!payload.audioUrl,
            audioUrl: payload.audioUrl
              ? payload.audioUrl.substring(0, 100) + "..."
              : "MISSING",
            visemeCount: payload.visemes?.length || 0,
          });

          if (!payload.audioUrl) {
            console.warn(
              "⚠️ No audio URL received from backend - check API response",
            );
          }
          if (!payload.visemes?.length) {
            console.warn("⚠️ No visemes received from backend");
          }
        }
      } catch (err) {
        if (sessionIdRef.current !== sessionIdAtStart) return;
        if (process.env.NODE_ENV === "development") {
          console.error("❌ Backend response failed:", err);
        }
        const msgId = Date.now() + Math.random();
        setMessages((prev) => [
          ...prev,
          {
            id: msgId,
            content:
              "I'm sorry, I'm having trouble responding right now. Could you try again?",
            isUser: false,
            streaming: false,
          },
        ]);
      }
    },
    [getBotResponseWithLipSync],
  );

  // Stop speech recognition helper (used by multiple callbacks)
  const stopSpeechRecognition = useCallback(() => {
    console.log("🛑 Stopping speech recognition...");
    intentionalStopRef.current = true; // Mark as intentional

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        recognitionRef.current.abort(); // Force abort to ensure clean state
      } catch (err) {
        console.warn("⚠️ Error stopping recognition:", err);
      }
    }

    setIsRecording(false);
    setMicMuted(true);

    // Stop voice activity detection if available
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setVoiceActivity(0);
  }, []);

  useEffect(() => {
    stopSpeechRecognitionRef.current = stopSpeechRecognition;
  }, [stopSpeechRecognition]);

  const interruptBotPlayback = useCallback(() => {
    // Invalidate in-flight bot responses so interrupted media does not resume.
    sessionIdRef.current += 1;
    const stopBot = interruptBotRef.current;
    if (stopBot) stopBot();
    currentBotUtteranceRef.current = "";
    lastBotSpeechStartRef.current = 0;
  }, []);

  // Separate function for sending transcribed text automatically
  const sendTranscribedText = useCallback(
    async (transcribedText) => {
      if (sendingRef.current) return;
      if (transcribedText.trim() === "") return;
      sendingRef.current = true;
      committedVoiceTranscriptRef.current = transcribedText;

      // Voice interruption: stop current bot media before processing new user speech.
      interruptBotPlayback();

      // Add user message
      const userMessage = {
        id: Date.now(),
        content: transcribedText,
        isUser: true,
      };

      setMessages((prev) => [...prev, userMessage]);

      // Get bot response and update UI
      setIsTyping(true);

      try {
        await startBotResponse(transcribedText);
      } catch (error) {
        console.error("Error getting bot response:", error);
      } finally {
        setIsTyping(false);

        // Clear input
        setInputValue("");

        // Do NOT turn off mic here - keep it open for continuous conversation
        // The bot's speech will be ignored by the self-interrupt debounce logic
        sendingRef.current = false;
      }
    },
    [interruptBotPlayback, startBotResponse, stopSpeechRecognition],
  );

  useEffect(() => {
    sendTranscribedTextRef.current = sendTranscribedText;
  }, [sendTranscribedText]);

  const handleScroll = useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

      // If scrollTop is decreasing, the user is scrolling up manually.
      // So we cancel the programmatic scroll state.
      if (scrollTop < prevScrollTopRef.current) {
        isProgrammaticScrollRef.current = false;
      }
      prevScrollTopRef.current = scrollTop;

      if (isProgrammaticScrollRef.current) {
        if (isAtBottom) {
          isProgrammaticScrollRef.current = false;
        }
        return;
      }

      isAtBottomRef.current = isAtBottom;
    }
  }, []);

  const scrollToBottom = (force = false, behavior = "auto") => {
    if (chatContainerRef.current) {
      if (force || isAtBottomRef.current) {
        isProgrammaticScrollRef.current = true;
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: behavior,
        });
        isAtBottomRef.current = true;
      }
    }
  };

  // Auto-scroll to bottom when messages change or typing state changes
  useEffect(() => {
    const justOpened = isChatOpen && !wasChatOpenRef.current;
    wasChatOpenRef.current = isChatOpen;

    if (justOpened) {
      scrollToBottom(true, "auto");
    } else {
      const lastMessage = messages[messages.length - 1];
      const isUserMessage = lastMessage?.isUser;

      // Use smooth scroll for user's own message, auto (instant) for bot stream/typing
      const behavior = isUserMessage ? "smooth" : "auto";
      scrollToBottom(isUserMessage, behavior);
    }
  }, [messages, isTyping, isChatOpen]);

  const isDraggable = true;

  // Dragging functionality: allow dragging everywhere EXCEPT interactive components or message list
  const handleMouseDown = (e) => {
    if (!isDraggable) return;

    const target = e.nativeEvent?.target ?? e.target;

    // Do not drag if we clicked an interactive element (button, input, textarea, a, select)
    if (
      target.closest("button") ||
      target.closest("input") ||
      target.closest("textarea") ||
      target.closest("a") ||
      target.closest("select")
    ) {
      return;
    }

    // Do not drag if we clicked inside the scrollable message container
    if (chatContainerRef.current && chatContainerRef.current.contains(target)) {
      return;
    }

    setDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDraggable || !dragging) return;

    // Calculate new position with boundaries
    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;

    // Keep within screen boundaries
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Get current dimensions based on size and chat panel state
    const currentDimensions = getSizeDimensions();
    const elementWidth = parseFloat(currentDimensions.width);
    const elementHeight = parseFloat(currentDimensions.height);

    newX = Math.max(0, Math.min(screenWidth - elementWidth, newX));
    newY = Math.max(0, Math.min(screenHeight - elementHeight, newY));

    setPosition({ x: newX, y: newY });
    setHasDraggedModal(true);
  };

  const handleMouseUp = () => {
    if (!isDraggable) return;
    setDragging(false);
  };

  // Add event listeners for dragging
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging]);

  // Teaser drag functionality
  const handleTeaserMouseDown = (e) => {
    teaserDragStartRef.current = { x: e.clientX, y: e.clientY };
    isTeaserDraggedRef.current = false;
    setIsTeaserDragging(true);
    setTeaserDragOffset({
      x: e.clientX - teaserPosition.x,
      y: e.clientY - teaserPosition.y,
    });
  };

  const handleTeaserMouseMove = (e) => {
    if (!isTeaserDragging) return;

    // Calculate new position with boundaries
    let newX = e.clientX - teaserDragOffset.x;
    let newY = e.clientY - teaserDragOffset.y;

    // Keep within screen boundaries
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    newX = Math.max(0, Math.min(screenWidth - TEASER_WIDTH, newX));
    newY = Math.max(0, Math.min(screenHeight - TEASER_HEIGHT, newY));

    // If moved more than 5px, mark as dragged
    const startX = teaserDragStartRef.current.x;
    const startY = teaserDragStartRef.current.y;
    if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
      isTeaserDraggedRef.current = true;
      setHasDraggedTeaser(true);
    }

    setTeaserPosition({ x: newX, y: newY });
  };

  const handleTeaserMouseUp = () => {
    setIsTeaserDragging(false);
  };

  const handleTeaserClick = (e) => {
    if (isTeaserDraggedRef.current) {
      return;
    }
    setIsOpen(true);
    setShouldPlayWelcomeVideo(true);
  };

  // Add event listeners for teaser dragging
  useEffect(() => {
    if (isTeaserDragging) {
      window.addEventListener("mousemove", handleTeaserMouseMove);
      window.addEventListener("mouseup", handleTeaserMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleTeaserMouseMove);
        window.removeEventListener("mouseup", handleTeaserMouseUp);
      };
    }
  }, [isTeaserDragging]);

  // Get dimensions based on size
  const getSizeDimensions = useCallback(() => {
    return {
      width: isChatOpen ? "800px" : "600px",
      height: "340px",
    };
  }, [isChatOpen]);

  // Keep avatar ready while using static poster/video mode.

  // Keep the widget within the viewport when sizes change
  const clampPositionToViewport = useCallback(() => {
    if (typeof window === "undefined") return;

    const dimensions = getSizeDimensions();
    const width = parseFloat(dimensions.width);
    const height = parseFloat(dimensions.height);
    const maxX = Math.max(EDGE_MARGIN, window.innerWidth - width - EDGE_MARGIN);
    const maxY = Math.max(
      MODAL_BOTTOM_GAP,
      window.innerHeight - height - MODAL_BOTTOM_GAP,
    );

    if (hasDraggedModal) {
      setPosition((prev) => ({
        x: Math.min(Math.max(EDGE_MARGIN, prev.x), maxX),
        y: Math.min(Math.max(MODAL_BOTTOM_GAP, prev.y), maxY),
      }));
    } else {
      setPosition({
        x: maxX,
        y: maxY,
      });
    }
  }, [getSizeDimensions, hasDraggedModal]);

  useEffect(() => {
    clampPositionToViewport();
  }, [isChatOpen, clampPositionToViewport]);

  // Handle window resize by clamping positions to viewport to avoid off-screen elements
  const handleResize = useCallback(() => {
    if (typeof window === "undefined") return;

    // Clamp teaser position
    if (hasDraggedTeaser) {
      setTeaserPosition((prev) => {
        const maxX = Math.max(
          EDGE_MARGIN,
          window.innerWidth - TEASER_WIDTH - EDGE_MARGIN,
        );
        const maxY = Math.max(
          TEASER_BOTTOM_GAP,
          window.innerHeight - TEASER_HEIGHT - TEASER_BOTTOM_GAP,
        );
        return {
          x: Math.min(Math.max(EDGE_MARGIN, prev.x), maxX),
          y: Math.min(Math.max(TEASER_BOTTOM_GAP, prev.y), maxY),
        };
      });
    } else {
      setTeaserPosition({
        x: Math.max(
          EDGE_MARGIN,
          window.innerWidth - TEASER_WIDTH - EDGE_MARGIN,
        ),
        y: Math.max(
          TEASER_BOTTOM_GAP,
          window.innerHeight - TEASER_HEIGHT - TEASER_BOTTOM_GAP,
        ),
      });
    }

    // Clamp open chatbot position
    const dimensions = getSizeDimensions();
    const w = parseFloat(dimensions.width);
    const h = parseFloat(dimensions.height);
    const maxX = Math.max(EDGE_MARGIN, window.innerWidth - w - EDGE_MARGIN);
    const maxY = Math.max(
      MODAL_BOTTOM_GAP,
      window.innerHeight - h - MODAL_BOTTOM_GAP,
    );

    if (hasDraggedModal) {
      setPosition((prev) => ({
        x: Math.min(Math.max(EDGE_MARGIN, prev.x), maxX),
        y: Math.min(Math.max(MODAL_BOTTOM_GAP, prev.y), maxY),
      }));
    } else {
      setPosition({
        x: maxX,
        y: maxY,
      });
    }
  }, [getSizeDimensions, hasDraggedTeaser, hasDraggedModal]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Speaker functionality
  const toggleSpeaker = useCallback(async () => {
    const newSpeakerState = !isSpeakerOn;
    setIsSpeakerOn(newSpeakerState);

    // Resume audio context on user interaction if needed
    if (newSpeakerState && audioContextRef.current?.state === "suspended") {
      try {
        await audioContextRef.current.resume();
        console.log("🔊 Audio context resumed");
      } catch (err) {
        console.warn("⚠️ Failed to resume audio context:", err);
      }
    }

    console.log("🔊 Speaker toggled:", newSpeakerState ? "ON" : "OFF");
  }, [isSpeakerOn]);

  const requestMicPermission = async () => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      console.error("❌ getUserMedia not supported");
      setMicStatus("unsupported");
      return false;
    }

    try {
      setMicStatus("prompt");
      console.log("🎤 Requesting microphone permission...");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: { ideal: true },
          noiseSuppression: { ideal: true },
          autoGainControl: { ideal: true },
        },
      });

      console.log("✅ Microphone access granted");
      stream.getTracks().forEach((t) => t.stop());
      setMicStatus("allowed");
      setMicMuted(false);
      return true;
    } catch (err) {
      console.error("Microphone access error:", err);
      if (err.name === "NotAllowedError") {
        console.error("❌ Microphone permission denied by user");
        setMicStatus("denied");
        setMicMuted(true);
        setShowMicBlockedDialog(true);
      } else if (err.name === "NotFoundError") {
        console.error("❌ No microphone found");
        setMicStatus("notfound");
        setMicMuted(true);
        setShowMicBlockedDialog(true);
      } else {
        console.error("❌ Microphone error:", err);
        setMicStatus("error");
        setMicMuted(true);
        setShowMicBlockedDialog(true);
      }
      return false;
    }
  };

  const normalizeText = (text) =>
    (text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const isLikelySelfTranscript = (transcript, botUtterance) => {
    const t = normalizeText(transcript);
    const b = normalizeText(botUtterance);

    if (!t || !b) return false;
    if (b.includes(t)) return true;

    const transcriptWords = t.split(" ");
    const botWordsSet = new Set(b.split(" "));
    let overlap = 0;

    for (const w of transcriptWords) {
      if (botWordsSet.has(w)) overlap++;
    }

    const ratio = overlap / transcriptWords.length;
    return ratio >= 0.7;
  };

  const startSpeechRecognition = useCallback(async () => {
    // Prevent starting if already recording
    if (isRecording) {
      console.log("🎤 Speech recognition already active");
      return;
    }

    if (!recognitionRef.current) {
      // Create recognition instance directly instead of calling init function
      if (
        !("webkitSpeechRecognition" in window) &&
        !("SpeechRecognition" in window)
      ) {
        setMicStatus("unsupported");
        return;
      }

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true; // Changed to true to keep listening
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const combinedTranscript = (
          finalTranscript || interimTranscript
        ).trim();
        const isBotSpeaking = isSpeakingRef.current;
        const committedTranscript = committedVoiceTranscriptRef.current.trim();
        const normalizedCombinedTranscript = normalizeText(combinedTranscript);
        const normalizedCommittedTranscript =
          normalizeText(committedTranscript);

        if (
          normalizedCommittedTranscript &&
          normalizedCombinedTranscript === normalizedCommittedTranscript
        ) {
          return;
        }

        if (
          normalizedCommittedTranscript &&
          normalizedCombinedTranscript &&
          normalizedCombinedTranscript !== normalizedCommittedTranscript
        ) {
          committedVoiceTranscriptRef.current = "";
        }

        // Update the input field with the recognized text only while it is still being composed.
        setInputValue(finalTranscript + interimTranscript);

        // If nothing meaningful yet, do nothing
        if (!combinedTranscript) {
          return;
        }

        // If bot is speaking, optionally interrupt based on STT, with grace window and self-speech filtering
        if (isBotSpeaking) {
          const now = Date.now();
          const withinGraceWindow =
            lastBotSpeechStartRef.current &&
            now - lastBotSpeechStartRef.current < BOT_INTERRUPT_GRACE_MS;

          if (withinGraceWindow) {
            // Ignore very early transcripts right after bot starts speaking
            return;
          }

          const currentBotText = currentBotUtteranceRef.current || "";
          if (isLikelySelfTranscript(combinedTranscript, currentBotText)) {
            // Likely transcription of the bot's own speech – ignore
            return;
          }

          // Real user barge-in while bot is speaking – stop bot immediately.
          // We'll let the normal non-speaking path handle sending once a final transcript is ready.
          if (autoSendTimerRef.current) {
            clearTimeout(autoSendTimerRef.current);
            autoSendTimerRef.current = null;
          }
          interruptBotPlayback();
          return;
        }

        // From here, bot is not speaking – use final transcript with debounce to send
        const trimmedFinal = finalTranscript.trim();
        if (!trimmedFinal) {
          return;
        }

        // When bot is not speaking, use debounce to auto-send after user stops talking
        if (autoSendTimerRef.current) {
          clearTimeout(autoSendTimerRef.current);
        }

        autoSendTimerRef.current = setTimeout(() => {
          setInputValue(trimmedFinal);
          sendTranscribedText(trimmedFinal); // Send the transcribed message automatically
        }, 1500); // 1.5 seconds delay after user stops speaking
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error, event);

        // Handle specific error types
        switch (event.error) {
          case "no-speech":
            // Don't treat this as an error, just continue listening
            if (process.env.NODE_ENV === "development") {
              console.log("🔇 No speech detected, continuing to listen...");
            }
            // Don't stop recognition for no-speech, just continue
            return;
          case "audio-capture":
            console.error("❌ Microphone access failed");
            setMicStatus("error");
            break;
          case "not-allowed":
            console.error("❌ Microphone permission denied");
            setMicStatus("denied");
            break;
          default:
            console.error("❌ Speech recognition error:", event.error);
            break;
        }

        // Only stop recognition for actual errors (not no-speech)
        stopSpeechRecognition();
      };

      recognitionRef.current.onend = () => {
        // When recognition ends...
        if (intentionalStopRef.current) {
          // If intentional, just update state
          if (isRecording) {
            setIsRecording(false);
            setMicMuted(true);
          }
        } else {
          // If UNINTENTIONAL (and we want to record), restart it!
          console.log("🔄 Mic stopped unintentionally, restarting...");
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.warn("Fast restart failed, scheduling restart:", e);
            setTimeout(() => {
              if (!intentionalStopRef.current && recognitionRef.current) {
                try {
                  recognitionRef.current.start();
                } catch (retryErr) {
                  // worst case, verify state
                  if (isRecording) {
                    setIsRecording(false);
                    setMicMuted(true);
                  }
                }
              }
            }, 300);
          }
        }

        // Clear timer when recognition ends
        if (autoSendTimerRef.current) {
          clearTimeout(autoSendTimerRef.current);
        }
      };
    }

    try {
      // Check if recognition is already running to prevent InvalidStateError
      if (recognitionRef.current) {
        if (isRecording) {
          console.log("⚠️ Speech recognition already running, skipping start");
          return; // Don't try to start if already recording
        }

        // Check the readyState to ensure recognition is ready
        try {
          recognitionRef.current.abort(); // Ensure clean state
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (e) {
          // Ignore abort errors
        }
      }

      if (process.env.NODE_ENV === "development") {
        console.log("🎤 Starting speech recognition...");
      }
      intentionalStopRef.current = false; // Reset intentional stop flag
      recognitionRef.current.start();
      setIsRecording(true);
      setMicMuted(false); // Mic is now active
      // Start voice activity detection inline to avoid TDZ
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContextRef.current = new (
          window.AudioContext || window.webkitAudioContext
        )();
        analyserRef.current = audioContextRef.current.createAnalyser();
        microphoneRef.current =
          audioContextRef.current.createMediaStreamSource(stream);

        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        microphoneRef.current.connect(analyserRef.current);

        const detectVoice = () => {
          if (!analyserRef.current) return;

          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          const normalizedLevel = Math.min(average / 128, 1);

          setVoiceActivity(normalizedLevel);

          // Voice activity level tracking only

          animationFrameRef.current = requestAnimationFrame(detectVoice);
        };

        detectVoice();
      } catch (error) {
        console.error("Voice activity detection failed:", error);
      }
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      setMicMuted(true);
    }
  }, [
    interruptBotPlayback,
    isRecording,
    sendTranscribedText,
    stopSpeechRecognition,
  ]);

  // Keep mic open when bot is speaking
  useEffect(() => {
    if (isSpeaking && micStatus === "allowed" && !isRecording && !micMuted) {
      // Start mic when bot starts speaking if not already recording and not muted
      const timer = setTimeout(() => {
        if (!isRecording && micStatus === "allowed") {
          startSpeechRecognition();
        }
      }, 300); // Small delay to prevent conflicts

      return () => clearTimeout(timer);
    }
  }, [isSpeaking, micStatus, isRecording, micMuted, startSpeechRecognition]);

  // Hide interrupt hint when bot stops speaking
  useEffect(() => {
    if (!isSpeaking) {
      setShowInterruptHint(false);
    }
  }, [isSpeaking]);

  // Auto-enable mic when bot starts speaking (skip during initial greeting so we don't capture bot's own voice)
  useEffect(() => {
    if (
      isSpeaking &&
      micStatus === "allowed" &&
      hasStartedMicAfterGreetingRef.current
    ) {
      setTimeout(() => {
        if (!isRecording) {
          setMicMuted(false);
          startSpeechRecognition();
        }
      }, 800); // Delay to let bot audio start first
    }
  }, [isSpeaking, micStatus, isRecording, startSpeechRecognition]);

  const startMicAfterGreeting = useCallback(async () => {
    if (hasStartedMicAfterGreetingRef.current) return;
    hasStartedMicAfterGreetingRef.current = true;
    const allowed = await requestMicPermission();
    if (allowed) {
      startSpeechRecognition();
    }
  }, [requestMicPermission, startSpeechRecognition]);

  const handleWelcomeVideoEnd = useCallback(async () => {
    setShouldPlayWelcomeVideo(false);
    setIsSpeakerOn(true);
    hasStartedMicAfterGreetingRef.current = true;

    const allowed =
      micStatus === "allowed" ? true : await requestMicPermission();

    if (!allowed) return;

    setMicMuted(false);

    if (!isRecording) {
      startSpeechRecognition();
    }
  }, [isRecording, micStatus, requestMicPermission, startSpeechRecognition]);

  // Formal greeting text shown and spoken when the widget opens
  const FORMAL_GREETING =
    "Hi, I am Paul, your helping assistant. How can I help you?";

  // Play greeting TTS only (no new message) so avatar speaks the formal greeting
  const playGreetingTTS = useCallback(async () => {
    const sessionIdAtStart = sessionIdRef.current;
    setIsConnecting(true);
    try {
      const payload = await getBotResponseWithLipSync(
        `Reply with only this exact sentence, nothing else: ${FORMAL_GREETING}`,
      );
      if (sessionIdRef.current !== sessionIdAtStart) return;
      startTransition(() => {
        if (sessionIdRef.current !== sessionIdAtStart) return;
        setIsSpeakerOn(true);
        setAvatarVisemes(payload.visemes || []);
        setAvatarAudioUrl(payload.audioUrl || "");
        setShowInterruptHint(true);
        lastBotSpeechStartRef.current = Date.now();
      });
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn("⚠️ Greeting TTS failed, text already shown:", err);
      }
    } finally {
      if (sessionIdRef.current !== sessionIdAtStart) return;
      setIsConnecting(false);
    }
  }, [getBotResponseWithLipSync]);

  // Mark that greeting has started playing (so we know when it ends)
  useEffect(() => {
    if (isSpeaking && hasPlayedGreetingRef.current) {
      greetingHasStartedPlayingRef.current = true;
    }
  }, [isSpeaking]);

  // Start mic only after greeting has finished (so we don't capture bot's own voice)
  useEffect(() => {
    const wasSpeaking = prevIsSpeakingRef.current;
    prevIsSpeakingRef.current = isSpeaking;

    if (wasSpeaking && !isSpeaking && greetingHasStartedPlayingRef.current) {
      if (!hasStartedMicAfterGreetingRef.current) {
        startMicAfterGreeting();
      }
      greetingHasStartedPlayingRef.current = false;
    }
  }, [isSpeaking, startMicAfterGreeting]);

  // Opening the widget should not trigger greeting TTS or any bot API calls.
  useEffect(() => {
    if (isOpen && !hasPlayedGreetingRef.current) {
      hasPlayedGreetingRef.current = true;
      hasStartedMicAfterGreetingRef.current = false;
      greetingHasStartedPlayingRef.current = false;
    }
  }, [isOpen]);

  // Typed send handler (placed after startSpeechRecognition to avoid TDZ)
  const handleSendMessage = useCallback(
    async (autoSend = false) => {
      if (sendingRef.current) return;
      if (inputValue.trim() === "") return;
      sendingRef.current = true;

      // Typed interruption: stop current bot media immediately.
      interruptBotPlayback();

      // Add user message
      const userMessage = {
        id: Date.now(),
        content: inputValue,
        isUser: true,
      };

      setMessages((prev) => [...prev, userMessage]);

      // Store the current mic state before clearing input
      const wasRecording = isRecording;
      setInputValue("");

      // Get bot response and update UI
      setIsTyping(true);

      try {
        await startBotResponse(inputValue);
      } catch (error) {
        console.error("Error getting bot response:", error);
      } finally {
        setIsTyping(false);

        // If mic was active before sending and not auto-sending, restart speech recognition
        if (!autoSend && wasRecording && micStatus === "allowed") {
          setTimeout(() => {
            startSpeechRecognition();
          }, 500); // Small delay to allow UI to update
        }
        sendingRef.current = false;
      }
    },
    [
      inputValue,
      interruptBotPlayback,
      isRecording,
      micStatus,
      startSpeechRecognition,
      startBotResponse,
    ],
  );

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const toggleMic = useCallback(async () => {
    if (
      micStatus === "denied" ||
      micStatus === "notfound" ||
      micStatus === "unsupported" ||
      micStatus === "error"
    ) {
      setShowMicBlockedDialog(true);
      // Still allow user to try again after seeing instructions
      return;
    }

    if (
      micStatus === "idle" ||
      micStatus === "denied" ||
      micStatus === "notfound" ||
      micStatus === "unsupported" ||
      micStatus === "error"
    ) {
      await requestMicPermission();
    } else if (micStatus === "allowed") {
      if (isRecording) {
        // Stop speech recognition
        stopSpeechRecognition();
      } else {
        // Start speech recognition
        startSpeechRecognition();
      }
    } else if (micStatus === "prompt") {
      // User is already being prompted, do nothing
      return;
    }
  }, [
    micStatus,
    isRecording,
    requestMicPermission,
    startSpeechRecognition,
    stopSpeechRecognition,
  ]);

  const modalAnim = {
    initial: { opacity: 0, scale: 0.9, y: 40 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 30 },
    transition: { type: "spring", stiffness: 260, damping: 22 },
  };

  const showVoiceBar = micStatus === "allowed" && !micMuted;

  // Derived state: check if bot is currently responding
  const isBotResponding =
    isSpeaking ||
    isTyping ||
    !!avatarAudioUrl ||
    !!faqVideoUrl ||
    !!shouldPlayWelcomeVideo;

  // Handler for stop button - interrupts current bot response
  const handleStopBotResponse = useCallback(() => {
    interruptBotPlayback();
    setIsTyping(false);
    setAvatarAudioUrl("");
    setAvatarVisemes([]);
    setFaqVideoUrl("");
    setShouldPlayWelcomeVideo(false);
    setIsSpeaking(false);
    setShowInterruptHint(false);
  }, [interruptBotPlayback]);

  // Handler for send/stop button
  const handleSendOrStop = useCallback(() => {
    if (isBotResponding) {
      // First action: stop the current bot response
      handleStopBotResponse();
      // Button will automatically switch to send mode after bot stops
    } else {
      // Second action: send the message (after bot has been stopped)
      if (inputValue.trim() !== "") {
        handleSendMessage();
      }
    }
  }, [isBotResponding, inputValue, handleStopBotResponse, handleSendMessage]);

  // Cleanup on unmount to prevent memory leaks and state conflicts
  useEffect(() => {
    return () => {
      console.log("🧹 Cleaning up FloatingMiniChatbot...");

      // Stop speech recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
          recognitionRef.current.abort();
        } catch (err) {
          console.warn("Cleanup recognition error:", err);
        }
      }

      // Clean up audio context
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }

      // Clear timers
      if (autoSendTimerRef.current) {
        clearTimeout(autoSendTimerRef.current);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Clear streaming interval
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Floating teaser */}
      {!isOpen && !isMinimizedToBorder && (
        <motion.div
          className="fixed z-[9999] w-[210px] h-[160px] group"
          style={{
            position: "fixed",
            top: `${teaserPosition.y}px`,
            left: `${teaserPosition.x}px`,
            bottom: "auto",
            right: "auto",
            cursor: isTeaserDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleTeaserMouseDown}
          onDragStart={(e) => e.preventDefault()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={teaserPromptIndex}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="absolute right-2 top-0 w-max rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-[13px] font-semibold leading-5 text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
            >
              {TEASER_PROMPTS[teaserPromptIndex]}
              <span className="absolute bottom-[-6px] right-10 h-3 w-3 rotate-45 border-r border-b border-slate-200/80 bg-white" />
            </motion.div>
          </AnimatePresence>

          {/* Hover Close Button to minimize to border */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimizedToBorder(true);
            }}
            className="absolute right-1 top-[52px] z-[10000] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white"
            style={{ cursor: "pointer" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            onClick={handleTeaserClick}
            className="absolute bottom-0 right-0 flex h-[104px] w-[104px] items-center justify-center overflow-hidden rounded-full border border-white/70 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.20)]"
            style={{ cursor: "inherit" }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.22)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <video
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 2%", transform: "scale(1.001)" }}
              src={defaultBotVideo}
              playsInline
              autoPlay
              loop
              muted
              preload="auto"
            />
            <div className="absolute inset-0 rounded-full ring-4 ring-white/75" />
          </motion.button>
        </motion.div>
      )}

      {/* Very small border bubble when minimized */}
      {!isOpen && isMinimizedToBorder && (
        <motion.button
          onClick={() => {
            setIsOpen(true);
            setShouldPlayWelcomeVideo(true);
          }}
          className="fixed right-2 top-1/2 -translate-y-1/2 z-[9999] flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.18)]"
          style={{ cursor: "pointer" }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
        >
          <video
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 2%", transform: "scale(1.001)" }}
            src={defaultBotVideo}
            playsInline
            autoPlay
            loop
            muted
            preload="auto"
          />
          <div className="absolute inset-0 rounded-full ring-2 ring-white/75" />
        </motion.button>
      )}

      {/* Main modal - no overlay version */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...modalAnim}
            className="fixed inset-0 z-50 pointer-events-none"
            onDragStart={(e) => e.preventDefault()}
          >
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-transparent shadow-[0_28px_90px_rgba(0,0,0,0.45)] ring-1 ring-white/12"
              style={{
                position: "absolute",
                top: `${position.y}px`,
                left: `${position.x}px`,
                transform: "none",
                width: getSizeDimensions().width,
                height: getSizeDimensions().height,
                cursor: "default",
                pointerEvents: "auto",
              }}
              draggable={false}
              onMouseDown={isDraggable ? handleMouseDown : undefined}
              whileHover={{}}
              onDragStart={(e) => e.preventDefault()}
            >
              {/* Fully transparent container */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none" />

              {/* Connecting overlay – theme-neutral glass (no blue) */}
              {isOpen && isConnecting && (
                <div className="absolute inset-0 z-40 flex items-center justify-center rounded-3xl bg-black/45 backdrop-blur-md border border-white/10">
                  <div className="flex flex-col items-center gap-4 text-white">
                    <div className="h-12 w-12 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <p className="text-lg font-medium">Connecting...</p>
                  </div>
                </div>
              )}

              <div className="relative flex h-full w-full bg-transparent">
                {/* Avatar side - only this area shows grab cursor for dragging */}
                <div
                  className={`${isChatOpen ? "w-[60%]" : "w-full"} relative h-full min-w-0 bg-black`}
                  style={{
                    cursor: isDraggable
                      ? dragging
                        ? "grabbing"
                        : "grab"
                      : "default",
                  }}
                >
                  {isSpeaking && (
                    <motion.div
                      className="absolute inset-6 rounded-full border-2 border-emerald-400/60"
                      animate={{
                        scale: [1, 1.08, 1],
                        opacity: [0.25, 0.7, 0.25],
                      }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                  )}
                  <div className="relative h-full w-full flex items-center justify-center">
                    {faqVideoUrl ? (
                      <video
                        key={faqVideoUrl}
                        src={faqVideoUrl}
                        autoPlay
                        playsInline
                        muted={!isSpeakerOn}
                        onLoadedMetadata={(e) =>
                          syncTranscriptToVideoTime(e.currentTarget)
                        }
                        onTimeUpdate={(e) =>
                          syncTranscriptToVideoTime(e.currentTarget)
                        }
                        onPlaying={(e) =>
                          syncTranscriptToVideoTime(e.currentTarget)
                        }
                        onEnded={() => {
                          finishVideoSyncedTranscript();
                          setFaqVideoUrl("");
                          setShouldPlayWelcomeVideo(false);
                        }}
                        onError={() => {
                          finishVideoSyncedTranscript();
                          setFaqVideoUrl("");
                          setShouldPlayWelcomeVideo(false);
                        }}
                        className="h-full w-full object-cover pointer-events-none"
                        tabIndex={-1}
                      />
                    ) : (
                      <motion.div
                        className="flex h-full w-full items-center justify-center overflow-hidden"
                        style={{
                          transform:
                            "perspective(1100px) rotateY(-4deg) rotateX(2deg) scale(1.025)",
                          transformOrigin: "center",
                        }}
                      // Removed animations that cause WebGL context instability
                      >
                        <AvatarLipSync
                          key="stable-avatar" // Stable key prevents unnecessary remounts
                          audioUrl={avatarAudioUrl}
                          visemes={avatarVisemes}
                          isMuted={!isSpeakerOn}
                          autoPlayWelcomeVideo={
                            shouldPlayWelcomeVideo && !avatarAudioUrl
                          }
                          onWelcomeVideoEnd={handleWelcomeVideoEnd}
                          onSpeakingChange={setIsSpeaking}
                          onLoaded={() => setAvatarReady(true)}
                          className="w-full h-full"
                        />
                      </motion.div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/28 via-black/10 to-transparent pointer-events-none" />
                  </div>

                  {showMicBlockedDialog && (
                    <div className="pointer-events-none absolute inset-0 z-30 p-0">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 12 }}
                        className="pointer-events-auto relative flex h-full w-full flex-col items-center justify-center rounded-[inherit] bg-[#f7f7f5] px-6 py-8 text-center text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
                      >
                        <button
                          onClick={() => setShowMicBlockedDialog(false)}
                          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-black/70 text-white shadow-[0_10px_24px_rgba(15,23,42,0.25)]"
                          aria-label="Close microphone help"
                        >
                          <ArrowLeft className="h-5 w-5" />
                        </button>

                        <div className="mx-auto flex max-w-[560px] flex-col items-center justify-center">
                          <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-slate-950 sm:text-[22px]">
                            We are blocked from using your microphone
                          </h3>
                          <ol className="mx-auto mt-8 inline-block space-y-4 text-left text-[16px] leading-8 text-slate-950 sm:text-[17px]">
                            <li>
                              1. Click the page info icon in your browser's
                              address bar
                            </li>
                            <li>2. Turn on microphone access</li>
                          </ol>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowMicBlockedDialog(false)}
                            className="mt-8 rounded-2xl bg-black px-8 py-3 text-[16px] font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)]"
                          >
                            Understood
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Listening glow */}
                  {!showMicBlockedDialog && (
                    <motion.div
                      className="absolute inset-6 rounded-full border-2 border-emerald-400/60 blur-lg"
                      animate={
                        micStatus === "allowed" && !micMuted
                          ? { scale: [1, 1.12, 1], opacity: [0.3, 0.8, 0.3] }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                  )}

                  {/* Top controls */}
                  {!showMicBlockedDialog && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <IconBtn onClick={toggleSpeaker} active={isSpeakerOn}>
                        {isSpeakerOn ? <Volume2 /> : <VolumeX />}
                      </IconBtn>
                      <IconBtn danger onClick={handleClose}>
                        <X />
                      </IconBtn>
                    </div>
                  )}

                  {/* Bottom bar */}
                  {!showMicBlockedDialog && (
                    <div className="absolute bottom-0 inset-x-0 px-4 pt-4 pb-2 pointer-events-none">
                      <div className="flex items-center justify-between gap-3">
                        {!showVoiceBar && (
                          // <div className="px-3 py-2 rounded-full bg-black/55 backdrop-blur-lg text-white text-sm font-semibold shadow-lg pointer-events-auto">
                          //   Ambassador Paul
                          // </div>
                          <div></div>
                        )}

                        {showVoiceBar ? (
                          <div className="flex-1 flex items-center justify-center gap-4 pointer-events-auto">
                            <button
                              onClick={toggleMic}
                              className="h-11 w-11 rounded-full bg-[#2b2b2d] text-white border border-white/10 shadow-lg flex items-center justify-center"
                              aria-label="Toggle microphone"
                            >
                              {micMuted ? (
                                <MicOff className="w-5 h-5" />
                              ) : (
                                <Mic className="w-5 h-5" />
                              )}
                            </button>

                            <div className="flex-1 flex justify-center">
                              <div className="min-w-[190px] px-5 py-2 rounded-full bg-[#1f1f20]/90 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center gap-1.5">
                                {[...Array(16)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-[5px] rounded-full bg-white/80"
                                    animate={{
                                      height: `${Math.max(4, voiceActivity * 20 + Math.random() * 8)}px`,
                                      opacity:
                                        voiceActivity > 0.05
                                          ? 0.7 + voiceActivity * 0.25
                                          : 0.35,
                                    }}
                                    transition={{
                                      duration: 0.16,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                      delay: i * 0.012,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>

                            <button
                              onClick={() => setIsChatOpen((v) => !v)}
                              className={`h-11 w-11 rounded-full border border-white/10 shadow-lg flex items-center justify-center ${isChatOpen
                                  ? "bg-[#2b2b2d] text-white"
                                  : "bg-[#2b2b2d]/90 text-white"
                                }`}
                              aria-label="Toggle chat"
                            >
                              <MessageSquare className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2 pointer-events-auto ml-auto">
                            <div className="relative">
                              <IconBtn
                                active={micStatus === "allowed" && !micMuted}
                                onClick={toggleMic}
                                danger={
                                  micStatus === "denied" ||
                                  micStatus === "error"
                                }
                              >
                                {micMuted ? <MicOff /> : <Mic />}
                              </IconBtn>
                              {(micStatus === "prompt" || isRecording) && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full"></div>
                              )}
                              {micStatus === "denied" && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                              )}
                              {micStatus === "allowed" && !micMuted && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                              )}
                            </div>

                            <IconBtn
                              onClick={() => setIsChatOpen((v) => !v)}
                              active={isChatOpen}
                            >
                              <MessageSquare />
                            </IconBtn>
                          </div>
                        )}

                        {showInterruptHint && (
                          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap">
                            Talk to interrupt
                          </div>
                        )}
                      </div>
                      {micStatus === "prompt" && (
                        <div className="text-xs text-amber-200 mt-2 pointer-events-auto">
                          Allow microphone access to enable voice chat
                        </div>
                      )}
                      {(micStatus === "denied" || micStatus === "error") && (
                        <div className="text-xs text-red-200 mt-2 pointer-events-auto">
                          Microphone access denied. Please enable in browser
                          settings.
                        </div>
                      )}
                      {showVoiceBar && (
                        <div className="text-[11px] text-white/80 mt-1 pointer-events-auto">
                          Tip: Using headphones reduces echo and accidental
                          interruptions.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Chat panel — dark glass UI (same on all allowed pages) */}
                <AnimatePresence>
                  {isChatOpen && (
                    <motion.div
                      data-chat-panel
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 40, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="relative flex h-full w-[40%] min-w-0 flex-col overflow-hidden border-l border-white/12 bg-slate-950/78 text-slate-50 shadow-[-10px_0_36px_rgba(0,0,0,0.38)] backdrop-blur-2xl backdrop-saturate-150"
                      style={{ cursor: "default" }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-black/25" />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-400/25 to-transparent" />

                      {/* Header */}
                      <div className="relative z-10 flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 shadow-sm backdrop-blur-md">
                            <MessageSquare className="h-4 w-4 text-blue-300" />
                            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-[14px] font-semibold tracking-tight text-white">
                              Assistant Chat
                            </p>
                            {/* <p className="truncate text-[11px] font-medium text-slate-400">
                              Online · Ready to help
                            </p> */}
                          </div>
                        </div>
                        <motion.button
                          onClick={() => setIsChatOpen(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-slate-300 shadow-sm backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/18 hover:text-white"
                          aria-label="Close chat panel"
                        >
                          <X className="h-3.5 w-3.5" />
                        </motion.button>
                      </div>

                      {/* Messages */}
                      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-5 bg-gradient-to-b from-slate-950/95 to-transparent" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-6 bg-gradient-to-t from-slate-950/95 to-transparent" />

                        <div
                          ref={chatContainerRef}
                          onScroll={handleScroll}
                          className="chatbot-messages-scroll flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-4 py-4"
                        >
                          {messages.length === 0 && !isTyping && (
                            <div className="flex flex-1 flex-col items-center justify-center px-1 py-2 text-center">
                              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 backdrop-blur-md">
                                <MessageSquare className="h-5 w-5 text-blue-300/90" />
                              </div>
                              <p className="text-sm font-medium text-slate-100">
                                Start a conversation
                              </p>
                              <p className="mt-1 max-w-[240px] text-xs leading-relaxed text-slate-400">
                                Ask a question, I'm ready to help.
                              </p>
                              {/* <div className="mt-4 flex w-full flex-col gap-2">
                                {CHAT_QUICK_PROMPTS.map((prompt) => (
                                  <button
                                    key={prompt}
                                    type="button"
                                    onClick={() => setInputValue(prompt)}
                                    className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-left text-xs leading-snug text-slate-200 backdrop-blur-md transition-colors hover:border-blue-400/30 hover:bg-blue-500/15 hover:text-white"
                                  >
                                    {prompt}
                                  </button>
                                ))}
                              </div> */}
                            </div>
                          )}

                          {messages.map((message) => (
                            <Bubble
                              key={message.id}
                              left={!message.isUser}
                              right={message.isUser}
                            >
                              {message.content}
                            </Bubble>
                          ))}
                          {isTyping && <TypingDots />}

                          <div ref={messagesEndRef} />
                        </div>
                      </div>

                      {/* Input */}
                      <div className="relative z-10 shrink-0 px-4 pb-4 pt-2">
                        <div className="flex items-center gap-2.5">
                          <motion.input
                            className="min-w-0 flex-1 rounded-xl border border-white/12 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-400/55 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleSendOrStop();
                              }
                            }}
                          />
                          <motion.button
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-white transition-all ${isBotResponding
                                ? "border-red-400/35 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500"
                                : inputValue.trim()
                                  ? "border-blue-400/40 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500"
                                  : "border-white/10 bg-white/8 text-slate-500"
                              }`}
                            onClick={handleSendOrStop}
                            disabled={
                              !isBotResponding && inputValue.trim() === ""
                            }
                            whileHover={
                              isBotResponding || inputValue.trim()
                                ? { scale: 1.04 }
                                : {}
                            }
                            whileTap={
                              isBotResponding || inputValue.trim()
                                ? { scale: 0.96 }
                                : {}
                            }
                            aria-label={
                              isBotResponding ? "Stop response" : "Send message"
                            }
                          >
                            {isBotResponding ? (
                              <Square className="h-4 w-4 fill-current" />
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                          </motion.button>
                        </div>
                        {/* <p className="mt-2 text-center text-[10px] text-slate-500">
                          Press Enter to send
                        </p> */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ---------- Reusable UI ---------- */

const IconBtn = ({ children, onClick, danger, active }) => (
  <motion.button
    onClick={onClick}
    className={`p-2 rounded-full backdrop-blur-md shadow-lg transition
      ${danger ? "bg-red-500 text-white" : active ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white" : "bg-gradient-to-r from-gray-700 to-gray-800 text-white"}
      hover:scale-110 active:scale-95`}
    whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    {children}
  </motion.button>
);

const Bubble = ({ children, left, right }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.22 }}
    className={`flex max-w-full flex-col gap-1 ${right ? "items-end" : "items-start"}`}
  >
    <span
      className={`px-1 text-[10px] font-semibold uppercase tracking-wider ${right ? "text-blue-300/80" : "text-slate-400"
        }`}
    >
      {right ? "You" : "Assistant"}
    </span>
    <div
      className={`max-w-[92%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-sm backdrop-blur-md
        ${left && "border border-white/20 bg-white/[0.14] text-slate-50"}
        ${right && "border border-blue-400/30 bg-gradient-to-br from-blue-600/95 to-indigo-600/90 text-white"}`}
    >
      <div className="whitespace-pre-wrap break-words">{children}</div>
    </div>
  </motion.div>
);

const TypingDots = () => (
  <div className="flex flex-col items-start gap-1">
    <span className="px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
      Assistant
    </span>
    <div className="flex items-center gap-1.5 rounded-2xl border border-white/20 bg-white/[0.14] px-4 py-3 shadow-sm backdrop-blur-md">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-blue-300/80"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </div>
);

export default FloatingMiniChatbot;
