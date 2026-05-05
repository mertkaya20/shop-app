import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ShoppingCart,
  Heart,
  ArrowLeft,
  Star,
  Truck,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";
import { useProductById } from "../../hooks/useProducts";
import { addToCart } from "../../store/slices/cartSlice";
import Button from "../../components/ui/Button";
import ErrorBoundary from "../../components/ui/ErrorBoundary";
import Spinner from "../../components/ui/Spinner";

function ProductDetailContent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useProductById(id);

  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const renderStars = (rate) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < Math.round(rate)
            ? "fill-amber-400 text-amber-400"
            : "text-zinc-300"
        }
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <span className="text-red-400 text-2xl">!</span>
        </div>
        <p className="text-zinc-700 font-semibold">Product not found</p>
        <p className="text-zinc-400 text-sm mt-1">
          This product does not exist or an error occurred.
        </p>
        <Button className="mt-6" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <button
            onClick={() => navigate("/")}
            className="hover:text-zinc-700 transition-colors flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Home
          </button>
          <span>/</span>
          <span className="hover:text-zinc-700 transition-colors cursor-pointer capitalize">
            {product?.category}
          </span>
          <span>/</span>
          <span className="text-zinc-600 font-medium line-clamp-1">
            {product.title}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Image Section */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden relative group">
              {/* Category Badge */}
              <span className="absolute top-4 left-4 z-10 bg-[#1A1A1A] text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full capitalize">
                {product.category}
              </span>

              {/* Wish Button */}
              <button
                onClick={() => setIsWished((prev) => !prev)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white border border-zinc-100 flex items-center justify-center shadow-sm hover:border-zinc-300 transition-colors"
              >
                <Heart
                  size={16}
                  className={
                    isWished ? "fill-red-500 text-red-500" : "text-zinc-400"
                  }
                />
              </button>

              <div className="flex items-center justify-center p-12 aspect-square">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-72 object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Rating bar visual */}
            <div className="mt-4 bg-white rounded-xl border border-zinc-100 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {renderStars(product.rating?.rate ?? 0)}
                </div>
                <span className="text-sm font-semibold text-zinc-700">
                  {product.rating?.rate}
                </span>
              </div>
              <span className="text-xs text-zinc-400">
                {product.rating?.count} reviews
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col gap-6">
            {/* Title & Category */}
            <div>
              <span className="text-xs font-semibold tracking-widest text-zinc-400 capitalize">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-1 leading-snug">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-5 border-b border-zinc-100">
              <span className="text-3xl font-bold text-zinc-900">
                ${product.price}
              </span>
              <span className="text-sm text-zinc-400 line-through">
                ${(product.price * 1.3).toFixed(2)}
              </span>
              <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                30% Sale
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-500 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                Qty
              </p>
              <div className="flex items-center w-fit">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-l-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  −
                </button>
                <div className="w-14 h-10 border-t border-b border-zinc-200 bg-white flex items-center justify-center text-sm font-semibold text-zinc-800">
                  {quantity}
                </div>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-r-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-colors font-medium"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <Button
                size="lg"
                variant="primary"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={17} />
                {added ? "Added ✓" : "Add to Cart"}
              </Button>
              <button
                onClick={() => setIsWished((prev) => !prev)}
                className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-colors ${
                  isWished
                    ? "border-red-200 bg-red-50"
                    : "border-zinc-200 bg-white hover:border-zinc-300"
                }`}
              >
                <Heart
                  size={18}
                  className={
                    isWished ? "fill-red-500 text-red-500" : "text-zinc-400"
                  }
                />
              </button>
            </div>

            {/* Meta Info */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-zinc-500">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
                  <ShieldCheck size={15} className="text-zinc-700" />
                </div>
                <span>
                  <span className="font-medium text-zinc-700">
                    Secure Payment
                  </span>{" "}
                  — SSL encrypted transaction
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-500">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
                  <RefreshCcw size={15} className="text-zinc-700" />
                </div>
                <span>
                  <span className="font-medium text-zinc-700">
                    30-Day Returns
                  </span>{" "}
                  — No questions asked
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  return (
    <ErrorBoundary>
      <ProductDetailContent />
    </ErrorBoundary>
  );
}
