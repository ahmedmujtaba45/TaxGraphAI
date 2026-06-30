import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recentAlerts } from '@/mocks/dashboard';

export default function RecentAlertsTable() {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const statusFilters = ['All', 'Critical', 'High', 'Medium'];

  const filteredAlerts = filter === 'All'
    ? recentAlerts
    : recentAlerts.filter((a) => a.status === filter);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-rose-100 text-rose-700';
      case 'High':
        return 'bg-amber-100 text-amber-700';
      case 'Medium':
        return 'bg-secondary-100 text-secondary-700';
      case 'Low':
        return 'bg-background-200 text-foreground-600';
      default:
        return 'bg-background-200 text-foreground-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-rose-600';
    if (score >= 70) return 'text-amber-600';
    if (score >= 50) return 'text-foreground-700';
    return 'text-foreground-500';
  };

  return (
    <div className="p-5 md:p-6 rounded-xl bg-background-50 border border-background-200/60">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground-900">Recent Alerts</h3>
          <p className="text-xs text-foreground-500 mt-0.5">Latest flagged cases requiring attention</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                filter === s
                  ? 'bg-primary-800 text-background-50'
                  : 'bg-background-100 text-foreground-600 hover:bg-background-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-background-200">
              <th className="text-left py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">Name</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">CNIC</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">Risk Score</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">Province</th>
              <th className="text-right py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">Amount</th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((alert, index) => (
              <tr
                key={index}
                onClick={() => navigate(`/entity-resolution?citizenId=${alert.citizenId}`)}
                className="border-b border-background-100 hover:bg-background-50/60 transition-colors cursor-pointer group"
              >
                <td className="py-3 px-3 text-sm font-medium text-foreground-800 whitespace-nowrap group-hover:text-primary-700 transition-colors">
                  {alert.name}
                </td>
                <td className="py-3 px-3 text-sm text-foreground-600 font-mono whitespace-nowrap">
                  {alert.cnic}
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-background-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          alert.riskScore >= 85
                            ? 'bg-rose-500'
                            : alert.riskScore >= 70
                            ? 'bg-amber-500'
                            : 'bg-foreground-400'
                        }`}
                        style={{ width: `${alert.riskScore}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-bold ${getScoreColor(alert.riskScore)}`}>
                      {alert.riskScore}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(alert.status)}`}>
                    {alert.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-sm text-foreground-600 whitespace-nowrap">
                  {alert.province}
                </td>
                <td className="py-3 px-3 text-sm font-semibold text-foreground-800 text-right whitespace-nowrap">
                  {alert.amount}
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg group-hover:bg-background-200 transition-colors">
                    <i className="ri-arrow-right-up-line text-foreground-400 group-hover:text-accent-600 text-sm transition-colors"></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}