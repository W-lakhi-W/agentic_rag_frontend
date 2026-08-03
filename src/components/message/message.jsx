import UserMessage from "../user_message";
import AIMessage from "../ai_message";

const Message = ({ message }) => {
  if (message.role === "user") {
    return (
      <UserMessage message={message} />
    );
  }

  return (
    <AIMessage message={message} />
  );
};

export default Message;