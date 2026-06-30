import { AIFinding } from '@/mocks/audit-reports';

interface AIFindingsProps {
  findings: AIFinding[];
}

const getSeverityStyles = (severity: string) => {
  switch (severity) {
  case 'Critical': return { badge: 'bg-rose-100 text-rose-700 border-rose-200', bar: 'bg-rose-500', iconBg: 'bg-rose-100 text-rose-600' };
  case 'High': return { badge: 'bg-amber-100 text-amber-700 border-amber-200', bar: 'bg-amber-500', iconBg: 'bg-amber-100 text-amber-600' };
  case 'Medium': return { badge: 'bg-secondary-100 text-secondary-700 border-secondary-200', bar: 'bg-secondary-500', iconBg: 'bg-secondary-100 text-secondary-600' };
  case 'Low': return { badge: 'bg-accent-100 text-accent-700 border-accent-200', bar: 'bg-accent-500', iconBg: 'bg-accent-100 text-accent-600' };
  default: return { badge: 'bg-foreground-100 text-foreground-700 border-foreground-200', bar: 'bg-foreground-400', iconBg: 'bg-foreground-100 text-foreground-600' };
  }
};

export default function AIFindings({ findings }: AIFindingsProps) {
  return (
    <div className="bg-white rounded-xl border border-background-200/70 overflow-hidden">
      <div className="px-5 py-4 border-b border-background-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
            <i className="ri-search-eye-line text-primary-600 text-sm"></i>
          </div>
          <div>
            <h3 className="text-base font-heading font-bold text-foreground-900">AI Findings</h3>
            <p className="text-xs text-foreground-500">Automated pattern analysis across 4 independent data sources</p>
          </div>
          <span className="ml-auto px-2.5 py-1 rounded-md text-[10px] font-semibold bg-primary-100 text-primary-700 whitespace-nowrap">
            {findings.length} Findings
          </span>
        </div>
      </div>

      <div className="divide-y divide-background-100">
        {findings.map((finding) => {
          const styles = getSeverityStyles(finding.severity);
          return (
            <div key={finding.id} className="px-5 py-4 hover:bg-background-50/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xs font-bold">{finding.number}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <h4 className="text-sm font-bold text-foreground-900">{finding.title}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${styles.badge}`}>
                      {finding.severity}
                    </span>
                  </div>

                  <p className="text-sm text-foreground-600 leading-relaxed">{finding.description}</p>

                  <div className="mt-2.5 flex items-center gap-2 text-xs text-foreground-400">
                    <i className="ri-folder-2-line text-foreground-300"></i>
                    <span className="font-mono text-[11px]">{finding.evidence}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}