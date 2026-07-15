"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Play } from "lucide-react";
import FreedomFormula from "@/app/components/home/Offer";
import { WEBINARS, WebinarConfig } from "@/config/webinars";

interface WebinarRecordingViewProps {
  courseId?: string;
}

export default function WebinarRecordingView({ courseId = "operate-private" }: WebinarRecordingViewProps): React.ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  // Find the selected webinar configuration
  const currentWebinar: WebinarConfig =
    WEBINARS.find((w) => w.id === courseId) ||
    WEBINARS.find((w) => w.id === "operate-private") ||
    WEBINARS[0];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-close popup after 5 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const getParam = (key: string): string => {
    const hookValue = searchParams?.get(key);
    if (hookValue) return hookValue;

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(key) || "";
    }

    return "";
  };

  const userName = getParam("name") || "Guest";

  // Convert Google Drive sharing link to embeddable format
  const videoEmbedUrl = `https://drive.google.com/file/d/${currentWebinar.videoFileId}/preview`;

  useEffect(() => {
    if (!isMounted) return;

    // Redirect if no name parameter (basic validation)
    if (!userName || userName === "Guest") {
      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isMounted, userName, router]);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-25">
      {/* Success Popup */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center popup-overlay"
          onClick={() => setShowPopup(false)}
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all popup-content border-2 border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
              Registration Successful!
            </h2>
            <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-6">
              Welcome, {userName}
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              style={{ backgroundColor: currentWebinar.themeColor }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Video Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-8">
          <div 
            className="bg-gradient-to-r p-6"
            style={{ 
              background: `linear-gradient(135deg, ${currentWebinar.themeColor} 0%, #1e293b 100%)`
            }}
          >
            <div className="flex items-center gap-3">
              <Play className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">
                {currentWebinar.name} — Previous Session Recording
              </h2>
            </div>
            <p className="text-blue-100 mt-2">
              Watch the complete webinar recording below
            </p>
          </div>

          {/* Video Container */}
          <div 
            className="relative bg-black video-container"
            style={{ paddingBottom: "56.25%" }}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          >
            <iframe
              src={videoEmbedUrl}
              className="absolute top-0 left-0 w-full h-full"
              allow="autoplay"
              allowFullScreen
              style={{
                border: "none",
                pointerEvents: "auto",
              }}
              title={`${currentWebinar.name} Webinar Recording`}
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
            {/* Overlay to prevent right-click */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>

          {/* Video Notice */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Important Notice
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This video is protected and can only be viewed on this website. Downloading or sharing this content is not permitted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FreedomFormula />

      <style>{`
        .video-container {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        
        .video-container iframe {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          pointer-events: auto;
        }

        /* Prevent text selection and image dragging */
        .video-container * {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Popup animations */
        .popup-overlay {
          animation: fadeIn 0.3s ease-out;
        }

        .popup-content {
          animation: slideUp 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
