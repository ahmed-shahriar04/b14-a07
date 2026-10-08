"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center bg-white border border-[#E1E8E1] rounded-3xl p-8 sm:p-10 shadow-sm">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>

        <h2 className="text-2xl font-bold text-[#1D271F] mb-2">
          কিছু একটা সমস্যা হয়েছে!
        </h2>

        <p className="text-sm text-[#1D271F]/70 mb-6 leading-relaxed">
          দুঃখিত, তথ্য লোড করার সময় একটি সমস্যা দেখা দিয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন অথবা হোম পেজে ফিরে যান।
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#05893E] hover:bg-[#047F39] text-white text-sm font-semibold rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-rotate-right text-xs"></i>
            <span>পুনরায় চেষ্টা করুন</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 border border-[#DCE4DC] bg-white hover:bg-[#F3FBF4] text-[#1D271F] text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-house text-xs text-[#05893E]"></i>
            <span>হোম পেজ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
