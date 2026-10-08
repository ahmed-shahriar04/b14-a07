"use client";

import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/banglaUtils";

export default function HeroBanner() {
  const [dateStr, setDateStr] = useState(getBanglaDate());

  useEffect(() => {
    const update = () => setDateStr(getBanglaDate());
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProducts = () => {
    const el = document.getElementById("সব-পণ্য");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white rounded-3xl border border-[#E1E8E1] p-6 sm:p-10 lg:p-12 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#E7F4E9] text-[#05893E] text-xs font-semibold font-num" suppressHydrationWarning>
            {dateStr}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1D271F] tracking-tight leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-sm sm:text-base text-[#1D271F]/60 max-w-2xl leading-relaxed font-normal">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#05893E] hover:bg-[#047F39] text-white text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="w-full max-w-[280px] sm:max-w-[320px]">
            <img
              src="/bazar-hero.png"
              alt="বাজারের ঝুড়ি"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
