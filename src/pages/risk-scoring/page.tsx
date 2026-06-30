import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/pages/dashboard/components/DashboardLayout';
import CitizenSelector from '@/components/feature/CitizenSelector';
import { getRiskScoringData, ContributingFactor, AIExplanation } from '@/mocks/risk-scoring';
import { CitizenProfile, defaultCitizen, getCitizenById } from '@/mocks/citizens';
import ScoreMeter from './components/ScoreMeter';
import ContributingFactors from './components/ContributingFactors';
import ExplanationPanel from './components/ExplanationPanel';

export default function RiskScoring() {
  const [searchParams] = useSearchParams();
  const [selectedCitizen, setSelectedCitizen] = useState<CitizenProfile>(() => {
    const citizenId = searchParams.get('citizenId');
    if (citizenId) {
      const found = getCitizenById(citizenId);
      if (found) return found;
    }
    return defaultCitizen;
  });
  const data = getRiskScoringData(selectedCitizen);

  return (
    <DashboardLayout activeMenu="Risk Scoring">
      <div className="animate-page-enter">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground-900">
              Tax Compliance Deviation Score Engine
            </h1>
            <p className="text-sm text-foreground-500 mt-1">
              AI-powered risk assessment analysing discrepancies between declared income and actual lifestyle indicators.
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

      <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-xl border border-background-200/70">
        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-primary-700">
            {data.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-heading font-bold text-foreground-900">{data.name}</h2>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-sm text-foreground-500 font-mono">{data.cnic}</span>
            <span className="w-1 h-1 rounded-full bg-foreground-300"></span>
            <span className="text-sm text-foreground-500">{data.city}, {data.province}</span>
            <span className="w-1 h-1 rounded-full bg-foreground-300"></span>
            <span className="text-sm text-foreground-500">Declared: {data.incomeDeclared}</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-background-50 rounded-lg border border-background-200/60">
          <i className="ri-user-search-line text-foreground-400 text-sm"></i>
          <span className="text-xs text-foreground-500 font-medium">Selected Citizen</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-background-200/70 p-6 lg:p-8 flex flex-col items-center justify-center h-full min-h-[380px]">
            <ScoreMeter score={data.score} riskLevel={data.riskLevel} />
          </div>
        </div>

        <div className="lg:col-span-3">
          <ContributingFactors factors={data.contributingFactors} />
        </div>
      </div>

      <div className="mt-5">
        <ExplanationPanel aiExplanation={data.aiExplanation} />
      </div>
      </div>
    </DashboardLayout>
  );
}