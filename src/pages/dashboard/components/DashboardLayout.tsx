import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeMenu: string;
}

export default function DashboardLayout({ children, activeMenu }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background-100">
      <Sidebar activeMenu={activeMenu} onToggle={setSidebarCollapsed} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'}`}>
        <TopBar />
        <main className="p-5 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}