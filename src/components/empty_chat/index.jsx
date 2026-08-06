import { Sparkles } from "lucide-react";
import { WandSparkles } from "lucide-react";


const EmptyChat = ({
  title = "How can I help you?",
  description = "Ask a question or upload a PDF to start chatting with your AI assistant.",
}) => {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
      <div className="max-w-md text-center">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface sm:h-20 sm:w-20">
          <WandSparkles
            size={36}
            className="text-secondary"
          />
        </div>

        {/* Title */}
        <h2 className="mt-5 text-2xl font-semibold text-text sm:mt-6 sm:text-3xl">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm text-text-muted sm:text-base">
          {description}
        </p>

      </div>
    </div>
  );
};

export default EmptyChat;
