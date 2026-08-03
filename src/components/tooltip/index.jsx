import React, { useRef, useState } from "react";

const Tooltip = ({
  children,
  content,
  position = "top",
  theme = "dark",
  size = "md",
  delay = 200,
}) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  const config = {
    top: {
      position: "bottom-full left-1/2 -translate-x-1/2 mb-3",
      visible: "translate-y-0 opacity-100 scale-100",
      hidden: "translate-y-2 opacity-0 scale-95",
      tail: "left-1/2 top-full -translate-x-1/2 -translate-y-1/2",
    },

    bottom: {
      position: "top-full left-1/2 -translate-x-1/2 mt-3",
      visible: "translate-y-0 opacity-100 scale-100",
      hidden: "-translate-y-2 opacity-0 scale-95",
      tail: "left-1/2 bottom-full -translate-x-1/2 translate-y-1/2",
    },

    left: {
      position: "right-full top-1/2 -translate-y-1/2 mr-3",
      visible: "translate-x-0 opacity-100 scale-100",
      hidden: "translate-x-2 opacity-0 scale-95",
      tail: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
    },

    right: {
      position: "left-full top-1/2 -translate-y-1/2 ml-3",
      visible: "translate-x-0 opacity-100 scale-100",
      hidden: "-translate-x-2 opacity-0 scale-95",
      tail: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
    },
  };

  const themes = {
    dark: {
      tooltip: "bg-gray-900 text-white",
      tail: "bg-gray-900",
    },

    light: {
      tooltip: "bg-white text-gray-900 border border-gray-300",
      tail: "bg-white border-r border-b border-gray-300",
    },

    primary: {
      tooltip: "bg-primary text-white",
      tail: "bg-primary",
    },
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const show = () => {
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}

      <div
        className={`
          absolute
          z-50
          whitespace-nowrap
          rounded-lg
          shadow-xl
          pointer-events-none
          transition-all
          duration-200
          ease-out

          ${config[position].position}
          ${
            visible
              ? config[position].visible
              : config[position].hidden
          }

          ${themes[theme].tooltip}
          ${sizes[size]}
        `}
      >
        {content}

        {/* Tail */}
        <span
          className={`
            absolute
            h-3
            w-3
            rotate-45

            ${config[position].tail}
            ${themes[theme].tail}
          `}
        />
      </div>
    </div>
  );
};

export default Tooltip;