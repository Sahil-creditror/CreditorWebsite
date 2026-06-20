"use client";

import Image from "next/image";
import Link from "next/link";
import { openWebinarRegistration } from "@/app/lib/openWebinarRegistration";

export default function LearningSection() {
  

  const currentYear = new Date().getFullYear();

  return (
    <div>
     

      {/* SIMPLE 7. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm">
          <p className="text-white/80">
            &copy; {currentYear} Creditor Academy. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white transition-colors duration-150">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors duration-150">
              Terms and Conditions
            </Link>
           
          </div>
        </div>
      </footer>
    </div>
  );
}