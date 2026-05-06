import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, User, Mail, MapPin, CreditCard, Lock } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ErrorBoundary from "../../components/ui/ErrorBoundary";
import { checkoutSchema } from "./checkoutSchema";
import { clearCart } from "../../store/slices/cartSlice";
import { setNotification } from "../../store/slices/uiSlice";

function CheckoutContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    {
      items.length === 0 && navigate("/");
    }
  }, []);

  const onSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    dispatch(clearCart());
    dispatch(
      setNotification({
        message: "Order placed successfully!",
        type: "success",
      }),
    );
    navigate("/order-success", { state: { fromCheckout: true } });
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <button
            onClick={() => navigate("/cart")}
            className="hover:text-zinc-700 transition-colors flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Cart
          </button>
          <span>/</span>
          <span className="text-zinc-600 font-medium">Checkout</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <h1 className="text-2xl font-bold text-zinc-900 mb-6">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left — Forms */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Shipping */}
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 flex flex-col gap-4">
                <h2 className="text-base font-bold text-zinc-900">
                  Shipping Information
                </h2>

                <div className="flex flex-col gap-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                      Full Name
                    </label>
                    <Input
                      {...register("fullName")}
                      placeholder="John Doe"
                      icon={User}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                      Email
                    </label>
                    <Input
                      {...register("email")}
                      placeholder="john@example.com"
                      icon={Mail}
                      type="email"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                      Address
                    </label>
                    <Input
                      {...register("address")}
                      placeholder="123 Main St"
                      icon={MapPin}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  {/* City & ZIP */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                        City
                      </label>
                      <Input {...register("city")} placeholder="New York" />
                      {errors.city && (
                        <p className="text-xs text-red-500">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                        ZIP Code
                      </label>
                      <Input {...register("zip")} placeholder="10001" />
                      {errors.zip && (
                        <p className="text-xs text-red-500">
                          {errors.zip.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-zinc-900">
                    Payment Information
                  </h2>
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <Lock size={12} />
                    SSL Secured
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Card Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                      Card Number
                    </label>
                    <Input
                      {...register("cardNumber")}
                      placeholder="1234567812345678"
                      icon={CreditCard}
                      maxLength={16}
                    />
                    {errors.cardNumber && (
                      <p className="text-xs text-red-500">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                        Expiry Date
                      </label>
                      <Input
                        {...register("expiryDate")}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="text-xs text-red-500">
                          {errors.expiryDate.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                        CVV
                      </label>
                      <Input
                        {...register("cvv")}
                        placeholder="123"
                        maxLength={3}
                      />
                      {errors.cvv && (
                        <p className="text-xs text-red-500">
                          {errors.cvv.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Order Summary */}
            <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-zinc-100 p-6 flex flex-col gap-4">
              <h2 className="text-base font-bold text-zinc-900">
                Order Summary
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0 bg-zinc-50 rounded-xl flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-zinc-700 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-zinc-400">x{item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-zinc-800 shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-100 pt-4 flex flex-col gap-2 text-sm">
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
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Placing order..." : "Place Order"}
              </Button>

              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Lock size={11} />
                  <span>SSL encrypted transaction</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <ErrorBoundary>
      <CheckoutContent />
    </ErrorBoundary>
  );
}
