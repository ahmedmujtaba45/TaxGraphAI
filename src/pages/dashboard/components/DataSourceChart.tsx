import { dataSourceContribution } from '@/mocks/dashboard';

export default function DataSourceChart() {
  const total = dataSourceContribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-5 md:p-6 rounded-xl bg-background-50 border border-background-200/60">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground-900">Data Source Contribution</h3>
          <p className="text-xs text-foreground-500 mt-0.5">Percentage of resolved entities by source</p>
        </div>
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100">
          <i className="ri-database-2-line text-accent-600 text-sm"></i>
        </div>
      </div>

      <div className="space-y-4">
        {dataSourceContribution.map((source) => (
          <div key={source.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-foreground-700">{source.name}</span>
              <span className="text-sm font-semibold text-foreground-900">{source.value}%</span>
            </div>
            <div className="w-full h-2.5 bg-background-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${source.color}`}
                style={{ width: `${(source.value / total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}