"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type MerchantFeaturesProps = {
  title?: string;
  subtitle?: string;
  sideImageSrc?: string;
  highlightedPhrase?: string;
};

export default function MerchantFeatures({
  title = "Creditor Academy Private Merchant Processing",
  subtitle = "Process Payments Privately. Get Paid Securely. Stay in Control.",
  sideImageSrc = "http://localhost:5173/src/assets/PMP_Flex.webp",
  highlightedPhrase = "private operators",
}: MerchantFeaturesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 bg-lightgray/50 dark:bg-[#101828] overflow-hidden"
    >
      <div className="container">
        <div className={`text-center max-w-3xl mx-auto mb-8 md:mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-primary underline decoration-blue-500 underline-offset-8">
            {title}
          </h2>
          <p className="text-lg md:text-2xl text-secondary/80 dark:text-white/85">
            {subtitle}
          </p>
        </div>

        <div className={`bg-white dark:bg-[#101828] rounded-xl shadow-lg border border-secondary/10 dark:border-white/10 p-5 md:p-8 max-w-5xl mx-auto transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'} hover:shadow-2xl hover:-translate-y-1`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-xl md:text-2xl font-extrabold leading-snug mb-3">
                Welcome to the payment gateway for
                <span className="block md:inline md:ml-2 text-primary underline decoration-dotted underline-offset-4 transition-all duration-300 hover:decoration-solid hover:underline-offset-2">
                  {highlightedPhrase}
                </span>
              </h3>
              <div className="space-y-3 text-secondary/80 dark:text-white/80 text-base md:text-lg">
                <p className="transition-all duration-500 hover:translate-x-1">
                  Creditor Academy Private Merchant Processing gives you the power to accept payments
                  without compromising your sovereignty, your privacy, or your mission.
                </p>
                <p className="transition-all duration-500 hover:translate-x-1 delay-100">
                  Built on the robust NMI + International Banking platform + Shopify, we provide
                  elite-level processing designed for those who operate in the private domain — not
                  under the thumb of Big Tech or Big Banks.
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative w-full h-56 md:h-64 rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                <Image 
                  src={sideImageSrc} 
                  alt="Contactless payment" 
                  fill 
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}