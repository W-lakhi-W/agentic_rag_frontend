const UserMessage = ({ message }) => {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl bg-yellow-400 px-5 py-3">
        <p className="whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default UserMessage;