import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ProductDetailsClient from "./ProductDetailsClient";
import { getAllProducts, getAllCategories, getProductBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const [allCategories, allProducts, product] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
    getProductBySlug(slug),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F0F5F0] flex flex-col justify-between">
      <div>
        <Navbar categories={allCategories} />
        <PriceTicker products={allProducts} />
        <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-10">
          <ProductDetailsClient product={product} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
