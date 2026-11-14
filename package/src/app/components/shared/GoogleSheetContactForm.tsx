"use client";

import { useState, useId } from "react";
import { User, Mail, Phone, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, HelpCircle } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface GoogleSheetContactFormProps {
  theme?: "light" | "dark" | "auto";
  compact?: boolean;
  onSuccess?: () => void;
  className?: string;
}

const PURPOSE_OPTIONS = [
  { value: "Course Inquiry", label: "Course Inquiry" },
  { value: "Masterclass Membership", label: "Masterclass Membership" },
  { value: "Consultation", label: "Consultation" },
  { value: "General / Other", label: "General / Other" },
];

export default function GoogleSheetContactForm({
  theme = "auto",
  compact = false,
  onSuccess,
  className = "",
}: GoogleSheetContactFormProps) {
  const formId = useId();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "Course Inquiry",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validations
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedPurpose = formData.purpose.trim() || "Query";
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      setStatus("error");
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!trimmedEmail) {
      setStatus("error");
      setErrorMessage("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!trimmedPhone) {
      setStatus("error");
      setErrorMessage("Please enter your phone number.");
      return;
    }

    const DEFAULT_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbxO1I4ogNMh65vannxkrA3e1YzxAU4L7ivLzdgjgZ7XB3J9qHH5G4Vhl_ycBoXA36vVaw/exec";

    const rawScriptUrl =
      process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL ||
      process.env.VITE_CONTACT_SCRIPT_URL ||
      "";

    const scriptUrl =
      !rawScriptUrl || rawScriptUrl.includes("DEPLOYMENT_ID")
        ? DEFAULT_SCRIPT_URL
        : rawScriptUrl;

    if (!scriptUrl) {
      setStatus("error");
      setErrorMessage(
        "Google Sheets script URL is not configured. Please set NEXT_PUBLIC_CONTACT_SCRIPT_URL in .env.local."
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const params = new URLSearchParams();
      params.append("name", trimmedName);
      params.append("email", trimmedEmail);
      params.append("phone", trimmedPhone);
      params.append("purpose", trimmedPurpose);
      params.append("message", trimmedMessage);

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      setStatus("success");
      analytics.trackContactFormSubmit(trimmedPurpose);
      setFormData({ name: "", email: "", phone: "", purpose: "Course Inquiry", message: "" });
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
      setErrorMessage("Failed to send message. Please check your connection and try again.");
    }
  };

  // Styling based on theme
  const isDark = theme === "dark";
  const isLight = theme === "light";

  const labelClass = isDark
    ? "text-slate-300 font-medium"
    : isLight
    ? "text-slate-700 font-semibold"
    : "text-slate-700 dark:text-slate-300 font-semibold";

  const inputClass = isDark
    ? "w-full bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
    : isLight
    ? "w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
    : "w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20";

  return (
    <div className={`w-full ${className}`}>
      {status === "success" ? (
        <div className={`p-8 rounded-2xl text-center flex flex-col items-center justify-center animate-in fade-in duration-300 ${
          isDark ? "bg-white/5 border border-white/10 text-white" : "bg-emerald-50/70 border border-emerald-200 text-slate-900"
        }`}>
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 ring-8 ring-emerald-500/10">
            <CheckCircle2 size={36} />
          </div>
          <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
          <p className={`text-sm max-w-sm mb-6 leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Thank you for reaching out. Your details have been recorded, and our team will get back to you shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={`flex flex-col ${compact ? "gap-3" : "gap-4"}`}>
          {status === "error" && errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name Field */}
          <div>
            <label htmlFor={`${formId}-name`} className={`block text-xs uppercase tracking-wider mb-1.5 ${labelClass}`}>
              Full Name <span className="text-blue-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User size={16} />
              </div>
              <input
                id={`${formId}-name`}
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Full Name"
                className={`pl-10 pr-3.5 py-2.5 rounded-xl text-sm transition-all ${inputClass}`}
              />
            </div>
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Email Field */}
            <div>
              <label htmlFor={`${formId}-email`} className={`block text-xs uppercase tracking-wider mb-1.5 ${labelClass}`}>
                Email <span className="text-blue-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  id={`${formId}-email`}
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`pl-10 pr-3.5 py-2.5 rounded-xl text-sm transition-all ${inputClass}`}
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor={`${formId}-phone`} className={`block text-xs uppercase tracking-wider mb-1.5 ${labelClass}`}>
                Phone <span className="text-blue-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone size={16} />
                </div>
                <input
                  id={`${formId}-phone`}
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={`pl-10 pr-3.5 py-2.5 rounded-xl text-sm transition-all ${inputClass}`}
                />
              </div>
            </div>
          </div>

          {/* Purpose Dropdown Field */}
          <div>
            <label htmlFor={`${formId}-purpose`} className={`block text-xs uppercase tracking-wider mb-1.5 ${labelClass}`}>
              Purpose <span className="text-blue-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <HelpCircle size={16} />
              </div>
              <select
                id={`${formId}-purpose`}
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className={`pl-10 pr-8 py-2.5 rounded-xl text-sm transition-all appearance-none cursor-pointer ${inputClass}`}
              >
                {PURPOSE_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className={isDark ? "bg-neutral-900 text-white" : "bg-white text-slate-900"}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor={`${formId}-message`} className={`block text-xs uppercase tracking-wider mb-1.5 ${labelClass}`}>
              Message
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                <MessageSquare size={16} />
              </div>
              <textarea
                id={`${formId}-message`}
                name="message"
                rows={compact ? 3 : 4}
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className={`pl-10 pr-3.5 py-2.5 rounded-xl text-sm resize-none transition-all ${inputClass}`}
              />
            </div>
          </div>

          <p className={`text-[11px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Our team typically reviews and responds to all inquiries within 1–2 business days.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Submit Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
