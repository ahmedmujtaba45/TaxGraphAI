import { useState } from 'react';
import { searchFields } from '@/mocks/entity-resolution';
import { CitizenProfile } from '@/mocks/citizens';

interface SearchSectionProps {
  activeCitizen: CitizenProfile;
  searchValue: string;
  searchMode: string;
  onSearchModeChange: (mode: string) => void;
  onSearchChange: (val: string) => void;
  onResolve: () => void;
  isResolving: boolean;
}

export default function SearchSection({
  activeCitizen,
  searchValue,
  searchMode,
  onSearchModeChange,
  onSearchChange,
  onResolve,
  isResolving,
}: SearchSectionProps) {
  const activeField = searchFields.find((f) => f.id === searchMode) || searchFields[0];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isResolving) {
      onResolve();
    }
  };

  return (
    <div className="p-5 md:p-6 rounded-xl bg-background-50 border border-background-200/60 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-100">
          <i className="ri-search-line text-accent-600 text-lg"></i>
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground-900">Entity Search</h3>
          <p className="text-xs text-foreground-500">Search across all connected government databases</p>
        </div>
        {isResolving && (
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-accent-50 rounded-full border border-accent-200/60">
            <div className="w-4 h-4 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-semibold text-accent-700">Resolving...</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {searchFields.map((field) => (
          <button
            key={field.id}
            onClick={() => {
              onSearchModeChange(field.id);
              onSearchChange('');
            }}
            disabled={isResolving}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
              searchMode === field.id
                ? 'bg-primary-800 text-background-50 shadow-sm'
                : 'bg-background-100 text-foreground-600 hover:bg-background-200'
            } ${isResolving ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <i className={`${field.icon} mr-1.5 text-xs`}></i>
            {field.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <i
          className={`${activeField.icon} absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400 text-base transition-all duration-200 ${
            isResolving ? 'animate-pulse' : ''
          }`}
        ></i>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={activeField.placeholder}
          disabled={isResolving}
          className={`w-full pl-11 pr-28 py-3 bg-background-100 border border-background-200 rounded-lg text-sm text-foreground-800 placeholder:text-foreground-400 focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 transition-all ${
            isResolving ? 'opacity-60 cursor-wait' : ''
          }`}
        />
        <button
          onClick={onResolve}
          disabled={isResolving}
          className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-background-50 text-sm font-semibold rounded-md transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            isResolving
              ? 'bg-foreground-400 cursor-not-allowed'
              : 'bg-accent-500 hover:bg-accent-600 active:scale-95'
          }`}
        >
          {isResolving ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/60 border-t-white rounded-full animate-spin"></div>
              <span>Resolving</span>
            </>
          ) : (
            <>
              <i className="ri-search-line mr-1"></i>
              <span>Resolve</span>
            </>
          )}
        </button>
      </div>

      {isResolving && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-background-100 rounded-lg">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-xs text-foreground-500">Scanning NADRA, FBR, Excise, Property Registry, and 6 more sources...</span>
        </div>
      )}

      {!isResolving && (
        <div className="flex items-center gap-3 mt-4 px-3 py-2 bg-background-100 rounded-lg">
          <span className="text-xs text-foreground-500">Currently viewing:</span>
          <span className="text-xs font-semibold text-foreground-800">{activeCitizen.name}</span>
          <span className="w-1 h-1 rounded-full bg-foreground-300"></span>
          <span className="text-xs text-foreground-500 font-mono">{activeCitizen.cnic}</span>
          <span className="w-1 h-1 rounded-full bg-foreground-300"></span>
          <span className="text-xs text-foreground-500">{activeCitizen.city}, {activeCitizen.province}</span>
        </div>
      )}
    </div>
  );
}