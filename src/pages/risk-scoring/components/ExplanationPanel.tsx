import { AIExplanation } from '@/mocks/risk-scoring';

interface ExplanationPanelProps {
  aiExplanation: AIExplanation;
}

export default function ExplanationPanel({ aiExplanation }: ExplanationPanelProps) {
  return (
    <div className="bg-gradient-to-br from-rose-50/60 via-rose-50/30 to-white rounded-xl border border-rose-200/60 overflow-hidden">
      <div className="px-5 py-4 border-b border-rose-100/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
            <i className="ri-brain-line text-rose-600 text-lg"></i>
          </div>
          <div>
            <h3 className="text-base font-heading font-bold text-foreground-900">AI Risk Analysis</h3>
            <p className="text-xs text-foreground-500">Automated deviation detection engine v3.2</p>
          </div>
          <span className="ml-auto px-2.5 py-1 rounded-md text-[10px] font-semibold bg-rose-100 text-rose-700 whitespace-nowrap">
            High Confidence
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="p-4 bg-white/80 rounded-lg border border-rose-100/50">
          <p className="text-sm text-foreground-800 leading-relaxed font-medium">
            <i className="ri-double-quotes-l text-rose-400 mr-0.5"></i>
            {aiExplanation.summary}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-foreground-600 uppercase tracking-wide mb-3">Key Observations</h4>
          <ul className="space-y-2.5">
            {aiExplanation.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-rose-600">{idx + 1}</span>
                </span>
                <span className="text-sm text-foreground-700 leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start gap-3 p-4 bg-rose-100/50 rounded-lg border border-rose-200/40">
          <div className="w-8 h-8 rounded-lg bg-rose-200 flex items-center justify-center flex-shrink-0">
            <i className="ri-shield-flash-line text-rose-700 text-sm"></i>
          </div>
          <div>
            <h4 className="text-sm font-bold text-rose-800">Recommendation</h4>
            <p className="text-sm text-rose-700 leading-relaxed mt-0.5">{aiExplanation.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}