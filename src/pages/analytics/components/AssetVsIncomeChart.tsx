import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, ReferenceLine, Cell } from 'recharts';
import { assetVsIncomeData } from '@/mocks/analytics';

const cityColors: Record<string, string> = {
  Lahore: '#e11d48',
  Karachi: '#1e3a5f',
  Islamabad: '#b45309',
  Peshawar: '#0f766e',
  Quetta: '#78716c',
};

const scatterData = assetVsIncomeData.map((item) => ({
  ...item,
  color: cityColors[item.city] || '#78716c',
}));

const cityList = [...new Set(assetVsIncomeData.map((d) => d.city))];

export default function AssetVsIncomeChart() {
  return (
    <div className="p-5 md:p-6 rounded-xl bg-white border border-background-200/70 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-heading font-bold text-foreground-900">Asset Ownership vs Declared Income</h3>
          <p className="text-xs text-foreground-500 mt-0.5">Each dot represents an individual taxpayer (PKR Millions)</p>
        </div>
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50">
          <i className="ri-bubble-chart-line text-primary-500 text-sm"></i>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3 flex-wrap">
        {cityList.map((city) => (
          <div key={city} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: cityColors[city] }}
            ></div>
            <span className="text-xs text-foreground-500">{city}</span>
          </div>
        ))}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 15, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--background-200))" />
            <XAxis
              type="number"
              dataKey="declared"
              name="Declared Income"
              unit="M"
              tick={{ fontSize: 11, fill: 'oklch(var(--foreground-500))' }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'Declared Income (PKR M)', position: 'insideBottom', offset: -8, fontSize: 11, fill: 'oklch(var(--foreground-500))' }}
            />
            <YAxis
              type="number"
              dataKey="actual"
              name="Actual Assets"
              unit="M"
              tick={{ fontSize: 11, fill: 'oklch(var(--foreground-500))' }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'Actual Assets (PKR M)', angle: -90, position: 'insideLeft', offset: 5, fontSize: 11, fill: 'oklch(var(--foreground-500))' }}
            />
            <ZAxis range={[60, 60]} />
            <Tooltip
              formatter={(value: number, name: string) => [`PKR ${value}M`, name]}
              contentStyle={{
                backgroundColor: 'oklch(var(--background-50))',
                border: '1px solid oklch(var(--background-200))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <ReferenceLine y={5} stroke="oklch(var(--foreground-300))" strokeDasharray="5 5" strokeWidth={1} />
            <ReferenceLine x={2} stroke="oklch(var(--foreground-300))" strokeDasharray="5 5" strokeWidth={1} />
            <Scatter data={scatterData} fill="#e11d48" shape="circle">
              {scatterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.75} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-background-200/60">
        <p className="text-xs text-foreground-500">
          <strong className="text-rose-600">Red zone:</strong> Individuals with declared income under PKR 2M but actual assets exceeding PKR 5M represent <strong className="text-foreground-700">high-priority audit targets</strong>.
        </p>
      </div>
    </div>
  );
}