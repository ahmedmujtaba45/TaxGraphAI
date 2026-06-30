import { useState } from 'react';

interface UserProfile {
  email: string;
  name: string;
  initials: string;
  role: string;
}

interface ProfileModalProps {
  user: UserProfile;
  onClose: () => void;
}

const profileStats = {
  casesReviewed: 847,
  reportsGenerated: 124,
  alertsResolved: 56,
  lastLogin: new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
  department: 'Intelligence & Investigation',
  clearanceLevel: 'Top Secret',
  employeeId: 'FBR-2024-0847',
};

export default function ProfileModal({ user, onClose }: ProfileModalProps) {
  const [activeSection, setActiveSection] = useState<'overview' | 'activity'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-background-200 overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 px-6 pt-6 pb-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-lg"></i>
          </button>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-accent-500/20 border-2 border-accent-500/30 flex items-center justify-center mb-4">
              <span className="text-accent-400 text-2xl font-bold">{user.initials}</span>
            </div>
            <h2 className="text-xl font-heading font-bold text-white">{user.name}</h2>
            <p className="text-white/60 text-sm mt-0.5">{user.role}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-500/15 border border-accent-500/25 text-accent-300 text-xs font-semibold">
                <i className="ri-shield-check-line text-[10px]"></i>
                {profileStats.clearanceLevel}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pt-0 -mt-4">
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-background-200/70 shadow-sm">
            {(['overview', 'activity'] as const).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeSection === section
                    ? 'bg-primary-500 text-white'
                    : 'text-foreground-500 hover:text-foreground-700 hover:bg-background-100'
                }`}
              >
                {section === 'overview' ? 'Overview' : 'Activity'}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-5">
          {activeSection === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-background-50 border border-background-200/60">
                  <p className="text-xs text-foreground-400 mb-1">Department</p>
                  <p className="text-sm font-semibold text-foreground-900">{profileStats.department}</p>
                </div>
                <div className="p-3 rounded-xl bg-background-50 border border-background-200/60">
                  <p className="text-xs text-foreground-400 mb-1">Employee ID</p>
                  <p className="text-sm font-semibold text-foreground-900 font-mono">{profileStats.employeeId}</p>
                </div>
                <div className="p-3 rounded-xl bg-background-50 border border-background-200/60">
                  <p className="text-xs text-foreground-400 mb-1">Email</p>
                  <p className="text-sm font-semibold text-foreground-900 truncate">{user.email}</p>
                </div>
                <div className="p-3 rounded-xl bg-background-50 border border-background-200/60">
                  <p className="text-xs text-foreground-400 mb-1">Last Login</p>
                  <p className="text-sm font-semibold text-foreground-900">{profileStats.lastLogin}</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'activity' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-background-50 border border-background-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center">
                    <i className="ri-file-search-line text-primary-600"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground-900">{profileStats.casesReviewed.toLocaleString()}</p>
                    <p className="text-xs text-foreground-400">Cases Reviewed</p>
                  </div>
                </div>
                <span className="text-xs text-accent-600 font-medium">+12% this month</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-background-50 border border-background-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent-100 flex items-center justify-center">
                    <i className="ri-file-chart-line text-accent-600"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground-900">{profileStats.reportsGenerated.toLocaleString()}</p>
                    <p className="text-xs text-foreground-400">Reports Generated</p>
                  </div>
                </div>
                <span className="text-xs text-accent-600 font-medium">+8% this month</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-background-50 border border-background-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary-100 flex items-center justify-center">
                    <i className="ri-alert-line text-secondary-600"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground-900">{profileStats.alertsResolved.toLocaleString()}</p>
                    <p className="text-xs text-foreground-400">Alerts Resolved</p>
                  </div>
                </div>
                <span className="text-xs text-accent-600 font-medium">+23% this month</span>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-background-100 hover:bg-background-200 text-foreground-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}