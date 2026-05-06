import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ErrorBoundary from "../../components/ui/ErrorBoundary";
import { loginSchema } from "./loginSchema";
import { useLogin } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, isError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-zinc-100 p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-zinc-900">Welcome back</h1>
            <p className="text-sm text-zinc-400">
              Sign in to continue shopping.
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
            {isError && (
              <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                <p className="text-xs text-red-500">
                  Invalid username or password.
                </p>
              </div>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full mt-2"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          {/* Demo Credentials */}
          <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Demo Credentials
            </p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Username</span>
                <span className="text-xs font-mono font-semibold text-zinc-700">
                  mor_2314
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Password</span>
                <span className="text-xs font-mono font-semibold text-zinc-700">
                  83r5^_
                </span>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-zinc-700 font-semibold hover:text-amber-600 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <ErrorBoundary>
      <LoginContent />
    </ErrorBoundary>
  );
}
