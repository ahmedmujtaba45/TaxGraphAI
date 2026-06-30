import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { topRiskCities } from '@/mocks/analytics';

export default function TopRiskCitiesChart() {
  return (
    <div className="p-5 md:p-6 rounded-xl bg-white border border-background-200/70 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-heading font-bold text-foreground-900">Top Risk Cities</h3>
          <p className="text-xs text-foreground-500 mt-0.5">Highest concentration of tax evasion risk</p>
        </div>
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-rose-50">
          <i className="ri-map-pin-line text-rose-500 text-sm"></i>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topRiskCities} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--background-200))" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: 'oklch(var(--foreground-500))' }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="city"
              tick={{ fontSize: 12, fill: 'oklch(var(--foreground-700))', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              width={90}
            />
            <Tooltip
              formatter={(value: number) => [`Risk Score: ${value}`, '']}
              contentStyle={{
                backgroundColor: 'oklch(var(--background-50))',
                border: '1px solid oklch(var(--background-200))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={30} name="Risk Score">
              {topRiskCities.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-5 gap-2 mt-3 pt-3 border-t border-background-200/60">
        {topRiskCities.map((city) => (
          <div key={city.city} className="text-center">
            <p className="text-xs text-foreground-400">{city.city}</p>
            <p className="text-xs font-bold text-foreground-700">{city.cases.toLocaleString()}</p>
            <p className="text-xs text-foreground-500">cases</p>
          </div>
        ))}
      </div>
    </div>
  );
}