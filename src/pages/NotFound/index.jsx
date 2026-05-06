import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F5F5F0] min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-zinc-200">404</h1>
      <p className="text-lg font-semibold text-zinc-700 mt-4">Page not found</p>
      <p className="text-sm text-zinc-400 mt-1">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button className="mt-8" onClick={() => navigate("/")}>
        <ArrowLeft size={15} />
        Back to Home
      </Button>
    </div>
  );
}
