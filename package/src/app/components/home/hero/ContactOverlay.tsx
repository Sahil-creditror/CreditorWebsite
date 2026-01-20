"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, ChevronDown, ChevronUp, Mail } from "lucide-react";

interface HeroContactOverlayProps {
    onClose?: () => void;
}

export default function HeroContactOverlay({ onClose }: HeroContactOverlayProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isFormLoaded, setIsFormLoaded] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Fixed position card, always visible (controlled by parent mounting/unmounting)
    return (
        <div className="fixed right-4 md:right-10 top-16 md:top-20 z-30 max-w-[90vw] md:max-w-md w-full flex flex-col items-end pointer-events-none">

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="pointer-events-auto w-full bg-[#091011]/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden relative"
            >
                {/* Header */}
                <div className="relative p-6 pt-7 pb-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-b from-white/5 to-transparent">
                    {/* Decorative background glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-all md:hidden z-20 backdrop-blur-sm"
                        aria-label="Close form"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4 relative z-10 w-full">
                        {/* Main Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                            <MessageSquare className="w-7 h-7 text-white fill-white/20" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-extrabold text-xl leading-none tracking-tight drop-shadow-md">
                                Let's Connect
                            </h3>

                            {/* Phone Number Block */}
                            <div className="flex items-center gap-2 mt-2">
                                <div className="bg-green-500/20 p-1.5 rounded-full ring-1 ring-green-500/50 flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-green-400 fill-current" viewBox="0 0 24 24">
                                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.3-.3.4-.69.24-1.01a11.96 11.96 0 00-.56-3.53C8.6 3.51 7.82 3 7 3H4a1 1 0 00-1 1c0 9.39 7.61 17 17 17a1 1 0 001-1v-3c0-.82-.51-1.6-1.38-1.99z" />
                                    </svg>
                                </div>
                                <a href="tel:4254009246" className="text-white text-lg font-bold tracking-wide hover:text-green-400 transition-colors whitespace-nowrap drop-shadow-sm">
                                    (425) 400-9246
                                </a>
                            </div>
                        </div>
                    </div>
                </div>      {/* No close button for standard hero view */}

                {/* Content (Form) */}
                <div className="p-2 bg-gradient-to-b from-transparent to-black/20">
                    <div className="relative w-full h-[550px] max-h-[60vh] rounded-2xl overflow-y-auto bg-white/5 custom-scrollbar">

                        {!isFormLoaded && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60 gap-3">
                                <div className="w-8 h-8 border-2 border-primary/50 border-t-primary rounded-full animate-spin" />
                                <span className="text-xs tracking-wider">LOADING SECURE FORM</span>
                            </div>
                        )}

                        {isMounted && (
                            <div className="w-full h-full md:transform md:scale-[1.0] md:origin-top">
                                <iframe
                                    src="https://api.wonderengine.ai/widget/form/o69tKOXv3NV8GnS4aGls"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        border: "none",
                                        opacity: isFormLoaded ? 1 : 0,
                                        transition: "opacity 0.4s ease-out"
                                    }}
                                    id="hero-form-iframe-fixed"
                                    data-layout="{'id':'INLINE'}"
                                    data-trigger-type="alwaysShow"
                                    data-trigger-value=""
                                    data-activation-type="alwaysActivated"
                                    data-activation-value=""
                                    data-deactivation-type="neverDeactivate"
                                    data-deactivation-value=""
                                    data-form-name="Contact us form"
                                    data-height="402"
                                    data-layout-iframe-id="hero-form-iframe-fixed"
                                    data-form-id="o69tKOXv3NV8GnS4aGls"
                                    title="Contact us form"
                                    onLoad={() => setIsFormLoaded(true)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer / Trust signal */}
                <div className="px-6 py-3 bg-black/40 border-t border-white/5 text-center">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Secure & Private
                    </p>
                </div>
            </motion.div>

            {/* Script loading */}
            {isMounted && (
                <Script
                    src="https://api.wonderengine.ai/js/form_embed.js"
                    strategy="afterInteractive"
                />
            )}
        </div>
    );
}
