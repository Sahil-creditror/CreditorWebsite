"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import { X, MessageSquare, Mail, Phone } from "lucide-react";

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

    const planDetails = selectedPlan === "monthly"
        ? "Monthly Membership - $69/month"
        : "Annual Membership - $828/year";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white border border-slate-200 rounded-lg shadow-2xl">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-[110] p-2 bg-slate-800 hover:bg-slate-900 rounded-md text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                                aria-label="Close"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            {/* Header */}
                            <div className="relative p-6 md:p-8 border-b border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                                {/* Decorative background glow */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/20 rounded-full blur-[80px] pointer-events-none" />

                                <div className="flex items-start gap-4 relative z-10">
                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
                                        <MessageSquare className="w-7 h-7 text-white fill-white/20" />
                                    </div>

                                    <div className="flex-1">
                                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">
                                            Get Your Invoice
                                        </h2>
                                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                            Fill out the form below to request your invoice for{" "}
                                            <span className="font-semibold text-blue-600">
                                                {planDetails}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="mt-6 flex flex-wrap gap-4 relative z-10">
                                    <a
                                        href="tel:4254009246"
                                        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-green-50 rounded-lg border border-slate-200 hover:border-green-300 transition-all group shadow-sm"
                                    >
                                        <div className="bg-green-100 p-1.5 rounded-md">
                                            <Phone className="w-3.5 h-3.5 text-green-600" />
                                        </div>
                                        <span className="text-slate-700 text-sm font-semibold group-hover:text-green-600 transition-colors">
                                            (425) 400-9246
                                        </span>
                                    </a>

                                    <a
                                        href="mailto:prerna@creditoracademy.com"
                                        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-blue-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-all group shadow-sm"
                                    >
                                        <div className="bg-blue-100 p-1.5 rounded-md">
                                            <Mail className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                        <span className="text-slate-700 text-sm font-semibold group-hover:text-blue-600 transition-colors">
                                            Email Us
                                        </span>
                                    </a>
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="p-4 bg-slate-50">
                                <div className="relative w-full h-[550px] max-h-[60vh] rounded-lg overflow-y-auto bg-white border border-slate-200 custom-scrollbar">

                                    {!isFormLoaded && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-3">
                                            <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                                            <span className="text-xs tracking-wider font-medium">LOADING SECURE FORM</span>
                                        </div>
                                    )}

                                    {isMounted && (
                                        <div className="w-full h-full">
                                            <iframe
                                                src="https://api.wonderengine.ai/widget/form/o69tKOXv3NV8GnS4aGls"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    border: "none",
                                                    opacity: isFormLoaded ? 1 : 0,
                                                    transition: "opacity 0.4s ease-out"
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
                                                data-height="550"
                                                data-layout-iframe-id="membership-form-iframe"
                                                data-form-id="o69tKOXv3NV8GnS4aGls"
                                                title="Membership Contact Form"
                                                onLoad={() => setIsFormLoaded(true)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 text-center">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Secure & Private - We'll send your invoice within 24 hours
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Script loading */}
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
