import { useMemo } from "react";
import { Search, X } from "lucide-react";
import ProductCard from "./ProductCard";
import Spinner from "../ui/Spinner";
import { useAllProducts } from "../../hooks/useProducts";

export default function ProductGrid({ search, activeCategory }) {
  const { data: products, isLoading, isError } = useAllProducts();

  const filtered = useMemo(() => {
    if (!products) return [];

    const searchLower = search.toLowerCase();

    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;

      const matchesSearch =
        p.title.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [products, search, activeCategory]);

  /* ---------- Loading ---------- */
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Spinner size="lg" />
        <p className="text-zinc-400 text-sm">Loading products...</p>
      </div>
    );
  }

  /* ---------- Error ---------- */
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <X size={24} className="text-red-400" />
        </div>
        <p className="text-zinc-700 font-semibold">Failed to load products</p>
        <p className="text-zinc-400 text-sm mt-1">Please try again later.</p>
      </div>
    );
  }

  /* ---------- Empty ---------- */
  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
          <Search size={24} className="text-amber-400" />
        </div>
        <p className="text-zinc-700 font-semibold">No products found</p>
        <p className="text-zinc-400 text-sm mt-1">
          Try a different search or category.
        </p>
      </div>
    );
  }

  /* ---------- Grid ---------- */
  return (
    <div>
      <p className="text-zinc-400 text-xs mb-6 font-medium tracking-wide uppercase">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        {activeCategory !== "All" && (
          <span className="text-amber-500"> in {activeCategory}</span>
        )}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
