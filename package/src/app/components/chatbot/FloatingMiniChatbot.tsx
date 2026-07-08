/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
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

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.lmsathena.com"
).replace(/\/api\/?$/, "");
/** Timeout for FAQ search API */
const CHATBOT_REQUEST_TIMEOUT_MS = 90000;
const EDGE_MARGIN = 24;
const BOT_INTERRUPT_GRACE_MS = 1200;
const TEASER_BOTTOM_GAP = 2;
const MODAL_BOTTOM_GAP = 10;
const MODAL_WIDTH = 540;
const MODAL_WIDTH_CHAT = 730;
const MODAL_HEIGHT = 310;
const CHAT_INPUT_MAX_HEIGHT = 112;
const CHAT_INPUT_MAX_LENGTH = 200;

const clampChatInput = (value) => (value || "").slice(0, CHAT_INPUT_MAX_LENGTH);

const LINK_TOKEN_REGEX =
  /(https?:\/\/[^\s<]+[^\s<.,:;"')\]\s]*|www\.[^\s<]+[^\s<.,:;"')\]\s]*|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?<![@\w/])((?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,})(?::\d{1,5})?(?:\/[^\s<.,;:!?)"]*)?)/gi;

const isEmailToken = (token) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(token);

const isWebLinkToken = (token) =>
  /^(?:https?:\/\/|www\.)/i.test(token) ||
  /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/[^\s]*)?$/i.test(
    token,
  );

const getLinkHref = (token) => {
  if (isEmailToken(token)) return `mailto:${token}`;
  if (/^https?:\/\//i.test(token)) return token;
  return `https://${token}`;
};

const trimLinkTrailingPunctuation = (token) =>
  token.replace(/[.,;:!?)]+$/g, "");
const TEASER_WIDTH = 210;
const TEASER_HEIGHT = 160;
const MOBILE_MAX_WIDTH = 639;
const TABLET_MAX_WIDTH = 1023;

const getResponsiveMetrics = (viewportWidth, viewportHeight, isChatOpen) => {
  if (viewportWidth <= MOBILE_MAX_WIDTH) {
    const edgeMargin = 10;
    const bottomGap = 20;
    const width = Math.max(280, viewportWidth - edgeMargin * 2);
    const heightClosed = Math.min(
      Math.max(Math.round(viewportHeight * 0.38), 220),
      300,
    );
    const heightOpen = Math.min(
      Math.max(Math.round(viewportHeight * 0.74), 400),
      viewportHeight - bottomGap - 48,
    );

    return {
      width,
      height: isChatOpen ? heightOpen : heightClosed,
      edgeMargin,
      bottomGap,
      teaserWidth: 156,
      teaserHeight: 124,
      avatarSize: 76,
      isStacked: isChatOpen,
      isMobile: true,
      isTablet: false,
      disableDrag: true,
      centerModal: true,
      videoHeightPercent: 42,
      chatInputMaxHeight: 72,
    };
  }

  if (viewportWidth <= TABLET_MAX_WIDTH) {
    const edgeMargin = 16;
    const widthClosed = Math.min(500, viewportWidth - edgeMargin * 2);
    const widthOpen = Math.min(680, viewportWidth - edgeMargin * 2);
    const height = Math.min(
      Math.max(Math.round(viewportHeight * 0.36), 260),
      320,
    );

    return {
      width: isChatOpen ? widthOpen : widthClosed,
      height,
      edgeMargin,
      bottomGap: MODAL_BOTTOM_GAP,
      teaserWidth: 188,
      teaserHeight: 146,
      avatarSize: 92,
      isStacked: false,
      isMobile: false,
      isTablet: true,
      disableDrag: viewportWidth < 768,
      centerModal: viewportWidth < 768,
      videoHeightPercent: null,
      chatInputMaxHeight: CHAT_INPUT_MAX_HEIGHT,
    };
  }

  return {
    width: isChatOpen ? MODAL_WIDTH_CHAT : MODAL_WIDTH,
    height: MODAL_HEIGHT,
    edgeMargin: EDGE_MARGIN,
    bottomGap: MODAL_BOTTOM_GAP,
    teaserWidth: TEASER_WIDTH,
    teaserHeight: TEASER_HEIGHT,
    avatarSize: 104,
    isStacked: false,
    isMobile: false,
    isTablet: false,
    disableDrag: false,
    centerModal: false,
    videoHeightPercent: null,
    chatInputMaxHeight: CHAT_INPUT_MAX_HEIGHT,
  };
};

const getDefaultModalPosition = (metrics, hasDraggedModal, prevPosition) => {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
  }

  const maxX = Math.max(
    metrics.edgeMargin,
    window.innerWidth - metrics.width - metrics.edgeMargin,
  );
  const maxY = Math.max(
    metrics.bottomGap,
    window.innerHeight - metrics.height - metrics.bottomGap,
  );

  if (hasDraggedModal && prevPosition) {
    return {
      x: Math.min(Math.max(metrics.edgeMargin, prevPosition.x), maxX),
      y: Math.min(Math.max(metrics.bottomGap, prevPosition.y), maxY),
    };
  }

  const x = metrics.centerModal
    ? Math.max(metrics.edgeMargin, (window.innerWidth - metrics.width) / 2)
    : maxX;

  return { x, y: maxY };
};

const getDefaultTeaserPosition = (metrics) => {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
  }

  return {
    x: Math.max(
      metrics.edgeMargin,
      window.innerWidth - metrics.teaserWidth - metrics.edgeMargin,
    ),
    y: Math.max(
      TEASER_BOTTOM_GAP,
      window.innerHeight - metrics.teaserHeight - metrics.bottomGap,
    ),
  };
};
const FAQ_NOT_FOUND_TEXT = "sorry, i don't have that knowledge.";
const CHATBOT_SUPPORT_EMAIL = "support@creditoracademy.com";
const FEEDBACK_YES_MESSAGE = "Thank you and keep asking your queries.";
const CHATBOT_SUPPORT_FALLBACK_MESSAGE = `That's a great question! For the most accurate answer,
Please cotact our support team at ${CHATBOT_SUPPORT_EMAIL}
Thank you!`;

