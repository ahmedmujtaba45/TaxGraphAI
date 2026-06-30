import DashboardLayout from '@/pages/dashboard/components/DashboardLayout';
import { dataSources, sourceMetrics } from '@/mocks/data-sources';
import SourceCard from './components/SourceCard';

export default function DataSources() {
  return (
    <DashboardLayout activeMenu="Data Sources">
      <div className="animate-page-enter">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground-900">
          Data Sources Management
        </h1>
        <p className="text-sm text-foreground-500 mt-1">
          Monitor and manage all connected government data repositories powering the TaxGraph AI intelligence engine.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-background-200/70 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
              <i className="ri-database-2-line text-primary-600 text-sm"></i>
            </div>
            <span className="text-xs text-foreground-400 font-medium">Total Sources</span>
          </div>
          <p className="text-2xl font-heading font-bold text-foreground-900">{sourceMetrics.totalSources}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-emerald-600 font-semibold">All Connected</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-background-200/70 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
              <i className="ri-file-copy-line text-accent-600 text-sm"></i>
            </div>
            <span className="text-xs text-foreground-400 font-medium">Total Records</span>
          </div>
          <p className="text-2xl font-heading font-bold text-foreground-900">
            {(sourceMetrics.totalRecords / 1000000).toFixed(0)}M
          </p>
          <p className="text-xs text-foreground-400 mt-1 font-mono">{sourceMetrics.totalRecords.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl border border-background-200/70 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center">
              <i className="ri-shield-check-line text-secondary-600 text-sm"></i>
            </div>
            <span className="text-xs text-foreground-400 font-medium">Avg. Quality</span>
          </div>
          <p className="text-2xl font-heading font-bold text-foreground-900">{sourceMetrics.avgQualityScore}%</p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-emerald-600 font-semibold">Excellent</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-background-200/70 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
              <i className="ri-refresh-line text-primary-600 text-sm"></i>
            </div>
            <span className="text-xs text-foreground-400 font-medium">Last Full Sync</span>
          </div>
          <p className="text-sm font-heading font-bold text-foreground-900">
            {new Date(sourceMetrics.lastFullSync).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
          <p className="text-xs text-foreground-400 mt-1 font-mono">
            {new Date(sourceMetrics.lastFullSync).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-heading font-bold text-foreground-900">Connected Data Sources</h2>
          <p className="text-xs text-foreground-500 mt-0.5">
            All {sourceMetrics.totalSources} sources are operational with real-time data pipelines
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-background-200/70 text-sm font-medium text-foreground-600 hover:bg-background-50 transition-colors whitespace-nowrap cursor-pointer">
            <i className="ri-filter-3-line text-base"></i>
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer">
            <i className="ri-refresh-line text-base"></i>
            <span>Sync All</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataSources.map((source) => (
          <SourceCard key={source.id} source={source} />
        ))}
      </div>

      <div className="mt-6 p-5 bg-white rounded-xl border border-background-200/70">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <i className="ri-check-double-line text-emerald-600 text-lg"></i>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground-900">
              All data pipelines operational
            </p>
            <p className="text-xs text-foreground-500 mt-0.5">
              All {sourceMetrics.totalSources} sources are connected and synchronising on schedule. Last health check passed with zero anomalies detected across data ingestion pipelines.
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200/60 text-xs font-semibold text-emerald-700">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              System Healthy
            </span>
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}