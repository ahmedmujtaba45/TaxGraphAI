import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import SignOutConfirmModal from './SignOutConfirmModal';
import { citizenProfiles, CitizenProfile } from '@/mocks/citizens';
import { recentAlerts } from '@/mocks/dashboard';

interface UserProfile {
  email: string;
  name: string;
  initials: string;
  role: string;
}

function getUserProfile(): UserProfile {
  try {
    const stored = localStorage.getItem('taxgraph_user');
    if (stored) return JSON.parse(stored) as UserProfile;
  } catch { /* ignore */ }
  return { email: '', name: 'FBR Officer', initials: 'FO', role: 'FBR Officer' };
}

export default function TopBar() {
  const navigate = useNavigate();
  const user = getUserProfile();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CitizenProfile[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [signOutModalOpen, setSignOutModalOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, text: 'High-risk case flagged: Muhammad Asif Khan', time: '5 min ago', type: 'alert' },
    { id: 2, text: 'Monthly compliance report generated', time: '1 hour ago', type: 'info' },
    { id: 3, text: 'New data source connected: Punjab Land Registry', time: '3 hours ago', type: 'success' },
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val.trim().length > 0) {
      const q = val.toLowerCase();
      const results = citizenProfiles.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.cnic.replace(/-/g, '').includes(q.replace(/-/g, '')) ||
          c.city.toLowerCase().includes(q)
      ).slice(0, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectResult = (citizen: CitizenProfile) => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchFocused(false);
    navigate(`/entity-resolution?citizenId=${citizen.id}`);
  };

  const handleSignOut = () => {
    setProfileOpen(false);
    setSignOutModalOpen(false);
    localStorage.removeItem('taxgraph_user');
    navigate('/');
  };

  const handleOpenProfile = () => {
    setProfileOpen(false);
    setProfileModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-background-50 border-b border-background-200/60 flex items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-4 flex-1 max-w-xl" ref={searchRef}>
          <div className="relative flex-1">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search taxpayers, CNIC, or case IDs..."
              className="w-full pl-9 pr-4 py-2.5 bg-background-100 border border-background-200 rounded-lg text-sm text-foreground-800 placeholder:text-foreground-400 focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-foreground-200 text-foreground-500 hover:bg-foreground-300 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xs"></i>
              </button>
            )}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background-50 border border-background-200/70 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-3 py-2 text-xs font-semibold text-foreground-400 uppercase tracking-wider border-b border-background-100">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </div>
                {searchResults.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectResult(c)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-background-100 transition-colors border-b border-background-100 last:border-0 cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                      <span className="text-sm font-bold text-primary-700">
                        {c.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground-900 truncate">{c.name}</span>
                        <span className="text-xs text-foreground-500 font-mono">{c.cnic}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-foreground-400">{c.city}</span>
                        <span className="w-1 h-1 rounded-full bg-foreground-300"></span>
                        <span className="text-xs text-foreground-400">{c.riskLevel}</span>
                      </div>
                    </div>
                    <i className="ri-arrow-right-s-line text-foreground-300 group-hover:text-foreground-600 transition-colors text-sm flex-shrink-0"></i>
                  </button>
                ))}
                <div className="px-4 py-2.5 border-t border-background-100 bg-background-50">
                  <div className="flex items-center gap-1.5 text-xs text-foreground-400">
                    <i className="ri-keyboard-line text-xs"></i>
                    <span>Press</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-background-200 text-foreground-600 font-mono text-[10px]">Enter</kbd>
                    <span>to open full search</span>
                  </div>
                </div>
              </div>
            )}
            {searchFocused && searchQuery && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background-50 border border-background-200/70 rounded-xl shadow-lg overflow-hidden z-50 p-6 text-center">
                <div className="w-10 h-10 mx-auto rounded-xl bg-background-100 flex items-center justify-center mb-3">
                  <i className="ri-user-search-line text-foreground-400 text-lg"></i>
                </div>
                <p className="text-sm text-foreground-500">No results for &quot;{searchQuery}&quot;</p>
                <p className="text-xs text-foreground-400 mt-1">Try searching by name, CNIC or city</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-background-100 transition-colors cursor-pointer group"
              title="Notifications"
            >
              <i className="ri-notification-3-line text-foreground-600 text-xl group-hover:text-foreground-900 transition-colors"></i>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent-500 ring-2 ring-background-50 animate-pulse"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-background-50 border border-background-200 rounded-xl shadow-lg overflow-hidden animate-fade-in-up">
                <div className="px-4 py-3 border-b border-background-200 flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground-900">Notifications</p>
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-background-50 text-xs font-bold">3</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-4 py-3 hover:bg-background-100 transition-colors border-b border-background-100 last:border-0 cursor-pointer group">
                      <div className="flex items-start gap-3">
                        {n.type === 'alert' && (
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-100 flex-shrink-0 group-hover:bg-accent-200 transition-colors">
                            <i className="ri-alert-line text-accent-600 text-sm"></i>
                          </div>
                        )}
                        {n.type === 'info' && (
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                            <i className="ri-information-line text-primary-600 text-sm"></i>
                          </div>
                        )}
                        {n.type === 'success' && (
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-100 flex-shrink-0 group-hover:bg-accent-200 transition-colors">
                            <i className="ri-check-line text-accent-600 text-sm"></i>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground-800 leading-snug group-hover:text-foreground-900 transition-colors">{n.text}</p>
                          <p className="text-xs text-foreground-400 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-background-200 text-center">
                  <a href="#" className="text-xs font-medium text-accent-600 hover:text-accent-700 transition-colors">
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-background-100 transition-colors cursor-pointer"
              title="Account menu"
            >
              <div className="w-8 h-8 rounded-full bg-primary-500/15 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/25 transition-colors">
                <span className="text-primary-700 text-xs font-bold">{user.initials}</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-foreground-900 leading-none">{user.name}</p>
                <p className="text-xs text-foreground-400">{user.role}</p>
              </div>
              <i className={`ri-arrow-down-s-line text-foreground-400 text-sm hidden sm:block transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-background-50 border border-background-200 rounded-xl shadow-lg overflow-hidden animate-fade-in-up">
                <div className="px-5 py-4 border-b border-background-200">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary-500/10 border border-primary-500/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-700 text-sm font-bold">{user.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground-900 truncate">{user.name}</p>
                      <p className="text-xs text-foreground-500 truncate">{user.email}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-50 border border-accent-200/60 text-accent-700 text-[10px] font-bold whitespace-nowrap">
                      <i className="ri-shield-check-line text-[8px]"></i>
                      Active
                    </span>
                  </div>
                </div>

                <div className="px-3 py-2 border-b border-background-100">
                  <div className="flex items-center gap-4 px-2 py-2">
                    <div className="flex-1 text-center">
                      <p className="text-base font-bold text-foreground-900">847</p>
                      <p className="text-[10px] text-foreground-400 uppercase tracking-wider">Cases</p>
                    </div>
                    <div className="w-px h-8 bg-background-200"></div>
                    <div className="flex-1 text-center">
                      <p className="text-base font-bold text-foreground-900">124</p>
                      <p className="text-[10px] text-foreground-400 uppercase tracking-wider">Reports</p>
                    </div>
                    <div className="w-px h-8 bg-background-200"></div>
                    <div className="flex-1 text-center">
                      <p className="text-base font-bold text-accent-600">98.4%</p>
                      <p className="text-[10px] text-foreground-400 uppercase tracking-wider">Accuracy</p>
                    </div>
                  </div>
                </div>

                <div className="py-1.5">
                  <button
                    onClick={handleOpenProfile}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-foreground-700 hover:bg-background-100 transition-colors text-left cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                      <i className="ri-user-settings-line text-primary-600 text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground-900">My Profile</p>
                      <p className="text-xs text-foreground-400">View account details & activity</p>
                    </div>
                    <i className="ri-arrow-right-s-line text-foreground-300 group-hover:text-foreground-600 transition-colors text-sm"></i>
                  </button>
                </div>

                <div className="py-1.5 border-t border-background-100">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      setSignOutModalOpen(true);
                    }}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                      <i className="ri-logout-box-r-line text-rose-500 text-sm"></i>
                    </div>
                    <span className="font-semibold">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {profileModalOpen && (
        <ProfileModal
          user={user}
          onClose={() => setProfileModalOpen(false)}
        />
      )}

      {signOutModalOpen && (
        <SignOutConfirmModal
          userName={user.name}
          onConfirm={handleSignOut}
          onCancel={() => setSignOutModalOpen(false)}
        />
      )}
    </>
  );
}