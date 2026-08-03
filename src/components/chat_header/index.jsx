const ChatHeader = ({
  title = "New Chat",
  subtitle,
  actions,
}) => {
  return (
    <header className="h-16 border-b border-border bg-white px-6 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {actions}
      </div>
    </header>
  );
};

export default ChatHeader;