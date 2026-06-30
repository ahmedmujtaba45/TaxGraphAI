import { AuditTimelineEvent } from '@/mocks/audit-reports';

interface AuditTimelineProps {
  events: AuditTimelineEvent[];
}

const getCategoryStyles = (category: string) => {
  switch (category) {
  case 'Asset': return { dot: 'bg-accent-500', line: 'border-accent-200', iconBg: 'bg-accent-100 text-accent-600' };
  case 'Utility': return { dot: 'bg-secondary-500', line: 'border-secondary-200', iconBg: 'bg-secondary-100 text-secondary-600' };
  case 'Financial': return { dot: 'bg-rose-500', line: 'border-rose-200', iconBg: 'bg-rose-100 text-rose-600' };
  case 'Travel': return { dot: 'bg-primary-500', line: 'border-primary-200', iconBg: 'bg-primary-100 text-primary-600' };
  default: return { dot: 'bg-foreground-400', line: 'border-foreground-200', iconBg: 'bg-foreground-100 text-foreground-600' };
  }
};

export default function AuditTimeline({ events }: AuditTimelineProps) {
  return (
    <div className="bg-white rounded-xl border border-background-200/70 overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-background-100">
        <h3 className="text-base font-heading font-bold text-foreground-900">Audit Timeline</h3>
        <p className="text-xs text-foreground-500 mt-0.5">Chronological record of flagged events — Jan to May 2025</p>
      </div>

      <div className="p-5">
        <div className="relative">
          {events.map((event, idx) => {
            const styles = getCategoryStyles(event.category);
            const isLast = idx === events.length - 1;

            return (
              <div key={event.id} className="relative flex gap-4 pb-0">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-10 h-10 rounded-xl ${styles.iconBg} flex items-center justify-center z-10 relative`}>
                    <i className={`${event.icon} text-sm`}></i>
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 flex-1 min-h-[60px] border-l-2 border-dashed ${styles.line} mt-1 mb-1`}></div>
                  )}
                </div>

                <div className={`flex-1 min-w-0 ${isLast ? 'pb-0' : 'pb-7'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">{event.month}</span>
                    <span className="w-1 h-1 rounded-full bg-foreground-300"></span>
                    <span className="text-xs text-foreground-400">{event.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground-900">{event.title}</h4>
                  <p className="text-xs text-foreground-500 mt-1 leading-relaxed">{event.description}</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background-50 border border-background-200/60">
                    <i className="ri-money-rupee-circle-line text-foreground-400 text-xs"></i>
                    <span className="text-xs font-semibold text-foreground-700 whitespace-nowrap">{event.amount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}