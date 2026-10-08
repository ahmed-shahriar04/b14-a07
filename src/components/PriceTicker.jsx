"use client";

import Link from "next/link";
import { toBanglaNumber, getBanglaUnit, formatBanglaPercentage } from "@/lib/banglaUtils";

export default function PriceTicker({ products = [] }) {
  if (!products || products.length === 0) return null;

  const tickerItems = [...products, ...products];

  return (
    <div className="bg-[#FAFCFA] border-b border-[#E1E8E1] py-2 overflow-hidden">
      <div className="overflow-hidden relative w-full">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap pl-4">
          {tickerItems.map((item, idx) => {
            const isUp = item.change?.dir === "up";
            const isDown = item.change?.dir === "down";

            return (
              <Link
                key={`${item.id || item.slug}-${idx}`}
                href={`/product/${item.slug || item.id}`}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#1D271F] hover:text-[#05893E] transition-colors"
              >
                <span className="text-sm">{item.image || item.categoryIcon || "🛒"}</span>
                <span className="font-semibold text-[#1D271F]">{item.nameBn}</span>
                <span className="text-[#1D271F]/70 font-num">
                  {toBanglaNumber(item.today)} টাকা/{getBanglaUnit(item.unit).replace("প্রতি ", "")}
                </span>

                {isUp && (
                  <span className="text-red-600 font-bold flex items-center gap-0.5 text-[11px]">
                    ▲ {formatBanglaPercentage(item.change?.pct)}
                  </span>
                )}
                {isDown && (
                  <span className="text-emerald-600 font-bold flex items-center gap-0.5 text-[11px]">
                    ▼ {formatBanglaPercentage(item.change?.pct)}
                  </span>
                )}
                {!isUp && !isDown && (
                  <span className="text-gray-400 font-medium flex items-center gap-0.5 text-[11px]">
                    — {formatBanglaPercentage(item.change?.pct || 0)}
                  </span>
                )}

                <span className="text-gray-300 ml-4">•</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
