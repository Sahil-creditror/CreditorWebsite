// @ts-nocheck
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AgreementContent from "./AgreementContent";

export default function UserAgreementPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [signature, setSignature] = useState("");
  const [signatureType, setSignatureType] = useState<"draw" | "type">("draw");
  const [typedSignature, setTypedSignature] = useState("");
  const [selectedFont, setSelectedFont] = useState("Dancing Script");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        const email = parsed.email || parsed.user || "";
        const name = parsed.name || email.split("@")[0] || "";
        setUserName(name);
        setUserEmail(email);
      } else {
        router.push("https://lmsathena.com/login?redirect=/services_page/tradeline-exchange/user-agreement");
        return;
      }

      // Initialize canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
        }
      }

      // Load Google Fonts for signature
      const link1 = document.createElement("link");
      link1.rel = "preconnect";
      link1.href = "https://fonts.googleapis.com";
      document.head.appendChild(link1);

      const link2 = document.createElement("link");
      link2.rel = "preconnect";
      link2.href = "https://fonts.gstatic.com";
      link2.crossOrigin = "anonymous";
      document.head.appendChild(link2);

      const link3 = document.createElement("link");
      link3.href =
        "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Allura&family=Pacifico&display=swap";
      link3.rel = "stylesheet";
      document.head.appendChild(link3);
    }
  }, [router]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
      setSignature(canvas.toDataURL());
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSignature(canvas.toDataURL());
    }
  };

  const clearSignature = () => {
    if (signatureType === "draw") {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          setSignature("");
        }
      }
    } else {
      setTypedSignature("");
      setSignature("");
    }
  };

  const generateTypedSignature = () => {
    if (!typedSignature.trim()) {
      setSignature("");
      return;
    }

    // Create a canvas to render the typed signature
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      ctx.fillStyle = "#000";
      ctx.font = `bold 48px "${selectedFont}", cursive`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(typedSignature, canvas.width / 2, canvas.height / 2);
      setSignature(canvas.toDataURL());
    }
  };

  useEffect(() => {
    if (signatureType === "type" && typedSignature) {
      generateTypedSignature();
    }
  }, [typedSignature, selectedFont, signatureType]);

  const handleConfirmAndSign = () => {
    if (signatureType === "type" && !typedSignature.trim()) {
      alert("Please enter your signature or switch to draw mode.");
      return;
    }
    if (signatureType === "draw" && !signature) {
      alert("Please draw your signature or switch to type mode.");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleAgreeAndSign = async () => {
    if (!isAgreed) {
      alert("Please agree to the terms.");
      return;
    }

    if (!userName || !userEmail) {
      alert("Please fill in your name and email address.");
      return;
    }

    // Ensure signature is generated for typed signatures
    if (signatureType === "type" && typedSignature && !signature) {
      generateTypedSignature();
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (!signature) {
      alert("Please provide a signature (draw or type).");
      return;
    }

    setIsSubmitting(true);
    setShowConfirmModal(false);
    
    try {
      // Call API to generate PDF and send email
      const response = await fetch("/api/auth/send-agreement-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          userEmail,
          signature,
          signedAt: new Date().toISOString(),
          signatureType,
          typedSignature: signatureType === "type" ? typedSignature : "",
          selectedFont: signatureType === "type" ? selectedFont : "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send agreement");
      }

      // Store agreement status and proceed to checkout
      localStorage.setItem("user_agreement_signed", "true");
      localStorage.setItem("agreement_signed_at", new Date().toISOString());
      
      alert("Agreement signed successfully! A copy has been sent to your email.");
      router.push("/services_page/tradeline-exchange/checkout");
    } catch (error: any) {
      console.error("Error signing agreement:", error);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 mt-8">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg shadow-sm transition">
            Service Terms & Disclosures
          </button>
        </div>

        {/* Single Card with All Content */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Agreement Document Section */}
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">TRADELINE USER AGREEMENT</h1>
            <div className="max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
              <AgreementContent />
            </div>
          </div>

          {/* Digital Signatures Section */}
          <div className="p-8 bg-gray-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">DIGITAL SIGNATURES</h2>
            
            <div className="mb-6">
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                In 2000, the U.S. Electronic Signatures in Global and National Commerce (ESIGN) Act established electronic records and signatures as legally binding, having the same legal effects as traditional paper documents and handwritten signatures. Read more at the FTC web site:{" "}
                <a
                  href="http://www.ftc.gov/os/2001/06/esign7.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  http://www.ftc.gov/os/2001/06/esign7.htm
                </a>
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="font-bold uppercase text-sm text-gray-900 leading-relaxed">
                  I HEREBY CERTIFY THAT I HAVE READ THE FORGOING AND THAT I
                  UNDERSTAND AND AGREE WITH EACH OF THE TERMS SET FORTH ABOVE AND IN
                  THE DISCLAIMER.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Signature *
                </label>
                
                {/* Signature Type Toggle */}
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSignatureType("draw");
                      setTypedSignature("");
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      signatureType === "draw"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Draw Signature
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSignatureType("type");
                      setSignature("");
                      const canvas = canvasRef.current;
                      if (canvas) {
                        const ctx = canvas.getContext("2d");
                        if (ctx) {
                          ctx.clearRect(0, 0, canvas.width, canvas.height);
                        }
                      }
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      signatureType === "type"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Type In Signature
                  </button>
                </div>

                {/* Draw Signature Option */}
                {signatureType === "draw" && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={200}
                      className="border border-gray-200 rounded cursor-crosshair w-full max-w-full h-auto"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    />
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        Please sign above using your mouse or touchpad
                      </p>
                      <button
                        type="button"
                        onClick={clearSignature}
                        className="text-sm text-red-600 hover:text-red-700 font-semibold hover:underline transition"
                      >
                        Clear Signature
                      </button>
                    </div>
                  </div>
                )}

                {/* Type Signature Option */}
                {signatureType === "type" && (
                  <div className="space-y-4">
                    <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">
                          Enter your signature
                        </label>
                        <input
                          type="text"
                          value={typedSignature}
                          onChange={(e) => setTypedSignature(e.target.value)}
                          placeholder="Type your name as signature"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Change fonts
                        </label>
                        <select
                          value={selectedFont}
                          onChange={(e) => setSelectedFont(e.target.value)}
                          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        >
                          <option value="Dancing Script">Dancing Script</option>
                          <option value="Great Vibes">Great Vibes</option>
                          <option value="Allura">Allura</option>
                          <option value="Brush Script MT">Brush Script MT</option>
                          <option value="Lucida Handwriting">Lucida Handwriting</option>
                          <option value="Pacifico">Pacifico</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Signature Preview */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white min-h-[150px] flex items-center justify-center">
                      {typedSignature ? (
                        <p
                          className="text-4xl text-gray-700"
                          style={{ fontFamily: `"${selectedFont}", cursive` }}
                        >
                          {typedSignature}
                        </p>
                      ) : (
                        <p className="text-gray-400 text-sm">
                          Your typed signature will appear here
                        </p>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="text-sm text-red-600 hover:text-red-700 font-semibold hover:underline transition"
                    >
                      Clear Signature
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer with Agreement Checkbox and Button */}
          <div className="bg-gray-800 text-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <label className="flex items-center gap-3 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm md:text-base">
                I agree to be legally bound by this agreement and{" "}
                <Link href="#" className="text-blue-400 hover:text-blue-300 underline">
                  eSignature Terms of Use
                </Link>
                .
              </span>
            </label>
            <button
              onClick={handleConfirmAndSign}
              disabled={!isAgreed || !signature || !userName || !userEmail || isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition shadow-lg hover:shadow-xl disabled:shadow-none min-w-[150px]"
            >
              {isSubmitting ? "Processing..." : "Agree & Sign"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Please Confirm full name and signature.
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setSignatureType("draw")}
                    className={`px-3 py-1 rounded text-sm font-semibold transition ${
                      signatureType === "draw"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Draw Signature
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignatureType("type")}
                    className={`px-3 py-1 rounded text-sm font-semibold transition ${
                      signatureType === "type"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Type In Signature
                  </button>
                </div>

                {signatureType === "type" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={typedSignature}
                      onChange={(e) => setTypedSignature(e.target.value)}
                      placeholder="Type your signature"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Change fonts:</span>
                      <select
                        value={selectedFont}
                        onChange={(e) => setSelectedFont(e.target.value)}
                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="Dancing Script">Dancing Script</option>
                        <option value="Great Vibes">Great Vibes</option>
                        <option value="Allura">Allura</option>
                        <option value="Brush Script MT">Brush Script MT</option>
                        <option value="Lucida Handwriting">Lucida Handwriting</option>
                        <option value="Pacifico">Pacifico</option>
                      </select>
                    </div>
                  </div>
                )}

                {signatureType === "draw" && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
                    <canvas
                      ref={canvasRef}
                      width={500}
                      height={150}
                      className="border border-gray-200 rounded cursor-crosshair w-full max-w-full h-auto"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    />
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="mt-2 text-xs text-red-600 hover:text-red-700 font-semibold hover:underline transition"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* Signature Preview */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[120px] flex items-center justify-center mt-2">
                  {signature ? (
                    signatureType === "draw" ? (
                      <img
                        src={signature}
                        alt="Signature"
                        className="max-w-full max-h-24"
                      />
                    ) : (
                      <p
                        className="text-3xl text-gray-700"
                        style={{ fontFamily: `"${selectedFont}", cursive` }}
                      >
                        {typedSignature}
                      </p>
                    )
                  ) : (
                    <p className="text-gray-400 text-sm">
                      {signatureType === "draw"
                        ? "Draw your signature above"
                        : "Type your signature above"}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <p className="text-sm text-gray-700">
                  I agree that I am <strong>{userName || "[Your Name]"}</strong> and I understand this is a legal representation of my signature.
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAgreeAndSign}
                disabled={!signature || !userName || isSubmitting}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition"
              >
                {isSubmitting ? "Processing..." : "Adopt & Sign"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
