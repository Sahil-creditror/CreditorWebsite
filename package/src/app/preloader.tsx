"use client";
import { useEffect, useState } from "react";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Simulate loading text changes
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const texts = ["Loading", "Preparing", "Almost Ready", "Welcome"];
        const currentIndex = texts.indexOf(prev);
        return texts[(currentIndex + 1) % texts.length];
      });
    }, 800);

    // Complete loading after 2.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(progressInterval);
      clearInterval(textInterval);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="preloader-container">
        {/* Background with animated gradient */}
        <div className="preloader-bg" />
        
        {/* Main content */}
        <div className="preloader-content">
          {/* Logo/Brand area */}
          <div className="logo-container">
            <div className="logo-circle">
              <div className="logo-inner">
                <img 
                  src="/images/logo/favicon.svg" 
                  alt="Creditor Logo" 
                  className="logo-image"
                />
              </div>
            </div>
          </div>

          {/* Animated spinner */}
          <div className="spinner-container">
            <div className="spinner-ring"></div>
            <div className="spinner-ring-inner"></div>
            <div className="spinner-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>

          {/* Loading text with typewriter effect */}
          <div className="loading-text">
            <span className="text-content">{loadingText}</span>
            <span className="cursor">|</span>
          </div>

          {/* Progress bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <div className="progress-text">{Math.round(Math.min(progress, 100))}%</div>
          </div>
        </div>

        <style jsx>{`
          .preloader-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            overflow: hidden;
          }

          .preloader-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            animation: gradientShift 3s ease-in-out infinite;
          }

          @keyframes gradientShift {
            0%, 100% { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            50% { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
          }

          .preloader-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }

          .logo-container {
            position: relative;
            margin-bottom: 1rem;
          }

          .logo-circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(45deg, #005A9C, #00A8CC);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            animation: logoFloat 2s ease-in-out infinite;
            box-shadow: 0 10px 30px rgba(0, 90, 156, 0.3);
          }

          .logo-circle::before {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            border-radius: 50%;
            background: linear-gradient(45deg, #005A9C, #00A8CC);
            z-index: -1;
            animation: logoPulse 2s ease-in-out infinite;
          }

          .logo-inner {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: logoRotate 3s linear infinite;
          }

          .logo-image {
            width: 40px;
            height: 40px;
            object-fit: contain;
            filter: brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(118%) contrast(119%);
          }

          @keyframes logoFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes logoPulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 0.3; }
          }

          @keyframes logoRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .spinner-container {
            position: relative;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .spinner-ring {
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 4px solid rgba(255, 255, 255, 0.2);
            border-top: 4px solid #00A8CC;
            border-right: 4px solid #005A9C;
            animation: spin 1.5s linear infinite;
          }

          .spinner-ring-inner {
            position: absolute;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-bottom: 3px solid #00A8CC;
            border-left: 3px solid #005A9C;
            animation: spin 1s linear infinite reverse;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .spinner-dots {
            position: absolute;
            display: flex;
            gap: 8px;
          }

          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #00A8CC;
            animation: dotBounce 1.4s ease-in-out infinite both;
          }

          .dot:nth-child(1) { animation-delay: -0.32s; }
          .dot:nth-child(2) { animation-delay: -0.16s; }
          .dot:nth-child(3) { animation-delay: 0s; }

          @keyframes dotBounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .loading-text {
            font-size: 1.5rem;
            font-weight: 600;
            color: white;
            text-align: center;
            min-height: 2rem;
            display: flex;
            align-items: center;
            gap: 2px;
          }

          .text-content {
            animation: textFade 0.8s ease-in-out;
          }

          .cursor {
            animation: blink 1s infinite;
            color: #00A8CC;
          }

          @keyframes textFade {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }

          .progress-container {
            width: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }

          .progress-bar {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
            position: relative;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00A8CC, #005A9C);
            border-radius: 2px;
            transition: width 0.3s ease;
            position: relative;
          }

          .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: shimmer 2s infinite;
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          .progress-text {
            color: white;
            font-size: 0.9rem;
            font-weight: 500;
            opacity: 0.8;
          }

          /* Responsive design */
          @media (max-width: 768px) {
            .logo-circle {
              width: 60px;
              height: 60px;
            }
            
            .logo-inner {
              width: 45px;
              height: 45px;
            }
            
            .logo-image {
              width: 30px;
              height: 30px;
            }
            
            .spinner-container {
              width: 80px;
              height: 80px;
            }
            
            .spinner-ring {
              width: 80px;
              height: 80px;
            }
            
            .spinner-ring-inner {
              width: 55px;
              height: 55px;
            }
            
            .loading-text {
              font-size: 1.2rem;
            }
            
            .progress-container {
              width: 150px;
            }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}