const TEASER_PROMPTS = [
  "Hey there!👋",
  "Ask anything!!",
  "I am ready to help!",
  "Chat with me",
  "Need help?",
];
const CHATBOT_HISTORY_STORAGE_KEY = "paul-chatbot-history";

const loadChatHistory = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = sessionStorage.getItem(CHATBOT_HISTORY_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((m) => ({
        id: m.id,
        content: m.content || "",
        isUser: !!m.isUser,
        streaming: false,
      }))
      .filter((m) => m.content);
  } catch {
    return [];
  }
};

const persistChatHistory = (messages) => {
  if (typeof window === "undefined") return;
  try {
    const toStore = messages
      .filter((m) => !m.streaming && (m.content || m.fullText))
      .map((m) => ({
        id: m.id,
        content: m.content || m.fullText || "",
        isUser: !!m.isUser,
      }));
    if (toStore.length === 0) {
      sessionStorage.removeItem(CHATBOT_HISTORY_STORAGE_KEY);
    } else {
      sessionStorage.setItem(
        CHATBOT_HISTORY_STORAGE_KEY,
        JSON.stringify(toStore),
      );
    }
  } catch {
    // sessionStorage may be full or unavailable — fail silently
  }
};

const clearChatHistoryStorage = () => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(CHATBOT_HISTORY_STORAGE_KEY);
  } catch {
    // fail silently
  }
};

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

