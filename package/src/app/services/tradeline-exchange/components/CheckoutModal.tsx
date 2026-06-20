"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Tradeline {
  id: string;
  bankName: string;
  creditLimit: number;
  price: number;
  ageYears: number;
  last4: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  tradeline: Tradeline | null;
  onProceed: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  tradeline,
  onProceed,
}: CheckoutModalProps) {
  const router = useRouter();

  if (!isOpen || !tradeline) return null;

  const handleProceedToCheckout = () => {
    onClose();
    onProceed();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Proceed to Checkout</h2>
            <p className="text-slate-600 text-sm">
              Review your tradeline selection and continue to complete your purchase
            </p>
          </div>

          {/* Tradeline Summary */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900 mb-3">Selected Tradeline</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Bank:</span>
                <span className="font-semibold text-slate-900">{tradeline.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Card ID:</span>
                <span className="font-semibold text-slate-900">**** {tradeline.last4}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Credit Limit:</span>
                <span className="font-semibold text-slate-900">
                  ${tradeline.creditLimit.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Age:</span>
                <span className="font-semibold text-slate-900">{tradeline.ageYears} years</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="text-lg font-semibold text-slate-900">Price:</span>
                <span className="text-xl font-bold text-sky-600">
                  ${tradeline.price.toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h3 className="font-semibold text-amber-900 mb-3">Required Documents at Checkout:</h3>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-amber-800">
              <li>Authorized User's Driver's License</li>
              <li>Authorized User's Social Security Card</li>
              <li>Billing Party's Driver's License (if different from the AU)</li>
              <li>Payment method: Electronic Check (no credit cards)</li>
            </ul>
          </div>

          {/* Important Notice */}
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-red-800 text-sm font-semibold mb-1">⚠️ Important Notice</p>
            <p className="text-red-700 text-sm">
              We do not sell tradelines in Georgia. Please verify your location before proceeding.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleProceedToCheckout}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              Proceed to Checkout
            </button>
          </div>

          {/* Help Text */}
          <p className="mt-4 text-xs text-slate-500 text-center">
            Need help? Contact us with any questions about your purchase.
          </p>
        </div>
      </div>
    </div>
  );
}
