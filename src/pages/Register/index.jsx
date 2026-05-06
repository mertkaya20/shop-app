import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ErrorBoundary from "../../components/ui/ErrorBoundary";
import { registerSchema } from "./registerSchema";
import { useDispatch } from "react-redux";
import { setNotification } from "../../store/slices/uiSlice";

function RegisterContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    dispatch(
      setNotification({
        message: "Account created successfully!",
        type: "success",
      }),
    );
    navigate("/login");
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-zinc-100 p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-zinc-900">Create account</h1>
            <p className="text-sm text-zinc-400">
              Join us and start shopping today.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Username
              </label>
              <Input
                {...register("username")}
                placeholder="Enter your username"
                icon={User}
              />
              {errors.username && (
                <p className="text-xs text-red-500">
                  {errors.username.message}
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
                placeholder="Enter your email"
                icon={Mail}
                type="email"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Password
              </label>
              <Input
                {...register("password")}
                placeholder="Enter your password"
                icon={Lock}
                type={showPassword ? "text" : "password"}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-zinc-400 hover:text-zinc-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Confirm Password
              </label>
              <Input
                {...register("confirmPassword")}
                placeholder="Confirm your password"
                icon={Lock}
                type={showConfirm ? "text" : "password"}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="text-zinc-400 hover:text-zinc-700 transition-colors"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-zinc-700 font-semibold hover:text-amber-600 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <ErrorBoundary>
      <RegisterContent />
    </ErrorBoundary>
  );
}
