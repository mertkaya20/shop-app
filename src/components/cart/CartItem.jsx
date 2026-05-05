import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/slices/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-4 flex gap-4 items-center">
      {/* Image */}
      <div
        onClick={() => navigate(`/product/${item.id}`)}
        className="w-20 h-20 shrink-0 bg-[#F5F5F0] rounded-xl flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-14 h-14 object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <span className="text-xs text-zinc-400 capitalize">
          {item.category}
        </span>
        <p
          onClick={() => navigate(`/product/${item.id}`)}
          className="text-sm font-semibold text-zinc-800 line-clamp-1 cursor-pointer hover:text-amber-500 transition-colors"
        >
          {item.title}
        </p>
        <p className="text-base font-bold text-zinc-900 mt-0.5">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Quantity & Delete */}
      <div className="flex flex-col items-end gap-3 shrink-0">
        <button
          onClick={() => dispatch(removeFromCart({ id: item.id }))}
          className="text-zinc-300 hover:text-red-500 transition-colors"
        >
          <Trash2 size={15} />
        </button>
        <div className="flex items-center">
          <button
            onClick={() => {
              if (item.quantity === 1) {
                dispatch(removeFromCart({ id: item.id }));
              } else {
                dispatch(decreaseQuantity({ id: item.id }));
              }
            }}
            className="w-8 h-8 rounded-l-lg border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <Minus size={13} />
          </button>
          <div className="w-10 h-8 border-t border-b border-zinc-200 bg-white flex items-center justify-center text-sm font-semibold text-zinc-800">
            {item.quantity}
          </div>
          <button
            onClick={() => dispatch(increaseQuantity({ id: item.id }))}
            className="w-8 h-8 rounded-r-lg border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <Plus size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
