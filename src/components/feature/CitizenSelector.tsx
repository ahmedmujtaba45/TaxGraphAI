import { useState, useRef, useEffect } from 'react';
import { CitizenProfile, cityGroups } from '@/mocks/citizens';

interface CitizenSelectorProps {
  selectedId: string;
  onSelect: (citizen: CitizenProfile) => void;
}

function getRiskBadge(level: string) {
  switch (level) {
  case 'Critical': return 'bg-rose-100 text-rose-700 border-rose-200';
  case 'High': return 'bg-amber-100 text-amber-700 border-amber-200';
  case 'Medium': return 'bg-secondary-100 text-secondary-700 border-secondary-200';
  case 'Low': return 'bg-accent-100 text-accent-700 border-accent-200';
  default: return 'bg-foreground-100 text-foreground-600 border-foreground-200';
  }
}

export default function CitizenSelector({ selectedId, onSelect }: CitizenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = cityGroups.flatMap((g) => g.citizens).find((c) => c.id === selectedId);

  const filteredGroups = cityGroups.map((group) => ({
    ...group,
    citizens: group.citizens.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.cnic.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((g) => g.citizens.length > 0);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalMatching = filteredGroups.reduce((sum, g) => sum + g.citizens.length, 0);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setSearch('');
        }}
        className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-background-200/70 hover:border-accent-300/60 transition-all duration-200 min-w-[260px] cursor-pointer"
      >
        {selected ? (
          <>
            <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary-700">
                {selected.name.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground-900 truncate">{selected.name}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border whitespace-nowrap ${getRiskBadge(selected.riskLevel)}`}>
                  {selected.riskLevel}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-foreground-500 font-mono">{selected.cnic}</span>
                <span className="w-1 h-1 rounded-full bg-foreground-300"></span>
                <span className="text-xs text-foreground-400">{selected.city}</span>
              </div>
            </div>
            {isOpen ? (
              <i className="ri-arrow-up-s-line text-foreground-400 text-sm flex-shrink-0"></i>
            ) : (
              <i className="ri-arrow-down-s-line text-foreground-400 text-sm flex-shrink-0"></i>
            )}
          </>
        ) : (
          <>
            <span className="text-sm text-foreground-500">Select a citizen...</span>
            <i className="ri-arrow-down-s-line text-foreground-400 text-sm ml-auto"></i>
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[380px] bg-white rounded-xl border border-background-200/70 shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-background-100">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or CNIC..."
                className="w-full pl-9 pr-3 py-2 bg-background-50 border border-background-200 rounded-lg text-sm text-foreground-800 placeholder:text-foreground-400 focus:outline-none focus:border-accent-300 transition-all"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-[420px] overflow-y-auto">
            {filteredGroups.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <div className="w-10 h-10 mx-auto rounded-xl bg-background-100 flex items-center justify-center mb-3">
                  <i className="ri-user-search-line text-foreground-400 text-lg"></i>
                </div>
                <p className="text-sm text-foreground-500">No citizens found</p>
                <p className="text-xs text-foreground-400 mt-1">Try a different search term</p>
              </div>
            ) : (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-foreground-400 uppercase tracking-wider bg-background-50">
                  {totalMatching} citizen{totalMatching !== 1 ? 's' : ''} found
                </div>
                {filteredGroups.map((group) => (
                  <div key={group.city}>
                    <div className="px-3 py-1.5 text-[11px] font-bold text-foreground-400 uppercase tracking-wider bg-background-50/50 border-b border-background-100 flex items-center gap-2">
                      <i className="ri-map-pin-line text-[10px]"></i>
                      {group.city}
                      <span className="text-[10px] font-normal text-foreground-300">({group.citizens.length})</span>
                    </div>
                    {group.citizens.map((citizen) => (
                      <button
                        key={citizen.id}
                        onClick={() => {
                          onSelect(citizen);
                          setIsOpen(false);
                          setSearch('');
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-background-50 transition-colors ${
                          citizen.id === selectedId ? 'bg-accent-50/60 border-l-2 border-l-accent-500' : 'border-l-2 border-l-transparent'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          citizen.id === selectedId ? 'bg-accent-100' : 'bg-background-100'
                        }`}>
                          <span className={`text-sm font-bold ${
                            citizen.id === selectedId ? 'text-accent-700' : 'text-primary-700'
                          }`}>
                            {citizen.name.split(' ').map((n) => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground-900 truncate">{citizen.name}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border whitespace-nowrap ${getRiskBadge(citizen.riskLevel)}`}>
                              {citizen.riskLevel}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-foreground-500 font-mono">{citizen.cnic}</span>
                            <span className="w-1 h-1 rounded-full bg-foreground-300"></span>
                            <span className="text-xs text-foreground-400">{citizen.city}</span>
                          </div>
                        </div>
                        {citizen.id === selectedId && (
                          <i className="ri-check-line text-accent-500 text-sm flex-shrink-0"></i>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}