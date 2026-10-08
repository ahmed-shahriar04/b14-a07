"use client";

import ProductCard from "./ProductCard";
import { toBanglaNumber } from "@/lib/banglaUtils";

export default function AllProductsSection({ products = [] }) {
  return (
    <section id="সব-পণ্য" className="space-y-4 scroll-mt-28">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#1D271F] tracking-tight">
          সব পণ্য
        </h2>
        <p className="text-xs text-[#1D271F]/50 mt-0.5">
          মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
        {products.map((item) => (
          <ProductCard key={item.id || item.slug} product={item} />
        ))}
      </div>
    </section>
  );
}
