const UserMessage = ({ message }) => {
  return (
    <div className="flex justify-end">
      <div className="max-w-[92%] overflow-hidden rounded-2xl bg-yellow-400 px-4 py-3 sm:max-w-[80%] sm:px-5">
        <p className="whitespace-pre-wrap break-words text-sm sm:text-base">
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default UserMessage;
