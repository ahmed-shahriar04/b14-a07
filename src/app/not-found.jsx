import Link from "next/link";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { getAllProducts, getAllCategories } from "@/lib/api";

export default async function NotFound() {
  const [allCategories, allProducts] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <div className="min-h-screen bg-[#F0F5F0] flex flex-col justify-between">
      <div>
        <Navbar categories={allCategories} />
        {allProducts.length > 0 && <PriceTicker products={allProducts} />}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-16 space-y-4">
            <div className="text-6xl sm:text-7xl">🛒</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1D271F]">
              <span className="font-num">৪০৪</span> - পৃষ্ঠাটি পাওয়া যায়নি
            </h1>
            <p className="text-sm text-[#1D271F]/70 max-w-md">
              আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা মুছে ফেলা হয়েছে।
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#05893E] hover:bg-[#047F39] text-white text-sm font-semibold shadow-[0_4px_12px_rgba(5,137,62,0.35)] transition-colors"
            >
              <i className="fa-solid fa-arrow-left text-xs"></i>
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
