import { useEffect, useRef } from "react";
import Message from "../message/Message";

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
      <div className="flex-1 flex items-center justify-center bg-background">
        {emptyComponent}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-xl bg-surface border border-border px-4 py-3 text-text-muted">
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