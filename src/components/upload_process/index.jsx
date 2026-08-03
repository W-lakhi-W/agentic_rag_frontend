const UploadProgress = ({ progress }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 flex items-center justify-center">
      <svg className="h-20 w-20 -rotate-90">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#e2e8f0"
          strokeWidth="5"
          fill="none"
        />

        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#2563eb"
          strokeWidth="5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-200"
        />
      </svg>

      <span className="absolute text-sm font-semibold">
        {progress}%
      </span>
    </div>
  );
};

export default UploadProgress;