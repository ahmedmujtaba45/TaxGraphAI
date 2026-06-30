import { useState } from 'react';
import ChatSupportModal from './ChatSupportModal';

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
  activeMenu?: string;
}

const menuItems = [
  { icon: 'ri-dashboard-line', label: 'Dashboard', route: '/dashboard' },
  { icon: 'ri-fingerprint-line', label: 'Entity Resolution', route: '/entity-resolution' },
  { icon: 'ri-git-branch-line', label: 'Knowledge Graph', route: '/knowledge-graph' },
  { icon: 'ri-speed-up-line', label: 'Risk Scoring', route: '/risk-scoring' },
  { icon: 'ri-file-text-line', label: 'Audit Reports', route: '/audit-reports' },
  { icon: 'ri-database-2-line', label: 'Data Sources', route: '/data-sources' },
  { icon: 'ri-bar-chart-line', label: 'Analytics', route: '/analytics' },
];

const bottomItems = [
  { icon: 'ri-settings-3-line', label: 'Settings', route: '/settings' },
  { icon: 'ri-question-line', label: 'Help & Support' },
];

export default function Sidebar({ onToggle, activeMenu = 'Dashboard' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const handleToggle = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onToggle?.(newState);
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-primary-950 border-r border-primary-800/40 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      <div className="flex items-center gap-3 px-5 h-16 border-b border-primary-800/40 flex-shrink-0">
        <div className="w-8 h-8 flex items-center justify-center bg-primary-800 rounded-lg flex-shrink-0">
          <i className="ri-government-line text-accent-400 text-base"></i>
        </div>
        {!collapsed && (
          <span className="font-heading text-lg font-bold text-white whitespace-nowrap">
            TaxGraph<span className="text-accent-400">AI</span>
          </span>
        )}
        <button
          onClick={handleToggle}
          className={`ml-auto text-white/30 hover:text-white/60 transition-colors flex-shrink-0 ${
            collapsed ? 'mx-auto ml-0' : ''
          }`}
        >
          <i className={`text-sm ${collapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'}`}></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 sidebar-scroll">
        <p className={`text-white/25 text-xs font-semibold uppercase tracking-wider mb-3 ${collapsed ? 'sr-only' : 'px-3'}`}>
          Main Menu
        </p>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = item.label === activeMenu;
            return (
            <a
              key={item.label}
              href={item.route}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group whitespace-nowrap ${
                isActive
                  ? 'bg-accent-500/15 text-accent-400'
                  : 'text-white/55 hover:text-white hover:bg-primary-800/50'
              }`}
            >
              <i className={`${item.icon} text-base flex-shrink-0 ${isActive ? 'text-accent-400' : ''}`}></i>
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-400"></span>
              )}
            </a>
            );
          })}
        </nav>
      </div>

      <div className="px-3 py-4 border-t border-primary-800/40 flex-shrink-0">
        <nav className="flex flex-col gap-1">
          {bottomItems.map((item) => {
            if (item.label === 'Help & Support') {
              return (
                <button
                  key={item.label}
                  onClick={() => setHelpOpen(!helpOpen)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer w-full text-left ${
                    helpOpen
                      ? 'text-accent-400 bg-accent-500/10'
                      : 'text-white/40 hover:text-white/70 hover:bg-primary-800/50'
                  }`}
                >
                  <i className={`${item.icon} text-base flex-shrink-0`}></i>
                  {!collapsed && <span>{item.label}</span>}
                </button>
              );
            }
            return (
              <a
                key={item.label}
                href={item.route || '#'}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-white/70 hover:bg-primary-800/50 transition-all duration-200 whitespace-nowrap"
              >
                <i className={`${item.icon} text-base flex-shrink-0`}></i>
                {!collapsed && <span>{item.label}</span>}
              </a>
            );
          })}
        </nav>

        {helpOpen && !collapsed && (
          <div className="mt-2 mx-1 p-4 rounded-xl bg-primary-800/40 border border-primary-700/30">
            <p className="text-white/80 text-xs font-semibold mb-3">Need Assistance?</p>
            <div className="space-y-2.5">
              <a href="/knowledge-base" className="flex items-center gap-2.5 text-white/50 hover:text-white/80 transition-colors text-xs group">
                <div className="w-7 h-7 rounded-lg bg-primary-700/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-700 transition-colors">
                  <i className="ri-book-open-line text-white/60 text-xs"></i>
                </div>
                <span>Knowledge Base</span>
              </a>
              <a href="/video-tutorials" className="flex items-center gap-2.5 text-white/50 hover:text-white/80 transition-colors text-xs group">
                <div className="w-7 h-7 rounded-lg bg-primary-700/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-700 transition-colors">
                  <i className="ri-video-line text-white/60 text-xs"></i>
                </div>
                <span>Video Tutorials</span>
              </a>
              <button onClick={() => setChatOpen(true)} className="flex items-center gap-2.5 text-white/50 hover:text-white/80 transition-colors text-xs group cursor-pointer w-full text-left bg-transparent border-0 p-0">
                <div className="w-7 h-7 rounded-lg bg-primary-700/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-700 transition-colors">
                  <i className="ri-chat-3-line text-white/60 text-xs"></i>
                </div>
                <span>Live Chat Support</span>
              </button>
              <div className="pt-2 border-t border-primary-700/30">
                <p className="text-white/30 text-[10px]">Available Mon-Fri, 9AM-5PM PKT</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="px-4 py-3 border-t border-primary-800/40 flex-shrink-0">
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-primary-800/40">
            <div className="w-9 h-9 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
              <i className="ri-shield-check-line text-accent-400 text-sm"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/90 text-xs font-semibold truncate">System Active</p>
              <p className="text-accent-400 text-xs">All engines running</p>
            </div>
          </div>
          <p className="text-white/60 text-[10px] text-center mt-3">
            Developed by TriTech Masters | BS SE
          </p>
        </div>
      )}
      {collapsed && (
        <div className="px-1 py-3 border-t border-primary-800/40 flex-shrink-0">
          <p className="text-white/40 text-[9px] text-center leading-tight">
            TriTech
          </p>
        </div>
      )}
      {chatOpen && (
        <ChatSupportModal onClose={() => setChatOpen(false)} />
      )}
    </aside>
  );
}