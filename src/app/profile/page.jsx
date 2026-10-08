import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ProfileClient from "./ProfileClient";
import { getAllProducts, getAllCategories } from "@/lib/api";

export default async function ProfilePage() {
  const [allCategories, allProducts] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <div className="min-h-screen bg-[#F0F5F0] flex flex-col justify-between">
      <Navbar categories={allCategories} />
      <PriceTicker products={allProducts} />
      <main className="flex-1 flex items-center justify-center px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <ProfileClient />
      </main>
      <Footer />
    </div>
  );
}
