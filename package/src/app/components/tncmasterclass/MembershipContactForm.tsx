"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import { X, MessageSquare, Mail, Phone } from "lucide-react";

/** Wonder Engine embed height — must fit all fields + submit without inner clipping */
const FORM_EMBED_HEIGHT = 720;

interface MembershipContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: "monthly" | "annual";
}

export default function MembershipContactForm({
  isOpen,
  onClose,
  selectedPlan,
}: MembershipContactFormProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isFormLoaded, setIsFormLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setIsFormLoaded(false);
  }, [isOpen]);

  const planDetails =
    selectedPlan === "monthly"
      ? "Monthly Membership - $69/month"
      : "Annual Membership - $828/year";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", duration: 0.45 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="membership-invoice-title"
            className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex flex-col w-full sm:max-w-2xl max-h-[96dvh] sm:max-h-[92dvh] h-[96dvh] sm:h-auto bg-white border border-slate-200 sm:rounded-xl shadow-2xl overflow-hidden">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[110] p-2 bg-slate-800 hover:bg-slate-900 rounded-md text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                aria-label="Close invoice form"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {/* Header — compact so more room for form */}
              <header className="shrink-0 p-4 sm:p-6 pr-14 sm:pr-16 border-b border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shrink-0">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2
                      id="membership-invoice-title"
                      className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-1 tracking-tight"
                    >
                      Get Your Invoice
                    </h2>
                    <p className="text-slate-600 text-sm leading-snug">
                      Request your invoice for{" "}
                      <span className="font-semibold text-blue-600">{planDetails}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                  <a
                    href="tel:+14254009246"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white hover:bg-green-50 rounded-lg border border-slate-200 hover:border-green-300 transition-colors text-sm font-semibold text-slate-700"
                  >
                    <Phone className="w-3.5 h-3.5 text-green-600 shrink-0" aria-hidden />
                    (425) 400-9246
                  </a>
                  <a
                    href="mailto:support@creditoracademy.com"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white hover:bg-blue-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors text-sm font-semibold text-slate-700"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" aria-hidden />
                    Email Us
                  </a>
                </div>
              </header>

              {/* Form — scrollable body; tall iframe so submit stays reachable */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-slate-50 p-3 sm:p-5">
                <div className="relative w-full rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                  {!isFormLoaded && (
                    <div
                      className="flex flex-col items-center justify-center gap-3 text-slate-500"
                      style={{ minHeight: "min(720px, calc(96dvh - 14rem))" }}
                      aria-live="polite"
                    >
                      <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                      <span className="text-xs font-medium tracking-wide">Loading secure form…</span>
                    </div>
                  )}

                  {isMounted && (
                    <iframe
                      src="https://api.wonderengine.ai/widget/form/o69tKOXv3NV8GnS4aGls"
                      className="w-full block"
                      style={{
                        width: "100%",
                        height: "min(720px, calc(96dvh - 14rem))",
                        minHeight: 480,
                        border: "none",
                        display: isFormLoaded ? "block" : "none",
                      }}
                      id="membership-form-iframe"
                      data-layout="{'id':'INLINE'}"
                      data-trigger-type="alwaysShow"
                      data-trigger-value=""
                      data-activation-type="alwaysActivated"
                      data-activation-value=""
                      data-deactivation-type="neverDeactivate"
                      data-deactivation-value=""
                      data-form-name="Membership Contact Form"
                      data-height={String(FORM_EMBED_HEIGHT)}
                      data-layout-iframe-id="membership-form-iframe"
                      data-form-id="o69tKOXv3NV8GnS4aGls"
                      title="Membership invoice request form"
                      onLoad={() => setIsFormLoaded(true)}
                    />
                  )}
                </div>
              </div>

              {/* Footer always visible */}
              <footer className="shrink-0 px-4 py-3 sm:px-6 bg-slate-100 border-t border-slate-200 text-center">
                <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide font-semibold flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden />
                  Secure &amp; private — invoice within 24 hours
                </p>
              </footer>
            </div>
          </motion.div>

          {isMounted && (
            <Script
              src="https://api.wonderengine.ai/js/form_embed.js"
              strategy="afterInteractive"
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
