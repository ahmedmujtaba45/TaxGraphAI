import { IdentityMatch, MatchedSource } from '@/mocks/entity-resolution';
import { CitizenProfile } from '@/mocks/citizens';
import ConfidenceIndicator from './ConfidenceIndicator';

interface MatchResultsProps {
  identityMatch: IdentityMatch;
  matchedSources: MatchedSource[];
  citizen: CitizenProfile;
}

const riskBadgeConfig: Record<string, { bg: string; text: string; border: string }> = {
  Critical: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' },
  High: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  Medium: { bg: 'bg-secondary-100', text: 'text-secondary-700', border: 'border-secondary-200' },
  Low: { bg: 'bg-accent-100', text: 'text-accent-700', border: 'border-accent-200' },
};

export default function MatchResults({ identityMatch, matchedSources, citizen }: MatchResultsProps) {
  const riskCfg = riskBadgeConfig[citizen.riskLevel] || riskBadgeConfig.Medium;

  return (
    <div className="space-y-5">
      <div className="p-5 md:p-6 rounded-xl bg-background-50 border border-background-200/60 animate-fade-in-up">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-700 text-xl font-bold">
                  {identityMatch.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-primary-900">
                  {identityMatch.name}
                </h2>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="text-sm text-foreground-600 font-mono">{identityMatch.cnic}</span>
                  <span className="w-1 h-1 rounded-full bg-foreground-400 hidden sm:block"></span>
                  <span className="text-xs text-foreground-500">
                    {identityMatch.province} Province
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${riskCfg.bg} ${riskCfg.text} ${riskCfg.border}`}
                  >
                    {citizen.riskLevel}
                  </span>
                  <span className="text-xs text-foreground-500">
                    Score: <strong className="text-foreground-800">{citizen.score}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-background-200/60">
              <div className="flex items-center gap-2 group cursor-default">
                <i className="ri-money-rupee-circle-line text-foreground-400 text-sm group-hover:text-primary-600 transition-colors"></i>
                <span className="text-xs text-foreground-500">
                  Declared:{' '}
                  <strong className="text-foreground-700">{citizen.incomeDeclared}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <i className="ri-map-pin-line text-foreground-400 text-sm group-hover:text-accent-600 transition-colors"></i>
                <span className="text-xs text-foreground-500">
                  <strong className="text-foreground-700">{citizen.city}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <i className="ri-building-line text-foreground-400 text-sm group-hover:text-secondary-600 transition-colors"></i>
                <span className="text-xs text-foreground-500">
                  <strong className="text-foreground-700">{citizen.propertyValue}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <ConfidenceIndicator confidence={identityMatch.confidence} />
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 rounded-xl bg-background-50 border border-background-200/60 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'backwards' } as React.CSSProperties}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100">
            <i className="ri-database-2-line text-primary-700 text-lg"></i>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground-900">Matched Sources</h3>
            <p className="text-xs text-foreground-500">
              {matchedSources.length} data sources confirm this identity
            </p>
          </div>
          <span className="ml-auto px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold whitespace-nowrap">
            {matchedSources.length} Matches
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchedSources.map((source, idx) => (
            <div
              key={source.id}
              style={{ animationDelay: `${150 + idx * 80}ms`, animationFillMode: 'backwards' } as React.CSSProperties}
              className={`animate-fade-in-up p-4 rounded-lg border border-background-200 border-l-4 ${source.borderColor} bg-background-100/50 hover:bg-background-100 hover:border-l-[6px] transition-all duration-300 cursor-default group`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${source.color} group-hover:scale-105 transition-transform duration-200`}
                >
                  <i className={`${source.icon} text-sm`}></i>
                </div>
                <span className="text-xs font-semibold text-foreground-800">{source.source}</span>
              </div>

              <div className="mb-2">
                <p className="text-xs text-foreground-500 uppercase tracking-wider">{source.label}</p>
                <p className="text-lg md:text-xl font-bold text-primary-900 mt-0.5 group-hover:text-primary-800 transition-colors">
                  {source.value}
                </p>
              </div>

              <p className="text-xs text-foreground-500 leading-relaxed">{source.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 md:p-6 rounded-xl bg-accent-50/50 border border-accent-200/40 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'backwards' } as React.CSSProperties}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 flex-shrink-0">
            <i className="ri-lightbulb-line text-accent-600 text-sm"></i>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-accent-800 mb-1">AI Resolution Analysis</h4>
            <p className="text-sm text-accent-700 leading-relaxed">{identityMatch.explanation}</p>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-accent-200/40">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-accent-700 hover:text-accent-800 transition-colors cursor-pointer group/btn">
                <i className="ri-file-copy-line text-sm group-hover/btn:-translate-y-0.5 transition-transform"></i>
                <span>Flag for Audit</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-accent-700 hover:text-accent-800 transition-colors cursor-pointer group/btn">
                <i className="ri-download-line text-sm group-hover/btn:-translate-y-0.5 transition-transform"></i>
                <span>Export Report</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-accent-700 hover:text-accent-800 transition-colors cursor-pointer group/btn">
                <i className="ri-share-line text-sm group-hover/btn:-translate-y-0.5 transition-transform"></i>
                <span>Share Case</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}