const normalizeSpeechText = (text) =>
  (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isSameOrRelatedTranscript = (a, b) => {
  const left = normalizeSpeechText(a);
  const right = normalizeSpeechText(b);
  if (!left || !right) return false;
  return left === right || left.startsWith(right) || right.startsWith(left);
};

/** True when STT likely picked up the bot's own voice instead of the user. */
const isLikelySelfTranscript = (transcript, ...botSources) => {
  const t = normalizeSpeechText(transcript);
  if (!t) return false;

  const transcriptWords = t.split(" ").filter(Boolean);
  if (transcriptWords.length === 0) return false;

  for (const source of botSources) {
    const b = normalizeSpeechText(source);
    if (!b) continue;

    if (b.includes(t)) return true;

    if (transcriptWords.length >= 2) {
      const phrase = transcriptWords
        .slice(0, Math.min(4, transcriptWords.length))
        .join(" ");
      if (phrase.length >= 4 && b.includes(phrase)) return true;
    }

    const botWords = b.split(" ").filter(Boolean);
    const botWordSet = new Set(botWords);
    let overlap = 0;

    for (const word of transcriptWords) {
      if (botWordSet.has(word)) overlap++;
    }

    const overlapRatio = overlap / transcriptWords.length;
    if (overlapRatio >= 0.55) return true;

    if (transcriptWords.length <= 2 && overlap === transcriptWords.length) {
      return true;
    }
  }

  return false;
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

/** Hint the browser to fetch FAQ video bytes before the <video> element mounts. */
const preloadFaqVideoAsset = (url) => {
  if (!url || typeof document === "undefined") return;

  const selector = `link[data-faq-video-preload="${CSS.escape(url)}"]`;
  if (document.querySelector(selector)) return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "video";
  link.href = url;
  link.setAttribute("data-faq-video-preload", url);
  document.head.appendChild(link);

  const removeLink = () => link.remove();
  link.addEventListener("load", removeLink, { once: true });
  link.addEventListener("error", removeLink, { once: true });
};

const FloatingMiniChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [viewport, setViewport] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1280,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  }));
  const [micStatus, setMicStatus] = useState("idle");
  const [micMuted, setMicMuted] = useState(true); // mic starts muted
  const [showMicBlockedDialog, setShowMicBlockedDialog] = useState(false);
  const [isMinimizedToBorder, setIsMinimizedToBorder] = useState(false);
  const [hasDraggedTeaser, setHasDraggedTeaser] = useState(false);
  const [hasDraggedModal, setHasDraggedModal] = useState(false);

  const [messages, setMessages] = useState(loadChatHistory);
  const [messageFeedback, setMessageFeedback] = useState({});
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
  const [faqVideoReady, setFaqVideoReady] = useState(false);
  const faqVideoRef = useRef(null);
  const faqVideoStartedRef = useRef(false);
  const [shouldPlayWelcomeVideo, setShouldPlayWelcomeVideo] = useState(false);
  const hasPlayedGreetingRef = useRef(false);
  const hasStartedMicAfterGreetingRef = useRef(false);
  const greetingHasStartedPlayingRef = useRef(false);
  const prevIsSpeakingRef = useRef(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [voiceActivity, setVoiceActivity] = useState(0); // 0-1 for voice level
  const [showInterruptHint, setShowInterruptHint] = useState(false);
  const [, setAvatarReady] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);
  const currentAudioRef = useRef(null); // Track current audio element for interruption
  const streamingIntervalRef = useRef(null); // Track streaming interval
  const intentionalStopRef = useRef(false); // Track if mic stop was intentional
  const isSpeakingRef = useRef(false);
  const committedVoiceTranscriptRef = useRef("");
  const lastSentVoiceTranscriptRef = useRef("");
  const interruptBotRef = useRef(null);
  const sendTranscribedTextRef = useRef(null);
  const currentBotUtteranceRef = useRef("");
  const displayedBotTextRef = useRef("");
  const lastBotSpeechStartRef = useRef(0);
  const sessionIdRef = useRef(0); // Increment to invalidate in-flight async work
  const stopSpeechRecognitionRef = useRef(null);
  const isBotRespondingRef = useRef(false);

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    persistChatHistory(messages);
  }, [messages]);

  useEffect(() => {
    const handleLogout = () => {
      clearChatHistoryStorage();
      setMessages([]);
      setMessageFeedback({});
    };
    window.addEventListener("userLoggedOut", handleLogout);
    return () => window.removeEventListener("userLoggedOut", handleLogout);
  }, []);

  const clearFaqVideoPlayback = useCallback(() => {
    setFaqVideoUrl("");
    setFaqVideoReady(false);
    faqVideoStartedRef.current = false;
    setShouldPlayWelcomeVideo(false);
    setIsSpeaking(false);
    const video = faqVideoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
  }, []);

  useEffect(() => {
    setFaqVideoReady(false);
    faqVideoStartedRef.current = false;
  }, [faqVideoUrl]);

  const handleFaqVideoReady = useCallback(() => {
    if (faqVideoStartedRef.current) return;
    faqVideoStartedRef.current = true;
    setFaqVideoReady(true);
    setIsSpeaking(true);
    lastBotSpeechStartRef.current = Date.now();
    const video = faqVideoRef.current;
    if (!video) return;
    video.muted = !isSpeakerOn;
    video.play().catch(() => {});
  }, [isSpeakerOn]);

  useEffect(() => {
    const video = faqVideoRef.current;
    if (!video || !faqVideoReady) return;
    video.muted = !isSpeakerOn;
  }, [isSpeakerOn, faqVideoReady]);

  useEffect(() => {
    interruptBotRef.current = () => {
      setAvatarAudioUrl("");
      setAvatarVisemes([]);
      clearFaqVideoPlayback();
      setIsSpeaking(false);
      setIsTyping(false);
      setShowInterruptHint(false);
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
        streamingIntervalRef.current = null;
      }
      setMessages((prev) =>
        prev.map((msg) => (msg.streaming ? { ...msg, streaming: false } : msg)),
      );
    };
  });

  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isTeaserDragging, setIsTeaserDragging] = useState(false);
  const [teaserPosition, setTeaserPosition] = useState(() => {
    if (typeof window !== "undefined") {
      return getDefaultTeaserPosition(
        getResponsiveMetrics(window.innerWidth, window.innerHeight, false),
      );
    }
    return { x: 0, y: 0 };
  });
  const [teaserDragOffset, setTeaserDragOffset] = useState({ x: 0, y: 0 });
  const [teaserPromptIndex, setTeaserPromptIndex] = useState(0);
  const [isTeaserHovered, setIsTeaserHovered] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const teaserOuterRef = useRef(null);
  const teaserHoverTimeoutRef = useRef(null);

  // Sync viewport + modal position before paint (teaser uses CSS bottom/right until dragged)
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const nextViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    setViewport(nextViewport);

    const metrics = getResponsiveMetrics(
      nextViewport.width,
      nextViewport.height,
      false,
    );
    setPosition(getDefaultModalPosition(metrics, false));
  }, []);
  const chatContainerRef = useRef(null);
  const chatInputRef = useRef(null);
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

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updatePointerMode = () => setIsCoarsePointer(mediaQuery.matches);
    updatePointerMode();
    mediaQuery.addEventListener("change", updatePointerMode);
    return () => mediaQuery.removeEventListener("change", updatePointerMode);
  }, []);

  const handleTeaserHoverEnter = useCallback(() => {
    if (teaserHoverTimeoutRef.current) {
      clearTimeout(teaserHoverTimeoutRef.current);
      teaserHoverTimeoutRef.current = null;
    }
    setIsTeaserHovered(true);
  }, []);

  const handleTeaserHoverLeave = useCallback(() => {
    if (teaserHoverTimeoutRef.current) {
      clearTimeout(teaserHoverTimeoutRef.current);
    }
    teaserHoverTimeoutRef.current = setTimeout(() => {
      setIsTeaserHovered(false);
      teaserHoverTimeoutRef.current = null;
    }, 140);
  }, []);

  useEffect(
    () => () => {
      if (teaserHoverTimeoutRef.current) {
        clearTimeout(teaserHoverTimeoutRef.current);
      }
    },
    [],
  );

  const handleClose = useCallback(() => {
    // Stop active media/mic; chat history persists until logout
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

    // Reset transient UI state (messages persist for the session)
    setInputValue("");
    setIsTyping(false);
    setIsSpeakerOn(true);
    setIsSpeaking(false);
    setAvatarAudioUrl("");
    setAvatarVisemes([]);
    clearFaqVideoPlayback();
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
    displayedBotTextRef.current = "";
    lastBotSpeechStartRef.current = 0;
    sendingRef.current = false;
    committedVoiceTranscriptRef.current = "";
    lastSentVoiceTranscriptRef.current = "";

    // Set minimized state to false so we display the default teaser in the bottom-right
    setIsMinimizedToBorder(false);
    setHasDraggedTeaser(false);
    setHasDraggedModal(false);

    // Close UI
    setIsChatOpen(false);
    setIsOpen(false);
  }, [clearFaqVideoPlayback]);

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
        } catch {
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
        const nextVideoUrl = payload.videoUrl || "";
        if (nextVideoUrl) {
          preloadFaqVideoAsset(nextVideoUrl);
        }
        setFaqVideoUrl(nextVideoUrl);
        setShouldPlayWelcomeVideo(false);

        currentBotUtteranceRef.current = fullText || "";
        displayedBotTextRef.current = "";
        lastBotSpeechStartRef.current = Date.now();

        if (autoSendTimerRef.current) {
          clearTimeout(autoSendTimerRef.current);
          autoSendTimerRef.current = null;
        }
        setInputValue((prev) =>
          isLikelySelfTranscript(prev, fullText) ? "" : prev,
        );

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
        }

        // Stream words progressively
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
            displayedBotTextRef.current = displayedText;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === msgId ? { ...msg, content: displayedText } : msg,
              ),
            );
            currentWordIndex++;
          } else {
            // Finished streaming
            clearInterval(streamingIntervalRef.current);
            displayedBotTextRef.current = fullText;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === msgId ? { ...msg, streaming: false } : msg,
              ),
            );
          }
        }, estimatedDuration / words.length);

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
    intentionalStopRef.current = true;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      } catch (err) {
        console.warn("⚠️ Error stopping recognition:", err);
      }
    }

    setIsRecording(false);
    setMicMuted(true);

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

  const restartSpeechRecognitionBuffer = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (autoSendTimerRef.current) {
      clearTimeout(autoSendTimerRef.current);
      autoSendTimerRef.current = null;
    }

    try {
      intentionalStopRef.current = false;
      recognition.stop();
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to restart speech recognition buffer:", err);
      }
    }
  }, []);

  const interruptBotPlayback = useCallback(() => {
    // Invalidate in-flight bot responses so interrupted media does not resume.
    sessionIdRef.current += 1;
    const stopBot = interruptBotRef.current;
    if (stopBot) stopBot();
    currentBotUtteranceRef.current = "";
    displayedBotTextRef.current = "";
    lastBotSpeechStartRef.current = 0;
  }, []);

  // Separate function for sending transcribed text automatically
  const sendTranscribedText = useCallback(
    async (transcribedText) => {
      const trimmedText = clampChatInput(transcribedText).trim();
      if (sendingRef.current) return;
      if (trimmedText === "") return;

      if (autoSendTimerRef.current) {
        clearTimeout(autoSendTimerRef.current);
        autoSendTimerRef.current = null;
      }

      sendingRef.current = true;
      const normalizedTranscript = normalizeSpeechText(trimmedText);
      committedVoiceTranscriptRef.current = trimmedText;
      lastSentVoiceTranscriptRef.current = normalizedTranscript;
      setInputValue("");
      restartSpeechRecognitionBuffer();

      // Voice interruption: stop current bot media before processing new user speech.
      interruptBotPlayback();

      // Add user message
      const userMessage = {
        id: Date.now(),
        content: trimmedText,
        isUser: true,
      };

      setMessages((prev) => [...prev, userMessage]);

      // Get bot response and update UI
      setIsTyping(true);

      try {
        await startBotResponse(trimmedText);
      } catch (error) {
        console.error("Error getting bot response:", error);
      } finally {
        setIsTyping(false);
        setInputValue("");
        sendingRef.current = false;
      }
    },
    [interruptBotPlayback, restartSpeechRecognitionBuffer, startBotResponse],
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

  const layoutMetrics = useMemo(
    () => getResponsiveMetrics(viewport.width, viewport.height, isChatOpen),
    [viewport.width, viewport.height, isChatOpen],
  );

  const getSizeDimensions = useCallback(
    () => ({
      width: `${layoutMetrics.width}px`,
      height: `${layoutMetrics.height}px`,
    }),
    [layoutMetrics],
  );

  const clampPositionToViewport = useCallback(() => {
    if (typeof window === "undefined") return;

    setPosition((prev) =>
      getDefaultModalPosition(layoutMetrics, hasDraggedModal, prev),
    );
  }, [layoutMetrics, hasDraggedModal]);

  useEffect(() => {
    clampPositionToViewport();
  }, [isChatOpen, clampPositionToViewport]);

  const handleResize = useCallback(() => {
    if (typeof window === "undefined") return;

    const nextViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    setViewport(nextViewport);

    const metrics = getResponsiveMetrics(
      nextViewport.width,
      nextViewport.height,
      isChatOpen,
    );

    if (hasDraggedTeaser) {
      setTeaserPosition((prev) => {
        const maxX = Math.max(
          metrics.edgeMargin,
          nextViewport.width - metrics.teaserWidth - metrics.edgeMargin,
        );
        const maxY = Math.max(
          TEASER_BOTTOM_GAP,
          nextViewport.height - metrics.teaserHeight - metrics.bottomGap,
        );
        return {
          x: Math.min(Math.max(metrics.edgeMargin, prev.x), maxX),
          y: Math.min(Math.max(TEASER_BOTTOM_GAP, prev.y), maxY),
        };
      });
    } else {
      setTeaserPosition(getDefaultTeaserPosition(metrics));
    }

    setPosition((prev) =>
      getDefaultModalPosition(metrics, hasDraggedModal, prev),
    );
  }, [hasDraggedTeaser, hasDraggedModal, isChatOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const isDraggable = !layoutMetrics.disableDrag;

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

    newX = Math.max(
      layoutMetrics.edgeMargin,
      Math.min(screenWidth - elementWidth - layoutMetrics.edgeMargin, newX),
    );
    newY = Math.max(
      layoutMetrics.bottomGap,
      Math.min(screenHeight - elementHeight - layoutMetrics.bottomGap, newY),
    );

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
    if (layoutMetrics.disableDrag) return;

    teaserDragStartRef.current = { x: e.clientX, y: e.clientY };
    isTeaserDraggedRef.current = false;
    setIsTeaserDragging(true);

    const rect = teaserOuterRef.current?.getBoundingClientRect();
    let currentX = teaserPosition.x;
    let currentY = teaserPosition.y;

    if (!hasDraggedTeaser && rect) {
      currentX = rect.left;
      currentY = rect.top;
      setTeaserPosition({ x: rect.left, y: rect.top });
    }

    setTeaserDragOffset({
      x: e.clientX - currentX,
      y: e.clientY - currentY,
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

    newX = Math.max(
      layoutMetrics.edgeMargin,
      Math.min(
        screenWidth - layoutMetrics.teaserWidth - layoutMetrics.edgeMargin,
        newX,
      ),
    );
    newY = Math.max(
      TEASER_BOTTOM_GAP,
      Math.min(
        screenHeight - layoutMetrics.teaserHeight - layoutMetrics.bottomGap,
        newY,
      ),
    );

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

  const handleTeaserClick = () => {
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

        const combinedTranscript = (finalTranscript + interimTranscript).trim();
        const committedTranscript = committedVoiceTranscriptRef.current.trim();
        const normalizedCombinedTranscript =
          normalizeSpeechText(combinedTranscript);
        const normalizedCommittedTranscript =
          normalizeSpeechText(committedTranscript);
        const botText = currentBotUtteranceRef.current || "";
        const displayedBotText = displayedBotTextRef.current || "";
        const isBotActive = isBotRespondingRef.current || isSpeakingRef.current;

        if (sendingRef.current) {
          return;
        }

        if (
          lastSentVoiceTranscriptRef.current &&
          isSameOrRelatedTranscript(
            lastSentVoiceTranscriptRef.current,
            combinedTranscript,
          )
        ) {
          setInputValue("");
          return;
        }

        if (
          normalizedCommittedTranscript &&
          (normalizedCombinedTranscript === normalizedCommittedTranscript ||
            isSameOrRelatedTranscript(committedTranscript, combinedTranscript))
        ) {
          setInputValue("");
          return;
        }

        if (
          normalizedCommittedTranscript &&
          normalizedCombinedTranscript !== normalizedCommittedTranscript &&
          !isSameOrRelatedTranscript(committedTranscript, combinedTranscript)
        ) {
          committedVoiceTranscriptRef.current = "";
        }

        if (!combinedTranscript) {
          return;
        }

        const now = Date.now();
        const withinGraceWindow =
          isBotActive &&
          lastBotSpeechStartRef.current &&
          now - lastBotSpeechStartRef.current < BOT_INTERRUPT_GRACE_MS;

        if (withinGraceWindow) {
          return;
        }

        if (
          isBotActive &&
          isLikelySelfTranscript(combinedTranscript, botText, displayedBotText)
        ) {
          return;
        }

        if (isBotActive) {
          const trimmedFinal = finalTranscript.trim();
          const spokenWordCount = (finalTranscript + interimTranscript)
            .trim()
            .split(/\s+/)
            .filter(Boolean).length;

          if (!trimmedFinal && spokenWordCount < 2) {
            return;
          }

          if (autoSendTimerRef.current) {
            clearTimeout(autoSendTimerRef.current);
            autoSendTimerRef.current = null;
          }

          interruptBotPlayback();
          if (
            lastSentVoiceTranscriptRef.current &&
            !isSameOrRelatedTranscript(
              lastSentVoiceTranscriptRef.current,
              finalTranscript + interimTranscript,
            )
          ) {
            lastSentVoiceTranscriptRef.current = "";
          }
          setInputValue(clampChatInput(finalTranscript + interimTranscript));

          if (trimmedFinal) {
            autoSendTimerRef.current = setTimeout(() => {
              sendTranscribedText(trimmedFinal);
            }, 800);
          }
          return;
        }

        if (
          lastSentVoiceTranscriptRef.current &&
          !isSameOrRelatedTranscript(
            lastSentVoiceTranscriptRef.current,
            finalTranscript + interimTranscript,
          )
        ) {
          lastSentVoiceTranscriptRef.current = "";
        }

        setInputValue(clampChatInput(finalTranscript + interimTranscript));

        const trimmedFinal = finalTranscript.trim();
        if (!trimmedFinal) {
          return;
        }

        if (autoSendTimerRef.current) {
          clearTimeout(autoSendTimerRef.current);
        }

        autoSendTimerRef.current = setTimeout(() => {
          sendTranscribedText(trimmedFinal);
        }, 1500);
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
                } catch {
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
        } catch {
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

  // Hide interrupt hint when bot stops speaking
  useEffect(() => {
    if (!isSpeaking) {
      setShowInterruptHint(false);
    }
  }, [isSpeaking]);

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
  void playGreetingTTS;

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
  const handleSendMessage = useCallback(async () => {
    if (sendingRef.current) return;
    const messageText = clampChatInput(inputValue).trim();
    if (messageText === "") return;
    sendingRef.current = true;

    // Typed interruption: stop current bot media immediately.
    interruptBotPlayback();

    // Add user message
    const userMessage = {
      id: Date.now(),
      content: messageText,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInputValue("");

    // Get bot response and update UI
    setIsTyping(true);

    try {
      await startBotResponse(messageText);
    } catch (error) {
      console.error("Error getting bot response:", error);
    } finally {
      setIsTyping(false);
      sendingRef.current = false;
    }
  }, [inputValue, interruptBotPlayback, startBotResponse]);

  const handleInputChange = useCallback((e) => {
    const nextValue = clampChatInput(e.target.value);
    setInputValue(nextValue);
    if (
      lastSentVoiceTranscriptRef.current &&
      nextValue.trim() &&
      !isSameOrRelatedTranscript(lastSentVoiceTranscriptRef.current, nextValue)
    ) {
      lastSentVoiceTranscriptRef.current = "";
    }
  }, []);

  const resizeChatInput = useCallback(() => {
    const el = chatInputRef.current;
    if (!el) return;
    el.style.height = "auto";
    const maxHeight = layoutMetrics.chatInputMaxHeight;
    const nextHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${Math.max(nextHeight, 40)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [layoutMetrics.chatInputMaxHeight]);

  useEffect(() => {
    resizeChatInput();
  }, [inputValue, resizeChatInput]);

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
        stopSpeechRecognition();
      } else {
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

  const teaserDragCursor = layoutMetrics.disableDrag
    ? "pointer"
    : isTeaserDragging
      ? "grabbing"
      : "grab";

  const showTeaserCloseButton = isTeaserHovered || isCoarsePointer;

  const modalAnim = {
    initial: { opacity: 0, scale: 0.9, y: 40 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 30 },
    transition: { type: "spring", stiffness: 260, damping: 22 },
  };

  const showVoiceBar = micStatus === "allowed" && !micMuted;

  const isBotStreaming = messages.some((message) => message.streaming);

  const latestBotMessageId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const message = messages[i];
      if (!message.isUser && !message.streaming && message.content) {
        return message.id;
      }
    }
    return null;
  }, [messages]);

  const isAwaitingBotReply = useMemo(() => {
    if (isTyping) return true;
    return messages.some(
      (message) => message.streaming && !message.content?.trim(),
    );
  }, [isTyping, messages]);

  const handleMessageFeedback = useCallback((messageId, value) => {
    setMessageFeedback((prev) => ({ ...prev, [messageId]: value }));
  }, []);

  // Derived state: check if bot is currently responding
  const isBotResponding =
    isSpeaking ||
    isTyping ||
    !!avatarAudioUrl ||
    !!faqVideoUrl ||
    !!shouldPlayWelcomeVideo ||
    isBotStreaming;

  useEffect(() => {
    isBotRespondingRef.current = isBotResponding;
  }, [isBotResponding]);

  // Handler for stop button - interrupts current bot response
  const handleStopBotResponse = useCallback(() => {
    interruptBotPlayback();
    setIsTyping(false);
    setAvatarAudioUrl("");
    setAvatarVisemes([]);
    clearFaqVideoPlayback();
    setIsSpeaking(false);
    setShowInterruptHint(false);
  }, [interruptBotPlayback, clearFaqVideoPlayback]);

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
  void currentAudioRef;

  return (
    <>
      {/* Floating teaser */}
      {!isOpen && !isMinimizedToBorder && (
        <motion.div
          ref={teaserOuterRef}
          className="fixed z-[9999] pointer-events-none"
          style={{
            position: "fixed",
            width: `${layoutMetrics.teaserWidth}px`,
            height: `${layoutMetrics.teaserHeight}px`,
            ...(hasDraggedTeaser
              ? {
                  top: `${teaserPosition.y}px`,
                  left: `${teaserPosition.x}px`,
                  bottom: "auto",
                  right: "auto",
                }
              : {
                  top: "auto",
                  left: "auto",
                  right: `${layoutMetrics.edgeMargin}px`,
                  bottom: `${layoutMetrics.bottomGap}px`,
                }),
          }}
          onDragStart={(e) => e.preventDefault()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={teaserPromptIndex}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className={`pointer-events-auto absolute right-2 top-0 w-max rounded-2xl border border-slate-200/80 bg-white px-3 py-2 font-semibold leading-5 text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.12)] ${
                layoutMetrics.isMobile
                  ? "max-w-[140px] text-[12px]"
                  : "px-4 py-2.5 text-[13px]"
              }`}
              style={{ cursor: teaserDragCursor }}
              onMouseDown={handleTeaserMouseDown}
              onDragStart={(e) => e.preventDefault()}
            >
              {TEASER_PROMPTS[teaserPromptIndex]}
              <span className="absolute bottom-[-6px] right-10 h-3 w-3 rotate-45 border-r border-b border-slate-200/80 bg-white" />
            </motion.div>
          </AnimatePresence>

          <div
            className="pointer-events-auto absolute bottom-0 right-0"
            style={{
              width: `${layoutMetrics.avatarSize}px`,
              height: `${layoutMetrics.avatarSize}px`,
            }}
            onMouseEnter={handleTeaserHoverEnter}
            onMouseLeave={handleTeaserHoverLeave}
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimizedToBorder(true);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className={`absolute z-[10001] flex items-center justify-center rounded-full border border-white bg-red-500 text-white shadow-md transition-opacity duration-200 ${
                layoutMetrics.isMobile
                  ? "-top-0.5 right-0 h-5 w-5"
                  : "-top-1 right-0 h-6 w-6"
              } ${showTeaserCloseButton ? "opacity-100" : "opacity-0"}`}
              style={{ cursor: "pointer" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Minimize chatbot"
            >
              <X
                className={layoutMetrics.isMobile ? "w-3 h-3" : "w-3.5 h-3.5"}
              />
            </motion.button>

            <motion.button
              onClick={handleTeaserClick}
              onMouseDown={handleTeaserMouseDown}
              className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/70 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.20)]"
              style={{ cursor: teaserDragCursor }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.22)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <video
                className="h-full w-full object-cover"
                style={{
                  objectPosition: "center 2%",
                  transform: "scale(1.001)",
                }}
                src={defaultBotVideo}
                playsInline
                autoPlay
                loop
                muted
                preload="auto"
              />
              <div className="absolute inset-0 rounded-full ring-4 ring-white/75" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Very small border bubble when minimized */}
      {!isOpen && isMinimizedToBorder && (
        <motion.button
          onClick={() => {
            setIsOpen(true);
            setShouldPlayWelcomeVideo(true);
          }}
          className="fixed z-[9999] flex items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.18)] bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(0.5rem,env(safe-area-inset-right))] h-12 w-12 sm:right-2 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:h-14 sm:w-14"
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
            className="fixed inset-0 z-[9999] pointer-events-none"
            onDragStart={(e) => e.preventDefault()}
          >
            <motion.div
              data-chatbot-modal
              className={`relative overflow-hidden bg-transparent shadow-[0_28px_90px_rgba(0,0,0,0.45)] ring-1 ring-white/12 ${
                layoutMetrics.isMobile ? "rounded-2xl" : "rounded-3xl"
              }`}
              animate={{
                width: layoutMetrics.width,
                height: layoutMetrics.height,
              }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "absolute",
                top: `${position.y}px`,
                left: `${position.x}px`,
                transform: "none",
                cursor: "default",
                pointerEvents: "auto",
                maxWidth: "calc(100vw - 20px)",
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

              <div
                className={`relative h-full w-full overflow-hidden bg-transparent ${
                  layoutMetrics.isStacked ? "flex flex-col" : ""
                }`}
              >
                {/* Avatar side - only this area shows grab cursor for dragging */}
                <motion.div
                  className={`relative min-w-0 bg-black ${
                    layoutMetrics.isStacked ? "shrink-0" : "h-full"
                  }`}
                  animate={{
                    width: layoutMetrics.isStacked
                      ? "100%"
                      : isChatOpen
                        ? layoutMetrics.isTablet
                          ? "55%"
                          : "60%"
                        : "100%",
                    height: layoutMetrics.isStacked
                      ? `${layoutMetrics.videoHeightPercent}%`
                      : "100%",
                  }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
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
                    {(!faqVideoUrl || !faqVideoReady) && (
                      <motion.div
                        className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden"
                        style={{
                          transform:
                            "perspective(1100px) rotateY(-4deg) rotateX(2deg) scale(1.025)",
                          transformOrigin: "center",
                        }}
                      >
                        <AvatarLipSync
                          key="stable-avatar"
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
                    {faqVideoUrl && (
                      <video
                        ref={faqVideoRef}
                        src={faqVideoUrl}
                        preload="auto"
                        playsInline
                        muted={!isSpeakerOn}
                        onLoadedData={handleFaqVideoReady}
                        onCanPlay={handleFaqVideoReady}
                        onEnded={clearFaqVideoPlayback}
                        onError={clearFaqVideoPlayback}
                        className={`absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-200 ${
                          faqVideoReady ? "opacity-100" : "opacity-0"
                        }`}
                        tabIndex={-1}
                      />
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
                              1. Click the page info icon in your browser&apos;s
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
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      <IconBtn onClick={toggleSpeaker} active={isSpeakerOn}>
                        {isSpeakerOn ? <Volume2 /> : <VolumeX />}
                      </IconBtn>
                      {!isChatOpen && (
                        <IconBtn danger onClick={handleClose}>
                          <X />
                        </IconBtn>
                      )}
                    </div>
                  )}

                  {/* Bottom bar */}
                  {!showMicBlockedDialog && (
                    <div
                      className={`absolute bottom-0 inset-x-0 pointer-events-none ${
                        layoutMetrics.isMobile
                          ? "px-2 pt-2 pb-1"
                          : "px-3 pt-3 pb-2"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        {!showVoiceBar && <div></div>}

                        {showVoiceBar ? (
                          <div className="flex-1 flex items-center justify-center gap-4 pointer-events-auto">
                            <button
                              onClick={toggleMic}
                              className="h-9 w-9 rounded-full bg-[#2b2b2d] text-white border border-white/10 shadow-lg flex items-center justify-center"
                              aria-label="Toggle microphone"
                            >
                              {micMuted ? (
                                <MicOff className="w-5 h-5" />
                              ) : (
                                <Mic className="w-5 h-5" />
                              )}
                            </button>

                            <div className="flex-1 flex justify-center min-w-0">
                              <div
                                className={`px-4 py-2 rounded-full bg-[#1f1f20]/90 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center gap-1.5 ${
                                  layoutMetrics.isMobile
                                    ? "w-full max-w-[160px]"
                                    : "min-w-[190px]"
                                }`}
                              >
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
                              className={`h-9 w-9 rounded-full border border-white/10 shadow-lg flex items-center justify-center ${
                                isChatOpen
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
                      {showVoiceBar && !layoutMetrics.isMobile && (
                        <div className="text-[11px] text-white/80 mt-1 pointer-events-auto">
                          Tip: Using headphones reduces echo and accidental
                          interruptions.
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Chat panel — dark glass UI, absolutely positioned so exit animation doesn't leave a flex ghost */}
                <AnimatePresence>
                  {isChatOpen && (
                    <motion.div
                      data-chat-panel
                      initial={
                        layoutMetrics.isStacked
                          ? { y: "100%", opacity: 0 }
                          : { x: "100%", opacity: 0 }
                      }
                      animate={
                        layoutMetrics.isStacked
                          ? { y: 0, opacity: 1 }
                          : { x: 0, opacity: 1 }
                      }
                      exit={
                        layoutMetrics.isStacked
                          ? { y: "100%", opacity: 0 }
                          : { x: "100%", opacity: 0 }
                      }
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      className={
                        layoutMetrics.isStacked
                          ? "relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden border-t border-white/12 bg-slate-950/78 text-slate-50 shadow-[0_-8px_28px_rgba(0,0,0,0.32)] backdrop-blur-2xl backdrop-saturate-150"
                          : `absolute inset-y-0 right-0 z-10 flex flex-col overflow-hidden border-l border-white/12 bg-slate-950/78 text-slate-50 shadow-[-10px_0_36px_rgba(0,0,0,0.38)] backdrop-blur-2xl backdrop-saturate-150 ${
                              layoutMetrics.isTablet ? "w-[45%]" : "w-[40%]"
                            }`
                      }
                      style={{ cursor: "default" }}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/[0.07] via-transparent to-black/25" />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                      {!layoutMetrics.isStacked && (
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-blue-400/25 to-transparent" />
                      )}

                      {/* Header */}
                      <div
                        className={`relative z-10 flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-black/20 backdrop-blur-xl ${
                          layoutMetrics.isMobile ? "px-3 py-2" : "px-4 py-3"
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 shadow-sm backdrop-blur-md">
                            <MessageSquare className="h-4 w-4 text-blue-300" />
                            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
                          </div>
                          <div className="min-w-0">
                            <p
                              className={`truncate font-semibold tracking-tight text-white ${
                                layoutMetrics.isMobile
                                  ? "text-[13px]"
                                  : "text-[14px]"
                              }`}
                            >
                              Assistant Chat
                            </p>
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
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-5 bg-linear-to-b from-slate-950/95 to-transparent" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-6 bg-linear-to-t from-slate-950/95 to-transparent" />

                        <div
                          ref={chatContainerRef}
                          onScroll={handleScroll}
                          className={`chatbot-messages-scroll flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto ${
                            layoutMetrics.isMobile ? "px-2.5 py-3" : "px-4 py-4"
                          }`}
                          style={{ scrollbarGutter: "stable" }}
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
                                Ask a question, I&apos;m ready to help.
                              </p>
                            </div>
                          )}

                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex flex-col gap-1 ${
                                message.isUser ? "items-end" : "items-start"
                              }`}
                            >
                              <Bubble
                                left={!message.isUser}
                                right={message.isUser}
                                compact={layoutMetrics.isMobile}
                              >
                                {message.content}
                              </Bubble>
                              {!message.isUser &&
                                !message.streaming &&
                                message.content && (
                                  <ResponseFeedback
                                    feedback={messageFeedback[message.id]}
                                    showPrompt={
                                      message.id === latestBotMessageId
                                    }
                                    onYes={() =>
                                      handleMessageFeedback(message.id, "yes")
                                    }
                                    onNo={() =>
                                      handleMessageFeedback(message.id, "no")
                                    }
                                  />
                                )}
                            </div>
                          ))}
                          {isAwaitingBotReply && <ThinkingStatus />}

                          <div ref={messagesEndRef} />
                        </div>
                      </div>

                      {/* Input */}
                      <div
                        className={`relative z-10 flex shrink-0 items-end gap-2 border-t border-white/10 bg-black/20 backdrop-blur-xl ${
                          layoutMetrics.isMobile ? "px-2.5 py-2" : "px-3 py-2.5"
                        }`}
                        style={{
                          paddingBottom: layoutMetrics.isMobile
                            ? "max(0.5rem, env(safe-area-inset-bottom))"
                            : undefined,
                        }}
                      >
                        <motion.textarea
                          ref={chatInputRef}
                          rows={1}
                          maxLength={CHAT_INPUT_MAX_LENGTH}
                          className="min-w-0 flex-1 resize-none rounded-xl border border-white/12 bg-white/6 px-4 py-2.5 text-sm leading-snug text-white placeholder:text-slate-500 shadow-sm focus:border-blue-400/55 focus:outline-none focus:ring-2 focus:ring-blue-400/30 min-h-[40px]"
                          style={{
                            maxHeight: `${layoutMetrics.chatInputMaxHeight}px`,
                          }}
                          placeholder="Type a message..."
                          value={inputValue}
                          onChange={handleInputChange}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendOrStop();
                            }
                          }}
                        />
                        <div className="flex shrink-0 flex-col items-center gap-1">
                          <span
                            className={`text-[9px] font-semibold tabular-nums leading-none ${
                              inputValue.length >= CHAT_INPUT_MAX_LENGTH
                                ? "text-red-400"
                                : inputValue.length >=
                                    CHAT_INPUT_MAX_LENGTH * 0.9
                                  ? "text-amber-400"
                                  : "text-slate-500"
                            }`}
                            aria-live="polite"
                            aria-label={`${inputValue.length} of ${CHAT_INPUT_MAX_LENGTH} characters used`}
                          >
                            {inputValue.length}/{CHAT_INPUT_MAX_LENGTH}
                          </span>
                          <motion.button
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-white transition-all ${
                              isBotResponding
                                ? "border-red-400/35 bg-linear-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500"
                                : inputValue.trim()
                                  ? "border-blue-400/40 bg-linear-to-br from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500"
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
    className={`p-1.5 rounded-full backdrop-blur-md shadow-lg transition
      ${danger ? "bg-red-500 text-white" : active ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white" : "bg-linear-to-r from-gray-700 to-gray-800 text-white"}
      hover:scale-110 active:scale-95`}
    whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    {children}
  </motion.button>
);

const Bubble = ({ children, left, right, compact = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.22 }}
    className={`flex max-w-full flex-col gap-1 ${right ? "items-end" : "items-start"}`}
  >
    <span
      className={`px-1 text-[10px] font-semibold uppercase tracking-wider ${
        right ? "text-blue-300/80" : "text-slate-400"
      }`}
    >
      {right ? "You" : "Assistant"}
    </span>
    <div
      className={`max-w-[92%] rounded-2xl px-4 py-2.5 leading-relaxed shadow-sm backdrop-blur-md break-words
        ${compact ? "text-[12px]" : "text-[13px]"}
        ${left ? "border border-white/20 bg-white/[0.14] text-slate-50" : ""}
        ${right ? "border border-blue-400/30 bg-linear-to-br from-blue-600/95 to-indigo-600/90 text-white" : ""}`}
    >
      <div className="whitespace-pre-wrap wrap-break-word">
        <LinkifiedText
          text={
            typeof children === "string" ? children : String(children ?? "")
          }
          inverted={!!right}
        />
      </div>
    </div>
  </motion.div>
);

const LinkifiedText = ({ text, inverted = false }) => {
  if (!text) return null;

  const linkClass = inverted
    ? "font-semibold text-white underline decoration-white/70 underline-offset-2 hover:text-white/90"
    : "font-medium text-blue-300 underline decoration-blue-300/70 underline-offset-2 hover:text-blue-200";

  const parts = [];
  let lastIndex = 0;
  const regex = new RegExp(LINK_TOKEN_REGEX.source, LINK_TOKEN_REGEX.flags);
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const rawToken = match[0];
    const token = trimLinkTrailingPunctuation(rawToken);
    const trailing = rawToken.slice(token.length);

    if (isEmailToken(token)) {
      parts.push(
        <a
          key={`${match.index}-email-${token}`}
          href={getLinkHref(token)}
          className={linkClass}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {token}
        </a>,
      );
    } else if (isWebLinkToken(token)) {
      parts.push(
        <a
          key={`${match.index}-url-${token}`}
          href={getLinkHref(token)}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {token}
        </a>,
      );
    } else {
      parts.push(token);
    }

    if (trailing) {
      parts.push(trailing);
    }

    lastIndex = match.index + rawToken.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts.length > 0 ? parts : text}</>;
};

const ResponseFeedback = ({ feedback, showPrompt, onYes, onNo }) => {
  if (feedback === "yes") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[92%] rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-3 py-2 text-[11px] font-medium leading-snug text-emerald-200 shadow-sm backdrop-blur-md"
      >
        {FEEDBACK_YES_MESSAGE}
      </motion.p>
    );
  }

  if (feedback === "no") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[92%] rounded-xl border border-amber-300/40 bg-amber-400/10 px-3 py-2 text-[11px] leading-snug text-slate-200 shadow-sm backdrop-blur-md"
      >
        <LinkifiedText
          text={`Please post your suggestion on this mail id, ${CHATBOT_SUPPORT_EMAIL} thank you!!`}
        />
      </motion.p>
    );
  }

  if (!showPrompt) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[92%] rounded-xl border border-white/15 bg-white/8 px-3 py-2.5 shadow-sm backdrop-blur-md"
    >
      <p className="text-[11px] font-semibold leading-snug text-slate-200">
        Are you happy with response?
      </p>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={onYes}
          className="rounded-full border border-emerald-500 bg-emerald-500 px-3.5 py-1 text-[11px] font-bold text-white shadow-sm transition hover:bg-emerald-600"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={onNo}
          className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-bold text-slate-100 shadow-sm transition hover:bg-white/20"
        >
          No
        </button>
      </div>
    </motion.div>
  );
};

const THINKING_STATUS_MESSAGES = [
  "Thinking...",
  "Almost there...",
  "Just a moment...",
];

const ThinkingStatus = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % THINKING_STATUS_MESSAGES.length);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-start gap-1">
      <span className="px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        Assistant
      </span>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center rounded-2xl border border-white/20 bg-white/[0.14] px-4 py-2.5 shadow-sm backdrop-blur-md"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={THINKING_STATUS_MESSAGES[messageIndex]}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[12px] font-medium italic text-slate-300"
          >
            {THINKING_STATUS_MESSAGES[messageIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FloatingMiniChatbot;
