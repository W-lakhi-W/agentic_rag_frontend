const ThinkingIndicator = ({
  status = "Thinking...",
}) => {
  return (
    <div className="flex justify-start">
      <div
        className="
          rounded-xl
          border
          border-border
          bg-surface
          px-4
          py-3
        "
      >
        <div className="flex items-center gap-3">

          <div className="flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary"></span>
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]"></span>
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]"></span>
          </div>

          <span className="text-sm text-text-muted">
            {status}
          </span>

        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;