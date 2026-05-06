import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { clearCart } from "../../store/slices/cartSlice";
import ErrorBoundary from "../../components/ui/ErrorBoundary";
import Button from "../../components/ui/Button";
import CartItem from "../../components/cart/CartItem";

function CartContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart,
  );

  if (items.length === 0) {
    return (
      <div className="bg-[#F5F5F0] min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-20 h-20 rounded-full bg-white border border-zinc-100 flex items-center justify-center">
          <ShoppingCart size={32} className="text-zinc-300" />
        </div>
        <p className="text-zinc-700 font-semibold text-lg">
          Your cart is empty
        </p>
        <p className="text-zinc-400 text-sm">
          Discover products to start shopping.
        </p>
        <Button onClick={() => navigate("/")}>
          <ArrowLeft size={15} />
          Continue Shopping
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
            className="hover:text-zinc-700 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={14} />
            Home
          </button>
          <span>/</span>
          <span className="text-zinc-600 font-medium">Cart</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-zinc-900">
            Cart{" "}
            <span className="text-base font-normal text-zinc-400">
              ({totalQuantity} items)
            </span>
          </h1>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-xs text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Trash2 size={13} />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-zinc-100 p-6 flex flex-col gap-4">
            <h2 className="text-base font-bold text-zinc-900">Order Summary</h2>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="font-medium text-zinc-700">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-4 flex justify-between items-center">
              <span className="font-bold text-zinc-900">Total</span>
              <span className="text-xl font-bold text-zinc-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>

            <button
              onClick={() => navigate("/")}
              className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors text-center flex items-center justify-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={12} className="cursor-pointer" />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  return (
    <ErrorBoundary>
      <CartContent />
    </ErrorBoundary>
  );
}
