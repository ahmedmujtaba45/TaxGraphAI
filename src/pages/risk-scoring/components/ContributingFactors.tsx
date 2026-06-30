import { ContributingFactor } from '@/mocks/risk-scoring';

interface ContributingFactorsProps {
  factors: ContributingFactor[];
}

export default function ContributingFactors({ factors }: ContributingFactorsProps) {
  const getBarColor = (score: number) => {
    if (score >= 22) return 'bg-rose-500';
    if (score >= 18) return 'bg-amber-500';
    if (score >= 15) return 'bg-secondary-500';
    return 'bg-accent-500';
  };

  const getIconBg = (category: string) => {
    switch (category) {
    case 'Asset': return 'bg-accent-100 text-accent-600';
    case 'Utility': return 'bg-secondary-100 text-secondary-600';
    case 'Travel': return 'bg-primary-100 text-primary-600';
    case 'Financial': return 'bg-rose-100 text-rose-600';
    default: return 'bg-foreground-100 text-foreground-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-background-200/70 overflow-hidden">
      <div className="px-5 py-4 border-b border-background-100">
        <h3 className="text-base font-heading font-bold text-foreground-900">Contributing Factors</h3>
        <p className="text-xs text-foreground-500 mt-0.5">Breakdown of indicators contributing to the risk score</p>
      </div>

      <div className="divide-y divide-background-100">
        {factors.map((factor) => (
          <div key={factor.id} className="px-5 py-4 hover:bg-background-50/70 transition-colors">
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconBg(factor.category)}`}>
                <i className={`${factor.icon} text-sm`}></i>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-semibold text-foreground-900 truncate">{factor.name}</h4>
                  <span className={`text-sm font-bold whitespace-nowrap ${factor.score >= 20 ? 'text-rose-600' : factor.score >= 16 ? 'text-amber-600' : 'text-secondary-600'}`}>
                    +{factor.score}
                  </span>
                </div>
                <p className="text-xs text-foreground-500 mt-1 leading-relaxed">{factor.description}</p>

                <div className="mt-3 h-2 bg-background-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-800 ease-out ${getBarColor(factor.score)}`}
                    style={{ width: `${(factor.score / 25) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 bg-background-50 border-t border-background-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground-500 font-medium">Total Contribution</span>
          <span className="text-lg font-bold text-foreground-900">
            {factors.reduce((sum, f) => sum + f.score, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}