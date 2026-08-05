import { useState } from "react";
import Tooltip from "../tooltip";
import { SendHorizontal, Paperclip } from "lucide-react";


const ChatInput = ({
  placeholder = "Ask anything...",
  onSend,
  onUpload,
  disabled = false,
  loading = false,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || loading) return;

    onSend?.(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <div className="flex items-end gap-3">
        <Tooltip content="Upload File" size="sm">
        <button
          type="button"
          onClick={onUpload}
          className="rounded-lg cursor-pointer border border-border p-3 hover:bg-surface"
        >
          <Paperclip size={18} />
        </button>
        </Tooltip>

        <textarea
          rows={1}
          value={message}
          placeholder={placeholder}
          disabled={disabled || loading}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            flex-1
            resize-none
            rounded-xl
            border
            border-border
            bg-background
            px-4
            py-3
            text-text
            placeholder:text-text-muted
            focus:border-primary
            focus:outline-none
          "
        />
        <Tooltip content="Send Message" size="sm">
        <button
          onClick={handleSend}
          disabled={!message.trim() || loading}
          className="
            rounded-xl
            cursor-pointer
            bg-primary
            px-5
            py-3
            text-white
            hover:bg-primary-hover
            disabled:opacity-50
          "
        >
          {<SendHorizontal />}
        </button>
        </Tooltip>

      </div>
    </div>
  );
};

export default ChatInput;