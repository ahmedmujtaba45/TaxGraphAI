export default function ConfidenceIndicator({ confidence }: { confidence: number }) {
  const radius = 58;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  const getColor = (value: number) => {
    if (value >= 90) return 'oklch(var(--accent-500))';
    if (value >= 70) return 'oklch(var(--secondary-500))';
    return 'oklch(var(--primary-500))';
  };

  const getBgColor = (value: number) => {
    if (value >= 90) return 'oklch(var(--accent-100))';
    if (value >= 70) return 'oklch(var(--secondary-100))';
    return 'oklch(var(--primary-100))';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36 md:w-40 md:h-40">
        <svg width="100%" height="100%" viewBox="0 0 130 130" className="-rotate-90">
          <circle
            stroke={getBgColor(confidence)}
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
          />
          <circle
            stroke={getColor(confidence)}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl md:text-4xl font-bold text-accent-600">{confidence}%</span>
          <span className="text-xs text-foreground-500 font-medium">Confidence</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-accent-500 animate-pulse"></div>
        <span className="text-sm font-semibold text-accent-700">High Match Confidence</span>
      </div>
    </div>
  );
}