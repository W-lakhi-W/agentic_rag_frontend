const ChatHeader = ({
  title = "New Chat",
  subtitle,
  actions,
}) => {
  return (
    <header className="min-h-16 border-b border-border bg-white px-4 py-3 pl-16 flex flex-wrap items-center justify-between gap-3 md:px-6 md:pl-6">
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold sm:text-lg">
          {title}
        </h1>

        {subtitle && (
          <p className="truncate text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {actions}
      </div>
    </header>
  );
};

export default ChatHeader;
