interface MetricItem {
  icon: string;
  label: string;
  value: string;
  color: string;
}

interface GraphMetricsCardsProps {
  metrics: MetricItem[];
}

export default function GraphMetricsCards({ metrics }: GraphMetricsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="p-4 rounded-xl bg-background-50 border border-background-200/60 hover:border-accent-200/40 transition-all duration-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${metric.color}`}>
              <i className={`${metric.icon} text-sm`}></i>
            </div>
          </div>
          <p className="text-2xl font-bold text-primary-900">{metric.value}</p>
          <p className="text-xs text-foreground-500 mt-0.5">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}