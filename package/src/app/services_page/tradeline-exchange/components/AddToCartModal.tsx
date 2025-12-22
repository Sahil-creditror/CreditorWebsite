"use client";

import { X } from "lucide-react";
import Link from "next/link";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
}

export default function AddToCartModal({
  isOpen,
  onClose,
  itemCount,
}: AddToCartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-green-600 font-semibold text-lg">
              {itemCount}x product(s) added to cart
            </p>
          </div>

          <div className="mb-6">
            <Link
              href="/services_page/tradeline-exchange/cart"
              className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded text-center transition"
            >
              Go to Cart
            </Link>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-lg mb-3">Required Documents at Checkout:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Authorized User's Driver's License</li>
              <li>Authorized User's Social Security Card</li>
              <li>Billing Party's Driver's License (if different from the AU)</li>
              <li>Payment method is Electronic Check (no credit cards)</li>
            </ul>
          </div>

          <div className="mb-4">
            <p className="text-red-600 text-sm">
              *We do not sell tradelines in Georgia
            </p>
          </div>

          <p className="text-sm text-gray-600">
            Call or email with any questions.
          </p>
        </div>
      </div>
    </div>
  );
}

