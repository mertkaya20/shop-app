import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../../store/slices/uiSlice";
import { CheckCircle, XCircle, X } from "lucide-react";

const icons = {
  success: <CheckCircle size={18} className="text-green-500" />,
  error: <XCircle size={18} className="text-red-500" />,
};

const styles = {
  success: "border-green-100 bg-green-50",
  error: "border-red-100 bg-red-50",
};

export default function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => dispatch(clearNotification()), 3000);
    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-sm transition-all duration-300 ${
        styles[notification.type] ?? "bg-white border-zinc-100"
      }`}
    >
      {icons[notification.type]}
      <p className="text-sm font-medium text-zinc-700">
        {notification.message}
      </p>
      <button
        onClick={() => dispatch(clearNotification())}
        className="ml-2 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
      >
        <X size={14} />
      </button>
    </div>
  );
}
