import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import CategoryClient from "./CategoryClient";
import { getAllProducts, getAllCategories, getProductsByCategory } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const [allCategories, allProducts, categoryProducts] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
    getProductsByCategory(slug),
  ]);

  const currentCategory = allCategories.find((c) => c.slug === slug);
  if (!currentCategory && categoryProducts.length === 0) {
    notFound();
  }

  const categoryInfo = currentCategory || {
    slug,
    nameBn: categoryProducts[0]?.categoryNameBn || slug,
    icon: categoryProducts[0]?.categoryIcon || "🛍️",
  };

  return (
    <div className="min-h-screen bg-[#F0F5F0] flex flex-col justify-between">
      <div>
        <Navbar categories={allCategories} />
        {allProducts.length > 0 && <PriceTicker products={allProducts} />}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <CategoryClient
            category={categoryInfo}
            products={categoryProducts}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}
