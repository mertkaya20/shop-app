import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "../../components/product/ProductGrid";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ErrorBoundary from "../../components/ui/ErrorBoundary";
import { useAllProducts } from "../../hooks/useProducts";

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: products } = useAllProducts();

  const categories = useMemo(() => {
    if (!products) return ["All"];
    const cats = [...new Set(products.map((p) => p.category))];
    return ["All", ...cats];
  }, [products]);

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      {/* Hero / Search Header */}
      <section className="bg-[#1A1A1A] pt-16 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
            Cart<span className="text-amber-400">ify</span> Store
          </h1>
          <p className="text-zinc-400 text-sm md:text-base mb-8 font-light">
            Curated products, seamless shopping.
          </p>

          {/* Search Input */}
          <div className="max-w-xl mx-auto">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              icon={Search}
              theme="dark"
              rightElement={
                search ? (
                  <button
                    onClick={() => setSearch("")}
                    className="text-zinc-400 hover:text-white transition"
                  >
                    <X size={16} />
                  </button>
                ) : null
              }
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-10 bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <SlidersHorizontal
            size={15}
            className="text-zinc-400 shrink-0 mr-1"
          />
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "primary" : "secondary"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 capitalize rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <ErrorBoundary>
          <ProductGrid search={search} activeCategory={activeCategory} />
        </ErrorBoundary>
      </section>
    </main>
  );
}
