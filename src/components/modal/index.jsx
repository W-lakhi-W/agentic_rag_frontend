import React, { useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-7xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-4"
      onClick={closeOnOverlay ? onClose : undefined}
    >
      <div
        className={`my-auto flex max-h-[calc(100dvh-1.5rem)] w-full flex-col ${sizes[size]} rounded-xl bg-white shadow-xl sm:max-h-[calc(100dvh-2rem)]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between gap-4 border-b px-4 py-3 sm:px-6 sm:py-4">
            <h2 className="min-w-0 truncate text-base font-semibold sm:text-lg">{title}</h2>

            {showCloseButton && (
              <button
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl text-gray-500 hover:bg-surface hover:text-black"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto p-4 sm:p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t px-4 py-3 sm:px-6 sm:py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
