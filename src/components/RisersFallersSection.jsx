import ProductCard from "./ProductCard";

export default function RisersFallersSection({ products = [] }) {
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (a.change?.pct || 0) - (b.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="space-y-10 sm:space-y-12">
      
      {risers.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600 text-sm font-bold">▲</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1D271F] tracking-tight">
              আজ দাম বেড়েছে
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {risers.map((item) => (
              <ProductCard key={item.id || item.slug} product={item} />
            ))}
          </div>
        </section>
      )}

      {fallers.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 text-sm font-bold">▼</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1D271F] tracking-tight">
              আজ দাম কমেছে
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {fallers.map((item) => (
              <ProductCard key={item.id || item.slug} product={item} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
