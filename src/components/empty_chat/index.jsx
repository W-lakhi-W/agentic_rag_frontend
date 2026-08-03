import { Sparkles } from "lucide-react";
import { WandSparkles } from "lucide-react";


const EmptyChat = ({
  title = "How can I help you?",
  description = "Ask a question or upload a PDF to start chatting with your AI assistant.",
}) => {
  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <div className="max-w-md text-center">

        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-surface">
          <WandSparkles
            size={40}
            className="text-secondary"
          />
        </div>

        {/* Title */}
        <h2 className="mt-6 text-3xl font-semibold text-text">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-3 text-text-muted">
          {description}
        </p>

      </div>
    </div>
  );
};

export default EmptyChat;