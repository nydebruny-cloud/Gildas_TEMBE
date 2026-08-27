import React from 'react';
import {
  Menu as MenuIcon,
  LayoutDashboard,
  Database,
  AlertOctagon,
  FileText,
  Users,
} from 'lucide-react';

export type ActiveTab = 'menu' | 'dashboard' | 'tables' | 'alerts' | 'reports' | 'partners';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  alertCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, alertCount }) => {
  const tabs = [
    {
      id: 'menu' as ActiveTab,
      label: 'Menu',
      icon: MenuIcon,
      isMenuSpecial: true,
    },
    {
      id: 'dashboard' as ActiveTab,
      label: 'Tableau de Bord & KPIs',
      icon: LayoutDashboard,
    },
    {
      id: 'tables' as ActiveTab,
      label: 'Les 9 Tables de Référence',
      icon: Database,
    },
    {
      id: 'alerts' as ActiveTab,
      label: 'Alertes & Risques',
      icon: AlertOctagon,
      badge: alertCount > 0 ? alertCount : undefined,
      badgeColor: 'bg-red-500',
    },
    {
      id: 'reports' as ActiveTab,
      label: 'Rapports & Bilans FSE+',
      icon: FileText,
    },
    {
      id: 'partners' as ActiveTab,
      label: 'Partenaires & Employeurs',
      icon: Users,
    },
  ];

  return (
    <nav id="main-navigation" className="bg-white/5 border-b border-white/10 sticky top-[69px] z-40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? tab.isMenuSpecial
                      ? 'bg-[#D4AF37]/20 text-[#F5D77F] border border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/15 backdrop-blur-md'
                      : 'bg-white/15 text-blue-300 border border-blue-500/40 shadow-lg shadow-blue-500/10 backdrop-blur-md'
                    : tab.isMenuSpecial
                    ? 'text-[#F5D77F]/80 hover:text-[#F5D77F] hover:bg-[#D4AF37]/10 border border-[#D4AF37]/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? (tab.isMenuSpecial ? 'text-[#D4AF37]' : 'text-blue-400') : (tab.isMenuSpecial ? 'text-[#D4AF37]/70' : 'text-slate-400')}`} />
                <span>{tab.label}</span>

                {tab.badge !== undefined && (
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-white shadow-sm ${
                      tab.badgeColor || 'bg-red-500'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
