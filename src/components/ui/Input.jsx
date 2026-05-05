const Input = ({
  value,
  onChange,
  placeholder = "",
  icon: Icon = null,
  rightElement = null,
  className = "",
  theme = "light", // "light" | "dark"
}) => {
  const base =
    "w-full rounded-xl border text-sm transition focus:outline-none focus:ring-1";

  const themes = {
    light:
      "bg-white border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:border-amber-400 focus:ring-amber-400",
    dark: "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-amber-400 focus:ring-amber-400",
  };

  const padding = Icon ? "pl-11 pr-10 py-3" : "px-4 py-3";

  return (
    <div className={`relative ${className}`}>
      {Icon && (
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
        />
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${base} ${themes[theme]} ${padding}`}
      />
      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  );
};

export default Input;
