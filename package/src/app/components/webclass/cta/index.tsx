"use client";

export default function CTASection() {
  const handleRegisterClick = () => {
    // Dispatch custom event to open the registration modal in WebclassSection
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('openWebinarRegistration'));
    }
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      {/* subtle background art */}
      <div className="absolute inset-0 pointer-events-none">
        {/* soft left panel */}
        <div className="hidden md:block absolute -left-40 top-10 w-[520px] h-[380px] rounded-3xl bg-blue-100/30 dark:bg-white/10 blur-[1px]" />

        {/* soft right panel */}
        <div className="hidden md:block absolute right-[-12%] top-24 w-[560px] h-[420px] rounded-[40px] bg-blue-100/30 dark:bg-white/10" />

        {/* top-right glow / circle accent */}
        <div className="absolute -top-24 right-24 w-40 h-40 rounded-full bg-blue-200/40 dark:bg-white/30 blur-3xl opacity-70" />

        {/* dark-mode radial glow overlay */}
        <div className="hidden dark:block w-full h-full opacity-[0.25] bg-[radial-gradient(circle_at_top,_rgba(2,111,226,0.6),_transparent_55%)]" />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* CTA Text */}
          <p className="text-xl md:text-3xl font-semibold leading-relaxed text-gray-900 dark:text-white mb-8">
            Ready to transform your financial future? Register now and secure your spot for our exclusive webinar.
          </p>

          {/* Register Button */}
          <button
            onClick={handleRegisterClick}
            className="inline-flex items-center justify-center font-bold text-base md:text-lg px-8 py-4 rounded-lg shadow-lg transition-colors bg-[#FFC107] hover:bg-[#FFD700] text-gray-900"
            style={{ 
              fontFamily: "Arial, sans-serif",
              boxShadow: "0 8px 20px rgba(255, 193, 7, 0.4)"
            }}
          >
            Register For Webinar
          </button>
        </div>
      </div>
    </section>
  );
}

