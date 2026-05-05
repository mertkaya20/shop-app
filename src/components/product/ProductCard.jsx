import { ShoppingCart } from "lucide-react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/detail/${product.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-zinc-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-zinc-50 h-44 sm:h-52 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-[#1A1A1A] text-amber-400 text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize tracking-wide">
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xs sm:text-sm font-semibold text-zinc-800 line-clamp-2 leading-snug mb-1 flex-1">
          {product.title}
        </h3>

        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-amber-400 text-xs">★</span>
            <span className="text-zinc-500 text-xs">
              {product.rating.rate}
              <span className="text-zinc-300 ml-1">
                ({product.rating.count})
              </span>
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100">
          <span className="text-base font-bold text-zinc-900">
            ${product.price?.toFixed(2)}
          </span>
          <Button variant="primary" size="sm">
            <ShoppingCart size={13} />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>
      </div>
    </Link>
  );
}
