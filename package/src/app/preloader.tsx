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
    setMounted(true);
    const hasSeenPreloader = typeof window !== 'undefined' && sessionStorage.getItem('hasSeenPreloader') === 'true';
    if (hasSeenPreloader) {
      setLoading(false);
      return;
    }

    let isCancelled = false;
    const tasks: Array<Promise<void>> = [];
    const incrementTextStages = [
      "Loading Assets",
      "Optimizing Media",
      "Preparing Interface",
      "Finalizing",
    ];

    const updateProgress = (completed: number, total: number) => {
      const pct = Math.round((completed / Math.max(total, 1)) * 100);
      setProgress(pct);
      const stageIndex = Math.min(
        incrementTextStages.length - 1,
        Math.floor((pct / 100) * incrementTextStages.length)
      );
      setCurrentStep(stageIndex);
      setLoadingText(incrementTextStages[stageIndex]);
    };

    // Collect resources
    const images = Array.from(document.images || []);
    const videos = Array.from(document.querySelectorAll('video')) as HTMLVideoElement[];
    const totalPlanned = images.length + videos.length + 2; // + fonts + window load

    let completed = 0;
    const markDone = () => {
      completed += 1;
      if (!isCancelled) updateProgress(completed, totalPlanned);
    };

    // Images
    images.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        markDone();
      } else {
        const onLoad = () => { img.removeEventListener('load', onLoad); img.removeEventListener('error', onError); markDone(); };
        const onError = () => { img.removeEventListener('load', onLoad); img.removeEventListener('error', onError); markDone(); };
        img.addEventListener('load', onLoad, { once: true });
        img.addEventListener('error', onError, { once: true });
      }
    });

    // Videos
    videos.forEach((vid) => {
      if (vid.readyState >= 3) { // HAVE_FUTURE_DATA
        markDone();
      } else {
        const onReady = () => { vid.removeEventListener('canplaythrough', onReady); vid.removeEventListener('error', onError); markDone(); };
        const onError = () => { vid.removeEventListener('canplaythrough', onReady); vid.removeEventListener('error', onError); markDone(); };
        vid.addEventListener('canplaythrough', onReady, { once: true });
        vid.addEventListener('error', onError, { once: true });
      }
    });

    // Fonts
    const fontsReady = (document as any).fonts?.ready instanceof Promise
      ? (document as any).fonts.ready.then(() => { if (!isCancelled) markDone(); })
      : Promise.resolve().then(() => { if (!isCancelled) markDone(); });
    tasks.push(fontsReady);

    // Window load (all subresources)
    const windowLoad = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        const handler = () => { window.removeEventListener('load', handler); resolve(); };
        window.addEventListener('load', handler, { once: true });
      }
    }).then(() => { if (!isCancelled) markDone(); });
    tasks.push(windowLoad);

    // Fallback timeout to avoid infinite waiting
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 12000));

    Promise.race([
      Promise.all(tasks),
      timeout,
    ]).then(() => {
      if (isCancelled) return;
      setProgress(100);
      setLoading(false);
      try { sessionStorage.setItem('hasSeenPreloader', 'true'); } catch {}
    });

    // Initial progress paint
    updateProgress(0, totalPlanned);

    return () => {
      isCancelled = true;
    };
  }, []);

  if (loading && mounted) {
    return (
      <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-[9999] overflow-hidden font-['Inter',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
        {/* Background with light gradient and glass overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#e7f3fb] via-[#d5ecfa] to-[#bfe3f7]"></div>
        <div className="absolute inset-0 w-full h-full bg-white/30 backdrop-blur-md"></div>
        
        {/* Main content with glassmorphism */}
        <div className="relative z-10 flex flex-col items-center gap-10 bg-white/95 rounded-[20px] px-16 py-12 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-white/30 w-[400px] md:w-[350px] sm:w-[320px] max-w-[90vw] min-h-[420px] md:min-h-[380px] sm:min-h-[340px] md:px-10 md:py-8 md:gap-8 sm:px-8 sm:py-6 sm:gap-6">
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
