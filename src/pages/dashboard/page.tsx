import { useState, useEffect } from 'react';
import DashboardLayout from './components/DashboardLayout';
import StatCards from './components/StatCards';
import StatCardsSkeleton from './components/StatCardsSkeleton';
import ComplianceChart from './components/ComplianceChart';
import ProvinceRiskChart from './components/ProvinceRiskChart';
import FlaggedCasesChart from './components/FlaggedCasesChart';
import DataSourceChart from './components/DataSourceChart';
import RecentAlertsTable from './components/RecentAlertsTable';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="animate-page-enter">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-heading font-bold text-primary-900">
            TaxGraph AI Control Center
          </h1>
          <p className="text-sm text-foreground-500 mt-1">
            Welcome back, Admin Khan. Here&apos;s your tax intelligence overview.
          </p>
        </div>

        <div className="space-y-6">
          {isLoading ? <StatCardsSkeleton /> : <StatCards />}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
            <ComplianceChart />
            <ProvinceRiskChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
            <div className="lg:col-span-2">
              <FlaggedCasesChart />
            </div>
            <div className="lg:col-span-1">
              <DataSourceChart />
            </div>
          </div>

          <RecentAlertsTable />
        </div>
      </div>
    </DashboardLayout>
  );
}