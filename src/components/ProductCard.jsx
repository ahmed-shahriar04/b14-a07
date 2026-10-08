"use client";

import Link from "next/link";
import { formatBanglaPercentage, getBanglaUnit, formatBanglaPrice } from "@/lib/banglaUtils";

export default function ProductCard({ product }) {
  if (!product) return null;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const slug = product.slug || product.id;

  return (
    <Link
      href={`/product/${slug}`}
      className="bg-white rounded-2xl border border-[#E1E8E1] p-3 sm:p-4.5 hover:shadow-xs hover:border-[#05893E]/40 transition-all duration-150 flex flex-col justify-between"
    >
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#F0F5F0] flex items-center justify-center text-xl sm:text-2xl shrink-0">
          {product.image || product.categoryIcon || "🛍️"}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xs sm:text-[15px] font-bold text-[#1D271F] leading-snug truncate">
            {product.nameBn}
          </h3>
          <p className="text-[10px] sm:text-xs text-[#1D271F]/50 mt-0.5 font-normal truncate">
            {getBanglaUnit(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#F0F5F0] flex items-end justify-between gap-1">
        <div>
          <span className="text-[9px] sm:text-[10px] text-[#1D271F]/50 block leading-tight">আজকের দাম</span>
          <span className="text-xs sm:text-base font-extrabold text-[#1D271F] mt-0.5 block font-num whitespace-nowrap">
            {formatBanglaPrice(product.today)}
          </span>
        </div>

        <div className="shrink-0">
          {isUp && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-red-50 text-red-600 border border-red-100 font-num whitespace-nowrap">
              <span>▲</span>
              <span>{formatBanglaPercentage(product.change?.pct)}</span>
            </span>
          )}
          {isDown && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 font-num whitespace-nowrap">
              <span>▼</span>
              <span>{formatBanglaPercentage(product.change?.pct)}</span>
            </span>
          )}
          {!isUp && !isDown && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold bg-gray-100 text-gray-500 font-num whitespace-nowrap">
              <span>—</span>
              <span>{formatBanglaPercentage(product.change?.pct || 0)}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
