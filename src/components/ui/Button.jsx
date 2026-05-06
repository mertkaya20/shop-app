const variants = {
  primary:
    "bg-[#1A1A1A] text-amber-400 hover:bg-zinc-700 border border-transparent",
  secondary:
    "bg-white text-zinc-800 border border-zinc-200 hover:border-zinc-400",
  ghost:
    "bg-transparent text-zinc-500 border border-transparent hover:text-zinc-800",
};

const sizes = {
  sm: "text-xs px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2 gap-2",
  lg: "text-base px-6 py-3 gap-2",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-semibold rounded-lg
        transition-colors duration-200 tracking-wide
        disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
