import React from "react";

const Loader = ({
  size = "md",
  color = "yellow",
  text = "",
  fullScreen = false,
  overlay = false,
  className = "",
}) => {
  const sizes = {
    xs: "w-4 h-4 border-2",
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-[3px]",
    lg: "w-14 h-14 border-4",
    xl: "w-20 h-20 border-[5px]",
  };

  const colors = {
    yellow: "border-yellow-400",
    blue: "border-blue-500",
    red: "border-red-500",
    green: "border-green-500",
    white: "border-white",
  };

  const content = (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div
        className={`
          rounded-full
          border-t-transparent
          animate-spin
          ${sizes[size]}
          ${colors[color]}
        `}
      />

      {text && (
        <p className="text-sm text-gray-500">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        {content}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white/70">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;