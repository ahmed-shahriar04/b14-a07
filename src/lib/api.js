const PRIMARY_API = "https://api.api-store.workers.dev/api/bazardor";
const FALLBACK_API = "https://api.abcz.workers.dev/api/bazardor";

async function requestApi(endpoint) {
  try {
    const res = await fetch(`${PRIMARY_API}${endpoint}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Primary failed");
    return await res.json();
  } catch {
    try {
      const res2 = await fetch(`${FALLBACK_API}${endpoint}`, { next: { revalidate: 60 } });
      if (!res2.ok) throw new Error("Fallback failed");
      return await res2.json();
    } catch {
      return null;
    }
  }
}

export async function getAllProducts() {
  const data = await requestApi("/products");
  return Array.isArray(data) ? data : [];
}

export async function getAllCategories() {
  const data = await requestApi("/categories");
  return Array.isArray(data) ? data : [];
}

export async function getProductsByCategory(slug) {
  const data = await requestApi(`/products?category=${encodeURIComponent(slug)}`);
  if (Array.isArray(data) && data.length > 0) return data;
  
  const all = await getAllProducts();
  return all.filter((item) => item.category?.toLowerCase() === slug?.toLowerCase());
}

export async function getProductBySlug(slug) {
  if (!slug) return null;
  const all = await getAllProducts();
  return all.find((item) => item.slug === slug || String(item.id) === String(slug)) || null;
}
