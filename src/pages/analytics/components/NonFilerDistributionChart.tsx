import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { nonFilerDistribution } from '@/mocks/analytics';

export default function NonFilerDistributionChart() {
  return (
    <div className="p-5 md:p-6 rounded-xl bg-white border border-background-200/70 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-heading font-bold text-foreground-900">Non-Filer Distribution</h3>
          <p className="text-xs text-foreground-500 mt-0.5">Breakdown by professional category</p>
        </div>
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-50">
          <i className="ri-pie-chart-line text-amber-500 text-sm"></i>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-5">
        <div className="w-48 h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={nonFilerDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="percentage"
                strokeWidth={0}
              >
                {nonFilerDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, '']}
                contentStyle={{
                  backgroundColor: 'oklch(var(--background-50))',
                  border: '1px solid oklch(var(--background-200))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2.5 w-full">
          {nonFilerDistribution.map((item) => (
            <div key={item.category} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-foreground-700 flex-1">{item.category}</span>
              <span className="text-sm font-bold text-foreground-900">{item.percentage}%</span>
            </div>
          ))}
          <div className="pt-3 mt-3 border-t border-background-200/60">
            <p className="text-xs text-foreground-500">
              <strong className="text-foreground-700">Business Owners</strong> represent the largest non-filer segment at 35%, followed by salaried employees at 28%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}