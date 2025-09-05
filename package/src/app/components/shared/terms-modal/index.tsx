"use client";

import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TermsModal({ isOpen, onClose }: Props) {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Terms & Conditions
        </h2>

        <div className="flex items-start gap-3 mb-6">
          <input
            id="terms"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the{" "}
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Terms & Conditions
            </a>
          </label>
        </div>

        <button
          disabled={!agreed}
          className={`w-full py-3 rounded-lg text-white font-medium transition ${
            agreed
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}
