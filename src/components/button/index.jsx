import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-yellow-400 text-black hover:bg-yellow-500",

    secondary:
      "bg-gray-700 text-white hover:bg-gray-800",

    outline:
      "border border-gray-300 bg-transparent hover:bg-gray-100",

    ghost:
      "hover:bg-gray-100",

    success:
      "bg-green-600 text-white hover:bg-green-700",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "w-10 h-10 p-0",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="animate-spin">⏳</span>
      ) : (
        leftIcon
      )}

      {children}

      {!loading && rightIcon}
    </button>
  );
};

export default Button;
