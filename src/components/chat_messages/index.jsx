import { useEffect, useRef } from "react";
import Message from "../message";

const ChatMessages = ({
  messages = [],
  loading = false,
  emptyComponent = null,
}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  if (!messages.length && !loading) {
    return (
      <div className="flex-1 flex items-center justify-center overflow-y-auto bg-background px-4 py-6 md:px-6">
        {emptyComponent}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background px-3 py-5 sm:px-4 md:px-6 md:py-8">
      <div className="mx-auto max-w-6xl space-y-5 md:space-y-8">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-full rounded-xl bg-surface border border-border px-4 py-3 text-text-muted">
              Thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
