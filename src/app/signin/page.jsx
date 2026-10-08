import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import SignInClient from "./SignInClient";
import { getAllProducts, getAllCategories } from "@/lib/api";

export default async function SignInPage() {
  const [allCategories, allProducts] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <div className="min-h-screen bg-[#F0F5F0] flex flex-col justify-between">
      <Navbar categories={allCategories} />
      <PriceTicker products={allProducts} />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <Suspense fallback={<div className="p-8 text-center text-[#1D271F]/60">লোড হচ্ছে...</div>}>
          <SignInClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
