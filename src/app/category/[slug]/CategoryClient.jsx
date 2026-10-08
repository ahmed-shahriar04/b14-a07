"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { toBanglaNumber } from "@/lib/banglaUtils";

export default function CategoryClient({ category, products = [] }) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    let list = [...products];
    if (sortBy === "price-asc") {
      list.sort((a, b) => (a.today || 0) - (b.today || 0));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.today || 0) - (a.today || 0));
    }
    return list;
  }, [products, sortBy]);

  return (
    <div className="space-y-6">
      
      <div className="bg-white rounded-3xl border border-[#E1E8E1] p-6 sm:p-8 flex items-center gap-5 shadow-xs">
        <div className="w-14 h-14 rounded-full bg-[#F0F5F0] flex items-center justify-center text-3xl shrink-0">
          {category?.icon || "🛍️"}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1D271F] tracking-tight">
            {category?.nameBn || "ক্যাটাগরি"}
          </h1>
          <p className="text-xs sm:text-sm text-[#1D271F]/50 mt-0.5">
            {toBanglaNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E1E8E1] p-3 sm:p-4 flex items-center justify-end shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#1D271F]/60 font-medium">সাজান</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#FAFCFA] border border-[#E1E8E1] rounded-lg px-3.5 py-1.5 pr-7 text-xs font-semibold text-[#1D271F] cursor-pointer focus:outline-none focus:border-[#05893E]"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 pointer-events-none"></i>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs text-[#1D271F]/50 mb-4">
          মোট {toBanglaNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {sortedProducts.map((item) => (
              <ProductCard key={item.id || item.slug} product={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E1E8E1] p-8 space-y-3">
            <div className="text-4xl">📦</div>
            <h3 className="text-lg font-bold text-[#1D271F]">এই ক্যাটাগরিতে কোনো পণ্য নেই</h3>
          </div>
        )}
      </div>

    </div>
  );
}
