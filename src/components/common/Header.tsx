import React, { useState } from 'react';
import {
  Award,
  ChevronLeft,
  LogOut,
  ShieldCheck,
  FileText,
  Gift,
  CreditCard,
  User,
} from 'lucide-react';
import { AuthSession } from '../../types';
import { SystemManualModal } from './SystemManualModal';

interface HeaderProps {
  session: AuthSession | null;
  onLogout: () => void;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  activeAdminTab?: 'beneficios' | 'carteirinhas';
  onAdminTabChange?: (tab: 'beneficios' | 'carteirinhas') => void;
  activeStudentTab?: 'inicio' | 'cartao' | 'perfil';
  onStudentTabChange?: (tab: 'inicio' | 'cartao' | 'perfil') => void;
}

export const Header: React.FC<HeaderProps> = ({
  session,
  onLogout,
  title,
  showBackButton = false,
  onBack,
  activeAdminTab,
  onAdminTabChange,
  activeStudentTab,
  onStudentTabChange,
}) => {
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  const adminNavItems = [
    { id: 'beneficios' as const, label: 'Cadastrar Benefício', shortLabel: 'Cadastrar Benefício', icon: Gift },
    { id: 'carteirinhas' as const, label: 'Carteirinha Digital', shortLabel: 'Carteirinha Digital', icon: CreditCard },
  ];

  const studentNavItems = [
    { id: 'inicio' as const, label: 'Benefícios', icon: Gift },
    { id: 'cartao' as const, label: 'Carteirinha Digital', icon: CreditCard },
    { id: 'perfil' as const, label: 'Meu Perfil', icon: User },
  ];

  return (
    <header id="main-app-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Barra Superior Principal: Logo e Ações */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Lado Esquerdo: Logo / Voltar */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {showBackButton && onBack && (
              <button
                id="header-back-button"
                onClick={onBack}
                className="p-1.5 sm:p-2 -ml-1 sm:-ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                aria-label="Voltar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 text-white flex items-center justify-center shadow-xs shrink-0">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 leading-tight truncate">
                  {title || 'Clube de Benefícios'}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-slate-500 whitespace-nowrap">
                  <Award className="w-3 h-3 text-emerald-600 shrink-0" /> Vantagens & Descontos Exclusivos
                </span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Manual PDF, Dados do Usuário e Sair */}
          {session && (
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsManualModalOpen(true)}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 rounded-xl transition-colors cursor-pointer shrink-0"
                title="Abrir Manual do Sistema e Especificação das Telas em PDF"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="hidden sm:inline">Manual</span>
                <span>PDF</span>
              </button>

              <div className="hidden md:flex flex-col items-end shrink-0">
                <span className="text-xs font-semibold text-slate-800 max-w-[130px] lg:max-w-[190px] truncate whitespace-nowrap">
                  {session.user.nome}
                </span>
                <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 whitespace-nowrap">
                  {session.role === 'admin' ? (
                    <span className="inline-flex items-center text-blue-700 font-medium">
                      <ShieldCheck className="w-3 h-3 mr-0.5" /> Administrador
                    </span>
                  ) : (
                    `Matrícula: ${(session.user as any).matricula}`
                  )}
                </span>
              </div>

              <button
                id="header-logout-button"
                onClick={onLogout}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-xl transition-colors cursor-pointer shrink-0"
                title="Sair do sistema"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sub-barra de Navegação Admin (Perfeitamente adaptada a mobile, tablet e desktop sem nenhum corte) */}
      {session?.role === 'admin' && onAdminTabChange && (
        <div className="border-t border-slate-200/70 bg-slate-50/80">
          <div className="max-w-6xl mx-auto px-1.5 sm:px-6">
            <nav
              id="admin-navigation-tabs"
              className="grid grid-cols-2 gap-2 py-1.5 sm:flex sm:items-center sm:gap-3 sm:py-2"
            >
              {adminNavItems.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeAdminTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`admin-nav-${tab.id}`}
                    onClick={() => onAdminTabChange(tab.id)}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 px-1 sm:px-3 py-1 sm:py-1.5 rounded-xl transition-all cursor-pointer min-w-0 ${
                      isActive
                        ? 'bg-white text-blue-700 shadow-xs border border-slate-200/90 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium'
                    }`}
                  >
                    <Icon className={`w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="text-[10px] sm:text-xs leading-tight tracking-tight text-center truncate max-w-full">
                      <span className="sm:hidden">{tab.shortLabel}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Sub-barra de Navegação do Membro para Desktop e Tablet */}
      {session?.role === 'membro' && onStudentTabChange && (
        <div className="hidden md:block border-t border-slate-200/70 bg-slate-50/70">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1 sm:gap-2 py-1.5 overflow-x-auto no-scrollbar">
              {studentNavItems.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeStudentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`student-header-${tab.id}`}
                    onClick={() => onStudentTabChange(tab.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-white text-blue-700 shadow-xs border border-slate-200/90 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Modal do Manual do Sistema */}
      <SystemManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />
    </header>
  );
};
