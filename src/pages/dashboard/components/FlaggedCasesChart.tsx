import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { monthlyFlaggedCases } from '@/mocks/dashboard';

export default function FlaggedCasesChart() {
  return (
    <div className="p-5 md:p-6 rounded-xl bg-background-50 border border-background-200/60">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground-900">Monthly Flagged Cases</h3>
          <p className="text-xs text-foreground-500 mt-0.5">Flagged vs Resolved (2025)</p>
        </div>
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100">
          <i className="ri-line-chart-line text-accent-600 text-sm"></i>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyFlaggedCases} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="flaggedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(var(--primary-600))" stopOpacity={0.15} />
                <stop offset="95%" stopColor="oklch(var(--primary-600))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(var(--accent-500))" stopOpacity={0.15} />
                <stop offset="95%" stopColor="oklch(var(--accent-500))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--background-200))" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'oklch(var(--foreground-500))' }} axisLine={false} tickLine={false} />
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
            <Area type="monotone" dataKey="flagged" name="Flagged" stroke="oklch(var(--primary-600))" fill="url(#flaggedGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="resolved" name="Resolved" stroke="oklch(var(--accent-500))" fill="url(#resolvedGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}