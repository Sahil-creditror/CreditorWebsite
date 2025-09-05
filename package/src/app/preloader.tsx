"use client";
import { useEffect, useState } from "react";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");
  const [currentStep, setCurrentStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  const loadingSteps = [
    "Initializing",
    "Loading Assets", 
    "Preparing Interface",
    "Almost Ready",
    "Welcome to Creditor Academy"
  ];

  useEffect(() => {
    // Set mounted to true immediately to prevent hydration mismatch
    setMounted(true);
    
    // Simulate progress with more realistic increments
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 8 + 2; // More gradual progress
      });
    }, 80);

    // Simulate loading steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = (prev + 1) % loadingSteps.length;
        setLoadingText(loadingSteps[nextStep]);
        return nextStep;
      });
    }, 600);

    // Complete loading after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  if (loading && mounted) {
    return (
      <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-[9999] overflow-hidden font-['Inter',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
        {/* Professional single-color background */}
        <div className="absolute inset-0 w-full h-full bg-[#005A9C] bg-cover bg-center"></div>
        
        {/* Main content with glassmorphism */}
        <div className="relative z-10 flex flex-col items-center gap-10 bg-white/95 rounded-[20px] px-16 py-12 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-white/30 w-[400px] md:w-[350px] md:px-10 md:py-8 md:gap-8 sm:w-[320px] sm:px-8 sm:py-6 sm:gap-6">
          {/* Professional logo section */}
          <div className="relative mb-4">
            <div className="relative w-[180px] h-[180px] rounded-full bg-gradient-to-br from-[#005A9C] to-[#00A8CC] flex items-center justify-center shadow-[0_10px_25px_rgba(0,90,156,0.3)] md:w-[160px] md:h-[160px] sm:w-[140px] sm:h-[140px]">
              <div className="w-[130px] h-[130px] rounded-full bg-white flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] md:w-[120px] md:h-[120px] sm:w-[110px] sm:h-[110px]">
                <img 
                  src="/images/logo/logo_roadmap.png" 
                  alt="Creditor Logo" 
                  className="w-20 h-20 object-contain md:w-[70px] md:h-[70px] sm:w-[60px] sm:h-[60px]"
                />
              </div>
            </div>
          </div>

          {/* Professional spinner */}
          <div className="relative w-20 h-20 flex items-center justify-center md:w-[70px] md:h-[70px] sm:w-[60px] sm:h-[60px]">
            <div className="absolute w-20 h-20 rounded-full border-[3px] border-[rgba(0,90,156,0.2)] border-t-[#005A9C] animate-spin md:w-[70px] md:h-[70px] sm:w-[60px] sm:h-[60px]"></div>
            <div className="absolute flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#005A9C] animate-bounce [animation-delay:0s]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#005A9C] animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#005A9C] animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>

          {/* Enhanced loading text */}
          <div className="text-center min-h-[60px] flex flex-col items-center justify-center gap-2">
            <div className="text-2xl font-semibold text-[#005A9C] flex items-center gap-1 mb-2 md:text-xl sm:text-lg">
              <span className="animate-fade-in">{loadingText}</span>
              <span className="animate-pulse text-[#00A8CC] font-light">|</span>
            </div>
            <div className="text-sm text-gray-600 font-normal animate-fade-in md:text-xs sm:text-xs">
              {currentStep === 0 && "Setting up your experience"}
              {currentStep === 1 && "Optimizing performance"}
              {currentStep === 2 && "Finalizing components"}
              {currentStep === 3 && "Almost there..."}
              {currentStep === 4 && "Ready to explore"}
            </div>
          </div>

          {/* Enhanced progress section */}
          <div className="w-full max-w-[280px] md:max-w-[250px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-full h-1 bg-gray-200 rounded-sm overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-[#005A9C] to-[#00A8CC] rounded-sm transition-all duration-300 relative"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#005A9C] text-base font-semibold md:text-sm sm:text-sm">{Math.round(Math.min(progress, 100))}%</span>
                <span className="text-gray-600 text-sm font-normal md:text-xs sm:text-xs">Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom animations */}
        <style jsx>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}
