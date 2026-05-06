import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";
import { LogOut, ShoppingBag, User, Tag, ShoppingCart } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import Button from "../../components/ui/Button";

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { logout } = useLogout();
  const { items, totalQuantity } = useCart();
  const navigate = useNavigate();

  // Sepetteki en çok geçen kategoriyi bul
  const favoriteCategory = (() => {
    if (!items.length) return "No purchases yet";
    const counts = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  })();

  const stats = [
    {
      icon: <ShoppingCart size={18} className="text-amber-400" />,
      label: "Items in Cart",
      value: totalQuantity,
    },
    {
      icon: <Tag size={18} className="text-amber-400" />,
      label: "Favorite Category",
      value: favoriteCategory,
    },
    {
      icon: <ShoppingBag size={18} className="text-amber-400" />,
      label: "Orders Placed",
      value: "—",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0EFEA] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <p className="text-xs text-zinc-400 mb-8 uppercase tracking-widest font-medium">
          Account / Profile
        </p>

        {/* Header Card */}
        <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden mb-4">
          <div className="h-1.5 w-full bg-linear-to-r from-amber-400 via-amber-300 to-amber-500" />
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0">
              <User size={28} className="text-amber-400" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
                {user?.username || "User"}
              </h1>
              <p className="text-zinc-400 text-sm mt-0.5">
                Member · FakeStore Account
              </p>
            </div>

            {/* Logout */}
            <Button
              variant="secondary"
              size="sm"
              onClick={logout}
              className="shrink-0"
            >
              <LogOut size={14} />
              Logout
            </Button>
          </div>
        </div>

        {/* Credentials Card */}
        <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8 mb-4">
          <h2 className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-4">
            Account Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-zinc-100">
              <span className="text-sm text-zinc-500">Username</span>
              <span className="text-sm font-semibold text-zinc-800">
                {user?.username || "—"}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-100">
              <span className="text-sm text-zinc-500">Auth Token</span>
              <span className="text-xs font-mono text-zinc-400 bg-zinc-50 px-2 py-1 rounded-lg max-w-[180px] truncate">
                {token || "—"}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-zinc-500">Account Status</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8 mb-4">
          <h2 className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-4">
            Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#F0EFEA] rounded-xl p-4 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  {stat.icon}
                  <span className="text-xs text-zinc-400 font-medium">
                    {stat.label}
                  </span>
                </div>
                <span className="text-base font-bold text-zinc-800 capitalize">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
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
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={16} />
            View Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
