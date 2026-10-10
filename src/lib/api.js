const API_ENDPOINTS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function requestApi(endpoint) {
  for (const baseUrl of API_ENDPOINTS) {
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      continue;
    }
  }
  return null;
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
  if (!slug) return [];
  const data = await requestApi(`/products?category=${encodeURIComponent(slug)}`);
  if (Array.isArray(data) && data.length > 0) return data;
  
  const all = await getAllProducts();
  return all.filter((item) => item?.category?.toLowerCase() === slug.toLowerCase());
}

export async function getProductBySlug(slug) {
  if (!slug) return null;
  const all = await getAllProducts();
  return all.find((item) => item?.slug === slug || String(item?.id) === String(slug)) || null;
}
