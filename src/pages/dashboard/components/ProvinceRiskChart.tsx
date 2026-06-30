import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { provinceRisk } from '@/mocks/dashboard';

export default function ProvinceRiskChart() {
  return (
    <div className="p-5 md:p-6 rounded-xl bg-background-50 border border-background-200/60">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground-900">Tax Risk by Province</h3>
          <p className="text-xs text-foreground-500 mt-0.5">Risk breakdown across regions</p>
        </div>
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100">
          <i className="ri-pie-chart-2-line text-accent-600 text-sm"></i>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={provinceRisk} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--background-200))" vertical={false} />
            <XAxis dataKey="province" tick={{ fontSize: 11, fill: 'oklch(var(--foreground-500))' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'oklch(var(--foreground-500))' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'oklch(var(--background-50))',
                border: '1px solid oklch(var(--background-200))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Bar dataKey="lowRisk" name="Low Risk" stackId="a" fill="oklch(var(--accent-300))" radius={[0, 0, 0, 0]} />
            <Bar dataKey="mediumRisk" name="Medium Risk" stackId="a" fill="oklch(var(--secondary-500))" />
            <Bar dataKey="highRisk" name="High Risk" stackId="a" fill="#f59e0b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}