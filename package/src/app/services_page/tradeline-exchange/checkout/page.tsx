// @ts-nocheck
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { cartStore } from "../lib/cart";
import { MOCK_TRADELINES } from "../lib/tradelines";

const PAYMENT_LINK_BASE =
  process.env.NEXT_PUBLIC_PAYMENT_LINK_BASE ??
  "https://pay.example.com/checkout";

export default function CheckoutPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState(cartStore.getCart());
  const [formData, setFormData] = useState({
    // Billing Details
    billingFirstName: "",
    billingLastName: "",
    companyName: "",
    billingAddress: "",
    billingAddress2: "",
    billingCity: "",
    billingState: "California",
    billingZip: "",
    billingPhone: "",
    billingEmail: "",
    billingEmailConfirm: "",
    // Authorized User Info
    sameAsBilling: false,
    clientFirstName: "",
    clientLastName: "",
    clientAddress: "",
    clientAddress2: "",
    clientCity: "",
    clientState: "",
    clientZip: "",
    clientPhone: "",
    clientEmail: "",
    clientEmailConfirm: "",
    clientDOBMonth: "",
    clientDOBDay: "",
    clientDOBYear: "",
    clientSSN: "",
    // Payment Details
    routingNumber: "",
    routingNumberConfirm: "",
    accountNumber: "",
    accountNumberConfirm: "",
    authorizeECheck: false,
    // Files
    billingDL: null as File | null,
    clientDL: null as File | null,
    clientSSNCard: null as File | null,
    // Additional
    orderNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const agreementSigned = localStorage.getItem("user_agreement_signed");
      
      if (!storedUser) {
        router.push("/signin?redirect=/services_page/tradeline-exchange/checkout");
        return;
      }
      
      if (!agreementSigned) {
        router.push("/services_page/tradeline-exchange/user-agreement");
        return;
      }

      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      const email = parsed.email || parsed.user || "";
      setFormData((prev) => ({
        ...prev,
        billingEmail: email,
        billingEmailConfirm: email,
      }));
    }
  }, [router]);

  const enrichedCart = useMemo(() => {
    return cart.map((item) => ({
      ...item,
      tradeline: MOCK_TRADELINES.find((t) => t.id === item.tradelineId),
    }));
  }, [cart]);

  const subtotal = useMemo(() => {
    return enrichedCart.reduce(
      (sum, item) => sum + (item.tradeline?.price || 0) * item.quantity,
      0
    );
  }, [enrichedCart]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        ...(name === "sameAsBilling" && checked
          ? {
              clientFirstName: formData.billingFirstName,
              clientLastName: formData.billingLastName,
              clientAddress: formData.billingAddress,
              clientAddress2: formData.billingAddress2,
              clientCity: formData.billingCity,
              clientState: formData.billingState,
              clientZip: formData.billingZip,
              clientPhone: formData.billingPhone,
              clientEmail: formData.billingEmail,
              clientEmailConfirm: formData.billingEmailConfirm,
            }
          : {}),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Billing validation
    if (!formData.billingFirstName) newErrors.billingFirstName = "Required";
    if (!formData.billingLastName) newErrors.billingLastName = "Required";
    if (!formData.billingAddress) newErrors.billingAddress = "Required";
    if (!formData.billingCity) newErrors.billingCity = "Required";
    if (!formData.billingState) newErrors.billingState = "Required";
    if (!formData.billingZip) newErrors.billingZip = "Required";
    if (!formData.billingPhone) newErrors.billingPhone = "Required";
    if (!formData.billingEmail) newErrors.billingEmail = "Required";
    if (formData.billingEmail !== formData.billingEmailConfirm) {
      newErrors.billingEmailConfirm = "Emails do not match";
    }

    // Authorized User validation
    if (!formData.clientFirstName) newErrors.clientFirstName = "Required";
    if (!formData.clientLastName) newErrors.clientLastName = "Required";
    if (!formData.clientAddress) newErrors.clientAddress = "Required";
    if (!formData.clientCity) newErrors.clientCity = "Required";
    if (!formData.clientState) newErrors.clientState = "Required";
    if (!formData.clientZip) newErrors.clientZip = "Required";
    if (!formData.clientPhone) newErrors.clientPhone = "Required";
    if (!formData.clientEmail) newErrors.clientEmail = "Required";
    if (formData.clientEmail !== formData.clientEmailConfirm) {
      newErrors.clientEmailConfirm = "Emails do not match";
    }
    if (!formData.clientDOBMonth || !formData.clientDOBDay || !formData.clientDOBYear) {
      newErrors.clientDOB = "Date of birth is required";
    }
    if (!formData.clientSSN) newErrors.clientSSN = "Required";

    // Payment validation
    if (!formData.routingNumber) newErrors.routingNumber = "Required";
    if (formData.routingNumber !== formData.routingNumberConfirm) {
      newErrors.routingNumberConfirm = "Routing numbers do not match";
    }
    if (!formData.accountNumber) newErrors.accountNumber = "Required";
    if (formData.accountNumber !== formData.accountNumberConfirm) {
      newErrors.accountNumberConfirm = "Account numbers do not match";
    }
    if (!formData.authorizeECheck) {
      newErrors.authorizeECheck = "You must authorize eCheck payments";
    }

    // File validation
    if (!formData.billingDL) newErrors.billingDL = "Required";
    if (!formData.clientDL) newErrors.clientDL = "Required";
    if (!formData.clientSSNCard) newErrors.clientSSNCard = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    setSubmitting(true);
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just redirect to payment
      const paymentLink = `${PAYMENT_LINK_BASE}?amount=${subtotal.toFixed(2)}`;
      window.location.href = paymentLink;
    } catch (error) {
      alert("An error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  if (!user || cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Service Terms Button */}
        <div className="mb-6">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Service Terms & Disclosures
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Billing Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Billing details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Billing First Name *
                      </label>
                      <input
                        type="text"
                        name="billingFirstName"
                        value={formData.billingFirstName}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${
                          errors.billingFirstName ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Billing Last Name *
                      </label>
                      <input
                        type="text"
                        name="billingLastName"
                        value={formData.billingLastName}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${
                          errors.billingLastName ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Company name (optional)
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Billing Address *
                    </label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      placeholder="House number and street name"
                      className={`w-full rounded-lg border px-3 py-2 text-sm mb-2 ${
                        errors.billingAddress ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    <input
                      type="text"
                      name="billingAddress2"
                      value={formData.billingAddress2}
                      onChange={handleChange}
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${
                          errors.billingCity ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        State *
                      </label>
                      <select
                        name="billingState"
                        value={formData.billingState}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${
                          errors.billingState ? "border-red-500" : "border-gray-200"
                        }`}
                      >
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                        <option value="Texas">Texas</option>
                        {/* Add more states */}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="billingZip"
                        value={formData.billingZip}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${
                          errors.billingZip ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="billingPhone"
                      value={formData.billingPhone}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.billingPhone ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="billingEmail"
                      value={formData.billingEmail}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-3 py-2 text-sm mb-2 ${
                        errors.billingEmail ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    <input
                      type="email"
                      name="billingEmailConfirm"
                      value={formData.billingEmailConfirm}
                      onChange={handleChange}
                      placeholder="Email Address Confirmation *"
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.billingEmailConfirm ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>

                  {subtotal >= 2000 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-700">
                        For Orders over $2,000 or customers with previously
                        returned eCheck payments, click{" "}
                        <a href="#" className="underline">
                          (here)
                        </a>{" "}
                        to place a Store Credit request. You will need to place
                        a new order once your store credit code is activated.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-red-700 font-semibold">
                    EXTREMELY URGENT: PLEASE MAKE ABSOLUTELY CERTAIN THAT YOU
                    HAVE SUFFICIENT FUNDS IN YOUR BANK ACCOUNT, AND THAT YOUR
                    ROUTING AND ACCOUNT NUMBERS ARE 100% ACCURATE. A $25
                    non-sufficient funds fee will be issued immediately if your
                    eCheck gets returned for non-sufficient funds and your bank
                    account will permanently be blocked from our website
                    automatically. Returned payments damage our relationship
                    with our merchant processor, our credit partners, and cause
                    inventory and processing issues. DO NOT PLACE AN ORDER IF
                    YOUR PAYMENT IS GOING TO BE RETURNED.
                  </p>
                </div>

                <div className="mb-4">
                  {/* Check example illustration - using CSS instead of image */}
                  <div className="w-full max-w-md mx-auto bg-white border-2 border-gray-300 rounded-lg p-6 shadow-sm">
                    <div className="text-center mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Sample Check Layout</p>
                      <div className="bg-gray-100 rounded p-4 border-2 border-dashed border-gray-300">
                        <div className="text-xs text-gray-500 space-y-1">
                          <div className="flex justify-between">
                            <span>Routing #:</span>
                            <span className="font-mono">123456789</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Account #:</span>
                            <span className="font-mono">987654321</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Check #:</span>
                            <span className="font-mono">001</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center mt-2">
                    <div className="text-center">
                      <div className="w-20 h-12 bg-red-200 rounded mb-1"></div>
                      <p className="text-xs font-semibold">ROUTING NUMBER</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-12 bg-green-200 rounded mb-1"></div>
                      <p className="text-xs font-semibold">ACCOUNT NUMBER</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-12 bg-blue-200 rounded mb-1"></div>
                      <p className="text-xs font-semibold">CHECK NUMBER</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Routing Number *
                    </label>
                    <input
                      type="text"
                      name="routingNumber"
                      value={formData.routingNumber}
                      onChange={handleChange}
                      maxLength={9}
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.routingNumber ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Confirm Routing Number *
                    </label>
                    <input
                      type="text"
                      name="routingNumberConfirm"
                      value={formData.routingNumberConfirm}
                      onChange={handleChange}
                      maxLength={9}
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.routingNumberConfirm ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.accountNumber ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Confirm Account Number *
                    </label>
                    <input
                      type="text"
                      name="accountNumberConfirm"
                      value={formData.accountNumberConfirm}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.accountNumberConfirm ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Additional information</h2>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Order Notes (optional)
                  </label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="You can add any notes regarding your order here."
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Authorized User & Documentation */}
            <div className="space-y-6">
              {/* Authorized User Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Authorized User Information</h2>
                <div className="mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="sameAsBilling"
                      checked={formData.sameAsBilling}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Same as Billing Information (optional)</span>
                  </label>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Client First Name *
                      </label>
                      <input
                        type="text"
                        name="clientFirstName"
                        value={formData.clientFirstName}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${
                          errors.clientFirstName ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Client Last Name *
                      </label>
                      <input
                        type="text"
                        name="clientLastName"
                        value={formData.clientLastName}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${
                          errors.clientLastName ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Client Address (No PO Boxes) *
                    </label>
                    <input
                      type="text"
                      name="clientAddress"
                      value={formData.clientAddress}
                      onChange={handleChange}
                      placeholder="House number and street name"
                      className={`w-full rounded-lg border px-3 py-2 text-sm mb-2 ${
                        errors.clientAddress ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    <input
                      type="text"
                      name="clientAddress2"
                      value={formData.clientAddress2}
                      onChange={handleChange}
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="clientCity"
                        value={formData.clientCity}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${
                          errors.clientCity ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        State *
                      </label>
                      <select
                        name="clientState"
                        value={formData.clientState}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${
                          errors.clientState ? "border-red-500" : "border-gray-200"
                        }`}
                      >
                        <option value="">Select an option...</option>
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                        <option value="Texas">Texas</option>
                        {/* Add more states */}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="clientZip"
                        value={formData.clientZip}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${
                          errors.clientZip ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.clientPhone ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Client Email Address *
                    </label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-3 py-2 text-sm mb-2 ${
                        errors.clientEmail ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    <input
                      type="email"
                      name="clientEmailConfirm"
                      value={formData.clientEmailConfirm}
                      onChange={handleChange}
                      placeholder="Email Address Confirmation *"
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.clientEmailConfirm ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        name="clientDOBMonth"
                        value={formData.clientDOBMonth}
                        onChange={handleChange}
                        placeholder="MM"
                        maxLength={2}
                        className={`rounded-lg border px-3 py-2 text-sm ${
                          errors.clientDOB ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                      <input
                        type="text"
                        name="clientDOBDay"
                        value={formData.clientDOBDay}
                        onChange={handleChange}
                        placeholder="DD"
                        maxLength={2}
                        className={`rounded-lg border px-3 py-2 text-sm ${
                          errors.clientDOB ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                      <input
                        type="text"
                        name="clientDOBYear"
                        value={formData.clientDOBYear}
                        onChange={handleChange}
                        placeholder="YYYY"
                        maxLength={4}
                        className={`rounded-lg border px-3 py-2 text-sm ${
                          errors.clientDOB ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Social Security Number *
                    </label>
                    <input
                      type="text"
                      name="clientSSN"
                      value={formData.clientSSN}
                      onChange={handleChange}
                      maxLength={11}
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.clientSSN ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Documentation */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Documentation:</h2>
                <div className="mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="authorizeECheck"
                      checked={formData.authorizeECheck}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Check box to authorize eCheck payments</span>
                  </label>
                  {errors.authorizeECheck && (
                    <p className="text-red-500 text-xs mt-1">{errors.authorizeECheck}</p>
                  )}
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs text-gray-700">
                  <p>
                    By checking this box, you authorize Tradeline Supply Company
                    to process an electronic check payment from your bank
                    account. You understand that insufficient funds may result
                    in fees and account restrictions.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Upload a clear color copy of the Drivers License or
                      Passport for Billing Info *
                    </label>
                    <input
                      type="file"
                      name="billingDL"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.billingDL ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {formData.billingDL && (
                      <p className="text-xs text-gray-600 mt-1">
                        Selected: {formData.billingDL.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Upload a clear color copy of the Drivers License or
                      Passport for Authorized User *
                    </label>
                    <input
                      type="file"
                      name="clientDL"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.clientDL ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {formData.clientDL && (
                      <p className="text-xs text-gray-600 mt-1">
                        Selected: {formData.clientDL.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Upload a clear color copy of the Social Security card for
                      Authorized User *
                    </label>
                    <input
                      type="file"
                      name="clientSSNCard"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.clientSSNCard ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {formData.clientSSNCard && (
                      <p className="text-xs text-gray-600 mt-1">
                        Selected: {formData.clientSSNCard.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Your order</h2>
                <div className="space-y-2">
                  {enrichedCart.map((item) => (
                    <div
                      key={item.tradelineId}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.tradeline?.bankName || "Tradeline"} x {item.quantity}
                      </span>
                      <span className="font-semibold">
                        ${((item.tradeline?.price || 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={submitting}
              className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 text-black font-semibold py-3 px-8 rounded-lg transition"
            >
              {submitting ? "Processing..." : "Submit Order"}
            </button>
            <p className="text-sm text-red-600 mt-2">
              Please only hit Submit Order once and wait for completed order
              page before closing your browser.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

