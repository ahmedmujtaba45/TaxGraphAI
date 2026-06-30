import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { complianceScores } from '@/mocks/dashboard';

const barColors = ['#1e3a5f', '#1e3a5f', '#2d5a87', '#2d5a87', '#0f766e'];

export default function ComplianceChart() {
  return (
    <div className="p-5 md:p-6 rounded-xl bg-background-50 border border-background-200/60">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground-900">Compliance Score Distribution</h3>
          <p className="text-xs text-foreground-500 mt-0.5">Taxpayer count by score range</p>
        </div>
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100">
          <i className="ri-bar-chart-2-line text-accent-600 text-sm"></i>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={complianceScores} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--background-200))" vertical={false} />
            <XAxis dataKey="score" tick={{ fontSize: 11, fill: 'oklch(var(--foreground-500))' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'oklch(var(--foreground-500))' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'oklch(var(--background-50))',
                border: '1px solid oklch(var(--background-200))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={50}>
              {complianceScores.map((_, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}