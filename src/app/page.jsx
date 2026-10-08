import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import HeroBanner from "@/components/HeroBanner";
import RisersFallersSection from "@/components/RisersFallersSection";
import AllProductsSection from "@/components/AllProductsSection";
import Footer from "@/components/Footer";
import { getAllProducts, getAllCategories } from "@/lib/api";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  const hasData = products && products.length > 0;

  return (
    <div className="min-h-screen bg-[#F0F5F0] flex flex-col justify-between">
      <div>
        <Navbar categories={categories} />
        {hasData && <PriceTicker products={products} />}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12 sm:space-y-14">
          <HeroBanner />
          {hasData ? (
            <>
              <RisersFallersSection products={products} />
              <AllProductsSection products={products} />
            </>
          ) : (
            <div className="bg-white rounded-3xl border border-[#E1E8E1] p-12 text-center space-y-3 shadow-xs">
              <div className="text-4xl">⚠️</div>
              <h2 className="text-lg font-bold text-[#1D271F]">
                সার্ভার ব্যস্ত, কিছুক্ষণ পরে আবার চেষ্টা করুন
              </h2>
              <p className="text-xs text-[#1D271F]/60">
                পণ্যের তথ্য লোড করা সম্ভব হয়নি। অনুগ্রহ করে পেজটি রিফ্রেশ করুন।
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
