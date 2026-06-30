import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/pages/dashboard/components/DashboardLayout';
import CitizenSelector from '@/components/feature/CitizenSelector';
import SearchSection from './components/SearchSection';
import MatchResults from './components/MatchResults';
import { useToast } from '@/hooks/useToast';
import { CitizenProfile, defaultCitizen, getCitizenById, citizenProfiles } from '@/mocks/citizens';
import { getEntityResolutionData } from '@/mocks/entity-resolution';

export default function EntityResolution() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [selectedCitizen, setSelectedCitizen] = useState<CitizenProfile>(() => {
    const citizenId = searchParams.get('citizenId');
    if (citizenId) {
      const found = getCitizenById(citizenId);
      if (found) return found;
    }
    return defaultCitizen;
  });

  const [searchValue, setSearchValue] = useState(() => {
    const citizenId = searchParams.get('citizenId');
    if (citizenId) {
      const found = getCitizenById(citizenId);
      if (found) return found.name;
    }
    return defaultCitizen.name;
  });

  const [isResolving, setIsResolving] = useState(false);
  const [resolvedData, setResolvedData] = useState(() =>
    getEntityResolutionData(selectedCitizen)
  );
  const [showResults, setShowResults] = useState(true);
  const [searchMode, setSearchMode] = useState('name');

  const handleResolve = useCallback(() => {
    if (!searchValue.trim()) {
      toast('Please enter a search term', 'warning');
      return;
    }

    setIsResolving(true);
    setShowResults(false);

    let match: CitizenProfile | undefined;

    if (searchMode === 'name') {
      match = citizenProfiles.find(
        (c) => c.name.toLowerCase() === searchValue.toLowerCase()
      );
      if (!match) {
        match = citizenProfiles.find((c) =>
          c.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
    } else if (searchMode === 'cnic') {
      match = citizenProfiles.find(
        (c) => c.cnic.replace(/-/g, '') === searchValue.replace(/-/g, '')
      );
    } else if (searchMode === 'phone') {
      match = citizenProfiles[Math.floor(Math.random() * citizenProfiles.length)];
    }

    setTimeout(() => {
      setIsResolving(false);
      if (match) {
        setSelectedCitizen(match);
        setSearchValue(match.name);
        setResolvedData(getEntityResolutionData(match));
        setShowResults(true);
        toast(`Entity resolved: ${match.name} — ${match.cnic}`, 'success');
      } else {
        setShowResults(true);
        toast('No matching entity found in connected databases', 'error');
      }
    }, 1200);
  }, [searchValue, searchMode, toast]);

  const handleCitizenSelect = useCallback(
    (citizen: CitizenProfile) => {
      setSelectedCitizen(citizen);
      setSearchValue(citizen.name);
      setShowResults(false);
      setTimeout(() => {
        setResolvedData(getEntityResolutionData(citizen));
        setShowResults(true);
        toast(`Switched to ${citizen.name}`, 'info');
      }, 250);
    },
    [toast]
  );

  return (
    <DashboardLayout activeMenu="Entity Resolution">
      <div className="animate-page-enter">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-heading font-bold text-primary-900">
                AI Entity Resolution
              </h1>
              <p className="text-sm text-foreground-500 mt-1">
                Match records belonging to the same person across multiple government databases using AI-powered identity resolution.
              </p>
            </div>
            <div className="flex-shrink-0">
              <CitizenSelector
                selectedId={selectedCitizen.id}
                onSelect={handleCitizenSelect}
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <SearchSection
            activeCitizen={selectedCitizen}
            searchValue={searchValue}
            searchMode={searchMode}
            onSearchModeChange={setSearchMode}
            onSearchChange={setSearchValue}
            onResolve={handleResolve}
            isResolving={isResolving}
          />

          <div className={`transition-all duration-500 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <MatchResults
              identityMatch={resolvedData.identityMatch}
              matchedSources={resolvedData.matchedSources}
              citizen={selectedCitizen}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}