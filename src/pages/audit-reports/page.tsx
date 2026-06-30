import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/pages/dashboard/components/DashboardLayout';
import CitizenSelector from '@/components/feature/CitizenSelector';
import { getAuditReportData, AuditTimelineEvent, AIFinding, AuditRecommendation } from '@/mocks/audit-reports';
import { CitizenProfile, defaultCitizen, getCitizenById } from '@/mocks/citizens';
import AuditTimeline from './components/AuditTimeline';
import AIFindings from './components/AIFindings';
import RecommendationPanel from './components/RecommendationPanel';

export default function AuditReports() {
  const [searchParams] = useSearchParams();
  const [selectedCitizen, setSelectedCitizen] = useState<CitizenProfile>(() => {
    const citizenId = searchParams.get('citizenId');
    if (citizenId) {
      const found = getCitizenById(citizenId);
      if (found) return found;
    }
    return defaultCitizen;
  });
  const { auditCitizen, auditTimeline, aiFindings, auditRecommendation } = getAuditReportData(selectedCitizen);

  return (
    <DashboardLayout activeMenu="Audit Reports">
      <div className="animate-page-enter">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground-900">
              Explainable AI Audit Report
            </h1>
            <p className="text-sm text-foreground-500 mt-1">
              Comprehensive audit analysis with transparent AI reasoning, evidence trails, and actionable recommendations.
            </p>
          </div>
          <div className="flex-shrink-0">
            <CitizenSelector
              selectedId={selectedCitizen.id}
              onSelect={setSelectedCitizen}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 p-4 bg-white rounded-xl border border-background-200/70">
        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-primary-700">
            {auditCitizen.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-heading font-bold text-foreground-900">{auditCitizen.name}</h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
            <span className="text-sm text-foreground-500 font-mono">{auditCitizen.cnic}</span>
            <span className="w-1 h-1 rounded-full bg-foreground-300 hidden sm:block"></span>
            <span className="text-sm text-foreground-500">{auditCitizen.city}, {auditCitizen.province}</span>
            <span className="w-1 h-1 rounded-full bg-foreground-300 hidden sm:block"></span>
            <span className="text-sm text-foreground-500">Declared: {auditCitizen.incomeDeclared}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="px-3 py-1.5 bg-primary-100/60 rounded-lg border border-primary-200/40">
            <span className="text-xs text-primary-700 font-mono font-semibold">{auditCitizen.auditId}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200/60">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
            <span className="text-xs text-amber-700 font-semibold whitespace-nowrap">{auditCitizen.caseStatus}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="flex items-center gap-2 text-xs text-foreground-500">
          <i className="ri-user-star-line text-foreground-400"></i>
          <span>Assigned: <strong className="text-foreground-700">{auditCitizen.assignedOfficer}</strong></span>
        </div>
        <span className="w-1 h-1 rounded-full bg-foreground-300 hidden sm:block"></span>
        <div className="flex items-center gap-2 text-xs text-foreground-500">
          <i className="ri-building-2-line text-foreground-400"></i>
          <span>{auditCitizen.assignedUnit}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
        <div className="lg:col-span-2">
          <AuditTimeline events={auditTimeline} />
        </div>
        <div className="lg:col-span-3">
          <AIFindings findings={aiFindings} />
        </div>
      </div>

      <RecommendationPanel recommendation={auditRecommendation} />
      </div>
    </DashboardLayout>
  );
}