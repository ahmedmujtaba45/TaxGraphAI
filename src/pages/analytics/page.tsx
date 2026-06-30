import DashboardLayout from '@/pages/dashboard/components/DashboardLayout';
import { analyticsKpis } from '@/mocks/analytics';
import TopRiskCitiesChart from './components/TopRiskCitiesChart';
import NonFilerDistributionChart from './components/NonFilerDistributionChart';
import RevenueRecoveryChart from './components/RevenueRecoveryChart';
import AssetVsIncomeChart from './components/AssetVsIncomeChart';
import RiskHeatmap from './components/RiskHeatmap';

const kpiCards = [
  {
    label: 'Potential Revenue Recovery',
    value: analyticsKpis.potentialRevenueRecovery,
    icon: 'ri-money-rupee-circle-line',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    trend: '+24.3%',
    trendUp: true,
  },
  {
    label: 'Cases Recommended for Audit',
    value: analyticsKpis.casesRecommendedForAudit,
    icon: 'ri-file-search-line',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    trend: '+18.7%',
    trendUp: true,
  },
  {
    label: 'Average Compliance Score',
    value: analyticsKpis.avgComplianceScore,
    icon: 'ri-speed-up-line',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    trend: '-3.2%',
    trendUp: false,
  },
  {
    label: 'Entity Resolution Accuracy',
    value: analyticsKpis.entityResolutionAccuracy,
    icon: 'ri-fingerprint-line',
    iconBg: 'bg-primary-100',
    iconColor: 'text-primary-600',
    trend: '+1.4%',
    trendUp: true,
  },
];

export default function Analytics() {
  return (
    <DashboardLayout activeMenu="Analytics">
      <div className="animate-page-enter">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground-900">
          National Tax Intelligence Analytics
        </h1>
        <p className="text-sm text-foreground-500 mt-1">
          Comprehensive analytical dashboard tracking tax compliance, revenue recovery, and risk distribution across Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-background-200/70 p-4 hover:border-background-300/80 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-9 h-9 rounded-lg ${kpi.iconBg} flex items-center justify-center flex-shrink-0`}>
                <i className={`${kpi.icon} ${kpi.iconColor} text-sm`}></i>
              </div>
              <span className="text-xs text-foreground-400 font-medium leading-tight">{kpi.label}</span>
            </div>
            <p className="text-2xl font-heading font-bold text-foreground-900 mb-1">{kpi.value}</p>
            <div className="flex items-center gap-1.5">
              <i className={`text-xs ${kpi.trendUp ? 'ri-arrow-up-line text-emerald-500' : 'ri-arrow-down-line text-rose-500'}`}></i>
              <span className={`text-xs font-semibold ${kpi.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                {kpi.trend}
              </span>
              <span className="text-xs text-foreground-400">vs last quarter</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
        <div className="lg:col-span-2">
          <TopRiskCitiesChart />
        </div>
        <div className="lg:col-span-3">
          <RiskHeatmap />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-1">
          <NonFilerDistributionChart />
        </div>
        <div className="lg:col-span-2">
          <RevenueRecoveryChart />
        </div>
      </div>

      <div className="mb-4">
        <AssetVsIncomeChart />
      </div>

      <div className="p-5 bg-white rounded-xl border border-background-200/70">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
            <i className="ri-brain-line text-primary-600 text-lg"></i>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground-900">AI Insight</p>
            <p className="text-xs text-foreground-500 mt-0.5">
              Machine learning models predict a <strong className="text-foreground-700">PKR 24.7B recoverable revenue gap</strong> for FY2025-26 if current non-filer patterns persist. Lahore and Karachi alone account for 64% of the national tax evasion risk. Prioritising these two cities could yield PKR 12B in recovery within 6 months.
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 rounded-full border border-primary-200/60 text-xs font-semibold text-primary-700 whitespace-nowrap">
              <i className="ri-sparkling-line"></i>
              AI Generated
            </span>
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}