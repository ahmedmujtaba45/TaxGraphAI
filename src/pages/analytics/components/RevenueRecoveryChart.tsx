import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { revenueRecovery } from '@/mocks/analytics';

const barColors = ['#1e3a5f', '#0f766e', '#b45309', '#b91c1c', '#78716c'];

export default function RevenueRecoveryChart() {
  return (
    <div className="p-5 md:p-6 rounded-xl bg-white border border-background-200/70 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-heading font-bold text-foreground-900">Revenue Recovery Potential</h3>
          <p className="text-xs text-foreground-500 mt-0.5">Estimated recoverable tax by sector (PKR Billions)</p>
        </div>
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-50">
          <i className="ri-money-rupee-circle-line text-emerald-500 text-sm"></i>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueRecovery} margin={{ top: 5, right: 15, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--background-200))" vertical={false} />
            <XAxis
              dataKey="sector"
              tick={{ fontSize: 10, fill: 'oklch(var(--foreground-500))' }}
              axisLine={false}
              tickLine={false}
              angle={-20}
              textAnchor="end"
              height={55}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'oklch(var(--foreground-500))' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}B`}
            />
            <Tooltip
              formatter={(value: number) => [`PKR ${value}B`, 'Recovery Potential']}
              contentStyle={{
                backgroundColor: 'oklch(var(--background-50))',
                border: '1px solid oklch(var(--background-200))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={52} name="PKR Billions">
              {revenueRecovery.map((_, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 pt-3 border-t border-background-200/60">
        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground-500">Total Potential Recovery</span>
          <span className="text-sm font-bold text-foreground-900">
            PKR {(revenueRecovery.reduce((sum, s) => sum + s.amount, 0)).toFixed(1)}B
          </span>
        </div>
      </div>
    </div>
  );
}