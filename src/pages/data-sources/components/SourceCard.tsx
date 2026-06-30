import type { DataSource } from '@/mocks/data-sources';

interface SourceCardProps {
  source: DataSource;
}

function getQualityColor(score: number): { ring: string; bg: string; text: string } {
  if (score >= 95) return { ring: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-700' };
  if (score >= 90) return { ring: '#22c55e', bg: 'bg-emerald-50', text: 'text-emerald-700' };
  if (score >= 80) return { ring: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-700' };
  return { ring: '#ef4444', bg: 'bg-rose-50', text: 'text-rose-700' };
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'Connected': return 'bg-emerald-500';
    case 'Degraded': return 'bg-amber-500';
    case 'Disconnected': return 'bg-rose-500';
    default: return 'bg-foreground-400';
  }
}

export default function SourceCard({ source }: SourceCardProps) {
  const quality = getQualityColor(source.qualityScore);
  const circumference = 2 * Math.PI * 28;
  const filled = (source.qualityScore / 100) * circumference;

  const colorMap: Record<string, { iconBg: string; iconText: string }> = {
    primary: { iconBg: 'bg-primary-100', iconText: 'text-primary-600' },
    accent: { iconBg: 'bg-accent-100', iconText: 'text-accent-600' },
    secondary: { iconBg: 'bg-secondary-100', iconText: 'text-secondary-600' },
  };
  const colors = colorMap[source.colorClass] || colorMap.primary;

  return (
    <div className="bg-white rounded-xl border border-background-200/70 p-5 hover:border-background-300/80 transition-all duration-300 group cursor-pointer flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
          <i className={`${source.icon} ${colors.iconText} text-lg`}></i>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground-400 font-medium bg-background-50 px-2.5 py-1 rounded-full border border-background-200/50">
            {source.category}
          </span>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(source.status)}`}></div>
            <span className="text-xs font-semibold text-emerald-600">{source.status}</span>
          </div>
        </div>
      </div>

      <h3 className="text-base font-heading font-bold text-foreground-900 mb-1.5 group-hover:text-primary-600 transition-colors">
        {source.name}
      </h3>

      <p className="text-xs text-foreground-500 leading-relaxed mb-4 line-clamp-2">
        {source.description}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-background-50 rounded-lg p-3 border border-background-200/50">
          <p className="text-xs text-foreground-400 mb-0.5">Records</p>
          <p className="text-sm font-bold text-foreground-900 font-mono tracking-tight">
            {source.recordsFormatted}
          </p>
        </div>
        <div className="bg-background-50 rounded-lg p-3 border border-background-200/50">
          <p className="text-xs text-foreground-400 mb-0.5">Last Sync</p>
          <p className="text-xs font-semibold text-foreground-700 whitespace-nowrap">
            {source.lastSyncRelative}
          </p>
          <p className="text-xs text-foreground-400 mt-0.5 font-mono">
            {new Date(source.lastSync).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} {new Date(source.lastSync).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-background-200/60">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-foreground-500">Data Quality Score</p>
          <div className="flex items-center gap-2">
            <svg width="64" height="64" viewBox="0 0 64 64" className="flex-shrink-0">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="5"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke={quality.ring}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${filled} ${circumference - filled}`}
                strokeDashoffset="0"
                transform="rotate(-90 32 32)"
                className="transition-all duration-700 ease-out"
                style={{ filter: `drop-shadow(0 0 3px ${quality.ring}40)` }}
              />
              <text
                x="32"
                y="34"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold"
                fill="currentColor"
                style={{ fontSize: '13px', fontWeight: 700 }}
              >
                {source.qualityScore}
              </text>
            </svg>
            <span className={`text-xs font-semibold ${quality.text}`}>%</span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-background-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${source.qualityScore}%`,
                backgroundColor: quality.ring,
              }}
            ></div>
          </div>
          <span className="text-xs font-medium text-foreground-500">
            {source.qualityScore >= 95 ? 'Excellent' : source.qualityScore >= 90 ? 'Very Good' : source.qualityScore >= 80 ? 'Good' : 'Fair'}
          </span>
        </div>
      </div>
    </div>
  );
}