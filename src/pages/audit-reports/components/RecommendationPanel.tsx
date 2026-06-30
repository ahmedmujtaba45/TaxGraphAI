import { AuditRecommendation } from '@/mocks/audit-reports';

interface RecommendationPanelProps {
  recommendation: AuditRecommendation;
}

export default function RecommendationPanel({ recommendation }: RecommendationPanelProps) {
  const radius = 64;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (recommendation.confidence / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-primary-50/50 via-primary-50/20 to-white rounded-xl border border-primary-200/50 overflow-hidden">
      <div className="px-5 py-4 border-b border-primary-100/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
            <i className="ri-robot-2-line text-primary-600 text-lg"></i>
          </div>
          <div>
            <h3 className="text-base font-heading font-bold text-foreground-900">Final Recommendation</h3>
            <p className="text-xs text-foreground-500">Explainable AI audit decision — Model XAI v4.1</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg width="100%" height="100%" viewBox="0 0 138 138" className="-rotate-90">
                <defs>
                  <filter id="auditGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  stroke="oklch(var(--primary-100))"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={radius + strokeWidth / 2}
                  cy={radius + strokeWidth / 2}
                />
                <circle
                  stroke="oklch(var(--primary-600))"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  r={normalizedRadius}
                  cx={radius + strokeWidth / 2}
                  cy={radius + strokeWidth / 2}
                  filter="url(#auditGlow)"
                  className="transition-all duration-1200 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary-700">{recommendation.confidence}%</span>
                <span className="text-[11px] text-foreground-500 font-medium">Confidence</span>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="p-4 bg-white/80 rounded-lg border border-primary-100/50">
              <p className="text-sm text-foreground-800 leading-relaxed font-medium">
                <i className="ri-double-quotes-l text-primary-300 mr-0.5"></i>
                {recommendation.summary}
              </p>
            </div>

            <div className="p-4 bg-primary-100/40 rounded-lg border border-primary-200/40">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-primary-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-shield-check-line text-primary-700 text-xs"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary-800">Recommended Action</h4>
                  <p className="text-sm text-primary-700 leading-relaxed mt-1">{recommendation.recommendation}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-foreground-600 uppercase tracking-wide mb-2.5">Next Steps</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recommendation.nextSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 bg-background-50 rounded-lg border border-background-200/50">
                    <span className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-px">
                      <span className="text-[10px] font-bold text-primary-600">{idx + 1}</span>
                    </span>
                    <span className="text-xs text-foreground-700 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}