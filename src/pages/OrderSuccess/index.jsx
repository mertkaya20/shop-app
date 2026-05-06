import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/slices/cartSlice";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!location.state?.fromCheckout) {
      navigate("/");
    }
    dispatch(clearCart());
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mock order data - gerçekte Redux/route state'ten gelir
  const [orderNumber] = useState(
    () => "ORD-" + Math.floor(Math.random() * 900000 + 100000),
  );

  const [estimatedDelivery] = useState(() =>
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
  );

  return (
    <div className="min-h-screen bg-[#F0EFEA] flex items-center justify-center px-4 py-16">
      {/* Animated container */}
      <div
        className={`w-full max-w-lg transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-linear-to-r from-amber-400 via-amber-300 to-amber-500" />

          <div className="px-8 py-10 text-center">
            {/* Checkmark icon */}
            <div className="flex items-center justify-center mb-6">
              <div
                className={`w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-all duration-500 delay-300 ${
                  visible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
              >
                <svg
                  className="w-9 h-9 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-zinc-900 mb-2 tracking-tight">
              Order Confirmed!
            </h1>
            <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>

            {/* Order details */}
            <div className="bg-[#F0EFEA] rounded-xl p-5 mb-8 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                  Order Number
                </span>
                <span className="text-sm font-bold text-zinc-800 font-mono">
                  {orderNumber}
                </span>
              </div>
              <div className="h-px bg-zinc-200" />
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                  Estimated Delivery
                </span>
                <span className="text-sm font-semibold text-zinc-800">
                  {estimatedDelivery}
                </span>
              </div>
              <div className="h-px bg-zinc-200" />
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                  Shipping
                </span>
                <span className="text-sm font-semibold text-emerald-600">
                  Free
                </span>
              </div>
            </div>

            {/* Progress steps */}
            <div className="flex items-center justify-between mb-8 px-2">
              {["Confirmed", "Processing", "Shipped", "Delivered"].map(
                (step, i) => (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                          i === 0
                            ? "bg-[#1A1A1A] text-amber-400"
                            : "bg-zinc-100 text-zinc-400"
                        }`}
                        style={{ transitionDelay: `${300 + i * 100}ms` }}
                      >
                        {i === 0 ? (
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          i + 1
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-medium tracking-wide ${
                          i === 0 ? "text-zinc-800" : "text-zinc-400"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                    {i < 3 && (
                      <div
                        className={`h-px w-8 sm:w-12 mx-1 mb-4 ${
                          i === 0 ? "bg-amber-400" : "bg-zinc-200"
                        }`}
                      />
                    )}
                  </div>
                ),
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={() => navigate("/")}
              >
                Track Order
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-zinc-400 mt-5">
          A confirmation email has been sent to your registered address.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
