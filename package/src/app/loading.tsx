"use client";
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9998] grid place-items-center bg-black/10 backdrop-blur-[2px]">
      <div className="flex flex-col items-center gap-4 bg-white/80 backdrop-blur-lg rounded-xl px-6 py-5 shadow">
        <Image
          src="/images/logo/logo_roadmap.png"
          alt="Creditor"
          width={140}
          height={40}
          priority
        />
        <div className="w-48 h-1.5 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full w-1/2 bg-[#005A9C]"
            style={{ animation: 'loadingBar 1.2s ease-in-out infinite' }}
          />
        </div>
      </div>
      <style jsx>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}


