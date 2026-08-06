const AIMessage = ({ message }) => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] overflow-hidden rounded-2xl bg-gray-100 px-4 py-3 sm:max-w-[80%] sm:px-5">
        <p className="whitespace-pre-wrap break-words text-sm sm:text-base">
          {message.content}
        </p>

        {message.sources?.length > 0 && (
          <div className="mt-4 border-t pt-3">
            <p className="text-sm font-medium">
              Sources
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {message.sources.map((source) => (
                <span
                  key={source}
                  className="max-w-full truncate rounded bg-white px-3 py-1 text-sm"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMessage;
