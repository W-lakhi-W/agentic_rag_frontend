import { MessageSquare, Trash2 } from "lucide-react";
import Tooltip from "../tooltip";

const ChatHistoryItem = ({
  chat,
  active = false,
  onClick,
  onDelete,
}) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(chat);
  };

  return (
    <button
      onClick={() => onClick?.(chat)}
      className={`
        group
        flex
        w-full
        items-center
        justify-between
        rounded-lg
        px-3
        py-1
        text-left
        transition-colors
        mb-0

        ${
          active
            ? "bg-primary text-white"
            : "hover:bg-surface text-text"
        }
      `}
    >
      <div className="flex min-w-0 items-center gap-3">

        <MessageSquare
          size={18}
          className="shrink-0"
        />

        <div className="min-w-0">

          <p className="truncate font-medium">
            {chat.title}
          </p>

        </div>

      </div>

      <Tooltip content="Delete chat">
        <button
          onClick={handleDelete}
          className={`
            rounded-md
            p-1.5
            opacity-0
            transition-all

            group-hover:opacity-100

            ${
              active
                ? "hover:bg-white/20"
                : "hover:bg-background"
            }
          `}
        >
          <Trash2 size={16} />
        </button>
      </Tooltip>
    </button>
  );
};

export default ChatHistoryItem;