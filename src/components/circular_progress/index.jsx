const CircularProgress = ({ progress }) => {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (progress / 100) * circumference;

  return (
    <svg
      width="26"
      height="26"
      className="-rotate-90"
    >
      <circle
        cx="13"
        cy="13"
        r={radius}
        stroke="#e2e8f0"
        strokeWidth="3"
        fill="none"
      />

      <circle
        cx="13"
        cy="13"
        r={radius}
        stroke="#2563eb"
        strokeWidth="3"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CircularProgress;