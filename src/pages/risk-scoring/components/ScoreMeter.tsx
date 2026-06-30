import { riskLevels } from '@/mocks/risk-scoring';

interface ScoreMeterProps {
  score: number;
  riskLevel: string;
}

export default function ScoreMeter({ score, riskLevel: currentLevel }: ScoreMeterProps) {
  const radius = 90;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getArcColor = (level: string) => {
    switch (level) {
    case 'Low': return 'oklch(var(--accent-500))';
    case 'Medium': return 'oklch(var(--secondary-500))';
    case 'High': return '#d97706';
    case 'Critical': return '#e11d48';
    default: return 'oklch(var(--accent-500))';
    }
  };

  const getArcBgColor = (level: string) => {
    switch (level) {
    case 'Low': return 'oklch(var(--accent-100))';
    case 'Medium': return 'oklch(var(--secondary-100))';
    case 'High': return '#fef3c7';
    case 'Critical': return '#ffe4e6';
    default: return 'oklch(var(--accent-100))';
    }
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
    case 'Low': return 'bg-accent-100 text-accent-700 border-accent-300';
    case 'Medium': return 'bg-secondary-100 text-secondary-700 border-secondary-300';
    case 'High': return 'bg-amber-100 text-amber-700 border-amber-300';
    case 'Critical': return 'bg-rose-100 text-rose-700 border-rose-300';
    default: return 'bg-accent-100 text-accent-700 border-accent-300';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-52 md:w-56 md:h-56">
        <svg width="100%" height="100%" viewBox="0 0 192 192" className="-rotate-90">
          <defs>
            <filter id="scoreGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            stroke={getArcBgColor(currentLevel)}
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
          />
          <circle
            stroke={getArcColor(currentLevel)}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            filter="url(#scoreGlow)"
            className="transition-all duration-1200 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl md:text-6xl font-bold text-foreground-900 tracking-tight">{score}</span>
          <span className="text-sm text-foreground-400 font-medium mt-0.5">/ 100</span>
        </div>
      </div>

      <div className={`mt-4 px-4 py-1.5 rounded-full border text-sm font-semibold whitespace-nowrap ${getRiskBadgeColor(currentLevel)}`}>
        {currentLevel} Risk
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3 w-full max-w-xs">
        {riskLevels.map((rl) => (
          <div key={rl.level} className="flex flex-col items-center text-center">
            <span className={`text-xs font-bold ${rl.textColor}`}>{rl.level}</span>
            <span className="text-xs text-foreground-400">{rl.range}</span>
          </div>
        ))}
      </div>
    </div>
  );
}