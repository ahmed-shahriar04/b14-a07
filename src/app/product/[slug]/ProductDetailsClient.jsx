"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  toBanglaNumber,
  getBanglaUnit,
  formatBanglaPrice,
  formatBanglaPercentage
} from "@/lib/banglaUtils";

export default function ProductDetailsClient({ product }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-8 sm:my-14 bg-white rounded-2xl border border-[#E5ECE5] p-6 sm:p-8 text-center space-y-4 sm:space-y-5 shadow-xs">
        <div className="w-12 h-12 bg-[#E7F4E9] text-[#05893E] rounded-xl flex items-center justify-center mx-auto text-xl">
          <i className="fa-solid fa-lock"></i>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-[#1D271F]">
            বিস্তারিত দেখতে সাইন ইন করুন
          </h2>
          <p className="text-xs text-[#1D271F]/60 leading-relaxed">
            বাজারভিত্তিক বিস্তারিত, গড় ও সর্বোচ্চ-সর্বনিম্ন দর দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="pt-2 space-y-2.5">
          <Link
            href={`/signin?redirect=/product/${product?.slug || product?.id}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#05893E] hover:bg-[#047F39] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <span>সাইন ইন করুন</span>
          </Link>

          <Link
            href="/signup"
            className="block w-full py-2.5 rounded-xl border border-[#D5DDD5] hover:bg-[#F3FBF4] text-xs font-semibold text-[#1D271F] transition-colors"
          >
            নতুন অ্যাকাউন্ট তৈরি করুন
          </Link>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="text-xs text-[#1D271F]/50 hover:text-[#05893E] inline-flex items-center gap-1.5 font-medium transition-colors"
          >
            <span>← হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  const markets = Array.isArray(product?.markets) ? product.markets : [];
  
  const allMins = markets.map((m) => Number(m.min)).filter((v) => !isNaN(v) && v > 0);
  const allMaxs = markets.map((m) => Number(m.max)).filter((v) => !isNaN(v) && v > 0);

  const minPrice = allMins.length > 0 ? Math.min(...allMins) : (product?.today || 0);
  const maxPrice = allMaxs.length > 0 ? Math.max(...allMaxs) : (product?.today || 0);
  const avgPrice = markets.length > 0
    ? Math.round(markets.reduce((acc, curr) => acc + ((Number(curr.min || 0) + Number(curr.max || 0)) / 2), 0) / markets.length)
    : (product?.today || 0);

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const diffYesterday = Math.abs((product.today || 0) - (product.yesterday || product.today || 0));

  return (
    <div className="space-y-4 sm:space-y-5 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#1D271F]/60 font-medium">
        <Link href="/" className="hover:text-[#05893E] transition-colors">হোম</Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-[#05893E] transition-colors">
          {product.categoryNameBn || "চাল"}
        </Link>
        <span>›</span>
        <span className="text-[#1D271F] font-bold">{product.nameBn}</span>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5ECE5] p-4 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 shadow-xs">
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-5">
          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-xl bg-[#F0F5F0] flex items-center justify-center text-2xl sm:text-4xl shrink-0">
            {product.image || product.categoryIcon || "🍚"}
          </div>
          
          <div className="space-y-1 min-w-0 flex-1">
            <h1 className="text-xl sm:text-3xl font-extrabold text-[#1D271F] tracking-tight leading-snug">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-[#1D271F]/60">
              {getBanglaUnit(product.unit)} · {product.categoryNameBn || "চাল"}
            </p>
            <p className="text-[11px] sm:text-xs text-[#1D271F]/70 pt-0.5 leading-relaxed">
              {isUp && (
                <span>
                  গতকালকের তুলনায় আজ দাম <span className="font-bold text-[#1D271F]">বেড়েছে</span> · <span className="font-num font-semibold">{toBanglaNumber(diffYesterday)}</span> টাকা
                </span>
              )}
              {isDown && (
                <span>
                  গতকালকের তুলনায় আজ দাম <span className="font-bold text-[#1D271F]">কমেছে</span> · <span className="font-num font-semibold">{toBanglaNumber(diffYesterday)}</span> টাকা
                </span>
              )}
              {!isUp && !isDown && <span>গতকালকের তুলনায় আজ দাম অপরিবর্তিত</span>}
            </p>
          </div>
        </div>

        <div className="bg-[#F0F5F0]/70 rounded-xl p-3 sm:p-5 text-center sm:min-w-[130px] flex sm:flex-col items-center justify-between sm:justify-center border border-[#E5ECE5]">
          <div className="text-left sm:text-center">
            <span className="text-[11px] sm:text-xs text-[#1D271F]/60 font-medium block">আজকের দাম</span>
            <div className="flex items-baseline gap-1 sm:block mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-[#1D271F] leading-none font-num">
                {toBanglaNumber(product.today)}
              </span>
              <span className="text-[11px] sm:text-xs text-[#1D271F]/60 font-medium sm:block sm:mt-1">
                টাকা / {getBanglaUnit(product.unit).replace("প্রতি ", "")}
              </span>
            </div>
          </div>
          
          <div className="mt-0 sm:mt-1.5 flex justify-center">
            {isUp && (
              <span className="text-xs font-bold text-red-600 bg-red-50 sm:bg-transparent px-2 sm:px-0 py-0.5 sm:py-0 rounded-md flex items-center gap-1">
                <span>▲</span>
                <span className="font-num">{formatBanglaPercentage(product.change?.pct)}</span>
              </span>
            )}
            {isDown && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 sm:bg-transparent px-2 sm:px-0 py-0.5 sm:py-0 rounded-md flex items-center gap-1">
                <span>▼</span>
                <span className="font-num">{formatBanglaPercentage(product.change?.pct)}</span>
              </span>
            )}
            {!isUp && !isDown && (
              <span className="text-xs font-semibold text-gray-500 bg-gray-50 sm:bg-transparent px-2 sm:px-0 py-0.5 sm:py-0 rounded-md flex items-center gap-1">
                <span>—</span>
                <span className="font-num">{formatBanglaPercentage(product.change?.pct || 0)}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5ECE5] p-4 sm:p-8 space-y-6 sm:space-y-8 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#1D271F] mb-3 sm:mb-4">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-3 gap-2 sm:gap-5">
            <div className="p-3 sm:p-5 rounded-xl border border-[#E5ECE5] bg-white space-y-0.5 sm:space-y-1">
              <span className="text-[11px] sm:text-xs text-[#1D271F]/60 font-medium block">সর্বনিম্ন দাম</span>
              <span className="text-base sm:text-2xl font-black text-emerald-600 block font-num leading-tight">
                {formatBanglaPrice(minPrice)}
              </span>
              <span className="text-[10px] sm:text-xs text-[#1D271F]/60 block line-clamp-1">
                সবচেয়ে কম
              </span>
            </div>

            <div className="p-3 sm:p-5 rounded-xl border border-[#E5ECE5] bg-white space-y-0.5 sm:space-y-1">
              <span className="text-[11px] sm:text-xs text-[#1D271F]/60 font-medium block">সর্বাধিক দাম</span>
              <span className="text-base sm:text-2xl font-black text-red-600 block font-num leading-tight">
                {formatBanglaPrice(maxPrice)}
              </span>
              <span className="text-[10px] sm:text-xs text-[#1D271F]/60 block line-clamp-1">
                সবচেয়ে বেশি
              </span>
            </div>

            <div className="p-3 sm:p-5 rounded-xl border border-[#E5ECE5] bg-white space-y-0.5 sm:space-y-1">
              <span className="text-[11px] sm:text-xs text-[#1D271F]/60 font-medium block">গড় দাম</span>
              <span className="text-base sm:text-2xl font-black text-emerald-600 block font-num leading-tight">
                {formatBanglaPrice(avgPrice)}
              </span>
              <span className="text-[10px] sm:text-xs text-[#1D271F]/60 block line-clamp-1">
                গড় বাজার দর
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-bold text-[#1D271F]">বাজারভিত্তিক আজকের দাম</h2>
            <span className="text-xs sm:text-sm text-[#1D271F]/60 font-medium">
              মোট <span className="font-num font-semibold text-[#1D271F] px-0.5">{toBanglaNumber(markets.length)}</span>টি বাজার
            </span>
          </div>

          <div className="border border-[#E5ECE5] rounded-xl overflow-x-auto bg-white">
            <table className="w-full min-w-[540px] sm:min-w-[600px] text-left text-xs sm:text-sm leading-relaxed">
              <thead>
                <tr className="bg-[#FAFDF9] border-b border-[#E5ECE5] text-[#1D271F]/70 text-xs font-semibold">
                  <th className="py-2.5 sm:py-3 px-3 sm:px-4 font-semibold whitespace-nowrap">বাজার</th>
                  <th className="py-2.5 sm:py-3 px-3 sm:px-4 font-semibold whitespace-nowrap">বিভাগ</th>
                  <th className="py-2.5 sm:py-3 px-3 sm:px-4 font-semibold whitespace-nowrap text-right">সর্বনিম্ন</th>
                  <th className="py-2.5 sm:py-3 px-3 sm:px-4 font-semibold whitespace-nowrap text-right">সর্বাধিক</th>
                  <th className="py-2.5 sm:py-3 px-3 sm:px-4 font-semibold whitespace-nowrap text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5ECE5]">
                {markets.length > 0 ? (
                  markets.map((m, idx) => {
                    const avg = ((Number(m.min || 0) + Number(m.max || 0)) / 2);
                    return (
                      <tr key={`${m.market || "market"}-${idx}`} className="hover:bg-[#F3F7F3] transition-colors">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-bold text-[#1D271F] whitespace-nowrap">{m.market}</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[#1D271F]/70 whitespace-nowrap">{m.division}</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-medium text-[#1D271F] whitespace-nowrap text-right font-num">{formatBanglaPrice(m.min)}</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-medium text-[#1D271F] whitespace-nowrap text-right font-num">{formatBanglaPrice(m.max)}</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-black text-[#1D271F] whitespace-nowrap text-right font-num">{formatBanglaPrice(avg)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-xs text-[#1D271F]/50">
                      এই পণ্যের জন্য নির্দিষ্ট বাজারভিত্তিক তালিকা পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

