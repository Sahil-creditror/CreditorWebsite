"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import Script from "next/script";
import { usePathname } from "next/navigation";


// Contact Form Modal Component
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9999]"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          >
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Get in Touch
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    We&apos;d love to hear from you
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close contact form"
                >
                  <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Form loading state */}
                {!isFormLoaded && (
                  <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl animate-pulse flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Loading form...
                      </p>
                    </div>
                  </div>
                )}

                {/* WonderEngine Form */}
                {isMounted && (
                  <iframe
                    src="https://api.wonderengine.ai/widget/form/o69tKOXv3NV8GnS4aGls"
                    style={{
                      width: "100%",
                      height: "500px",
                      border: "none",
                      borderRadius: "12px",
                      display: isFormLoaded ? "block" : "none",
                    }}
                    id="modal-o69tKOXv3NV8GnS4aGls"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Contact us form"
                    data-height="500"
                    data-layout-iframe-id="modal-o69tKOXv3NV8GnS4aGls"
                    data-form-id="o69tKOXv3NV8GnS4aGls"
                    title="Contact us form"
                    onLoad={() => setIsFormLoaded(true)}
                  />
                )}

                {/* WonderEngine Script */}
                {isMounted && (
                  <Script
                    src="https://api.wonderengine.ai/js/form_embed.js"
                    strategy="afterInteractive"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface FloatingButtonsProps {
  onSpecialOfferClick?: () => void;
}

export default function FloatingButtons({ onSpecialOfferClick }: FloatingButtonsProps) {
  const [isHeroContactClosed, setIsHeroContactClosed] = useState(false);
  const pathname = usePathname();
  const isWebinarPage = pathname === "/webinar";

  const isHeroSection = pathname === "/" && !isHeroContactClosed;

  // Hide floating buttons on webinar page
  if (isWebinarPage) {
    return null;
  }

  return (
    <>
      {/* Hero Contact Card (Shows only on Home Hero) */}
      <AnimatePresence>
        {isHeroSection && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="fixed z-40"
          >
            {/* <HeroContactOverlay onClose={() => setIsHeroContactClosed(true)} /> */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Special Offer — bottom left, aligned with chatbot avatar */}
      <div className="fixed bottom-6 left-6 md:left-8 z-[9990]">
        <motion.button
          onClick={onSpecialOfferClick}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-500 text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 hover:shadow-orange-500/40"
          aria-label="View Special Offers"
        >
          <Gift className="h-5 w-5" />
          <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Special Offers
          </span>
        </motion.button>
      </div>
    </>
  );
}

