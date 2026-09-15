import React from 'react';
import { CreditCard, Gift, User } from 'lucide-react';

export type StudentNavTab = 'inicio' | 'cartao' | 'perfil';

interface StudentBottomNavProps {
  activeTab: StudentNavTab;
  onChangeTab?: (tab: StudentNavTab) => void;
  onTabChange?: (tab: StudentNavTab) => void;
}

export const StudentBottomNav: React.FC<StudentBottomNavProps> = ({
  activeTab,
  onChangeTab,
  onTabChange,
}) => {
  const handleTabSelect = (tabId: StudentNavTab) => {
    if (typeof onChangeTab === 'function') {
      onChangeTab(tabId);
    }
    if (typeof onTabChange === 'function') {
      onTabChange(tabId);
    }
  };

  const tabs = [
    { id: 'inicio' as const, label: 'Benefícios', icon: Gift },
    { id: 'cartao' as const, label: 'Carteirinha', icon: CreditCard },
    { id: 'perfil' as const, label: 'Perfil', icon: User },
  ];

  return (
    <nav
      id="student-bottom-navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`student-nav-${tab.id}`}
                type="button"
                onClick={() => handleTabSelect(tab.id)}
                className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all cursor-pointer ${
                  isActive
                    ? 'text-blue-600 font-semibold scale-105'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.25]' : 'stroke-[1.75]'}`} />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                  )}
                </div>
                <span className="text-[11px] mt-1 tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
