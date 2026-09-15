import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Award,
  ChevronDown,
  ChevronUp,
  CreditCard,
  GraduationCap,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  FileText,
  Download,
  ExternalLink,
  RotateCcw,
  Upload,
  CheckCircle2,
  Database,
  Cloud,
} from 'lucide-react';
import { authService } from '../../services/authService';
import { firestoreSyncService } from '../../services/firestoreSyncService';
import { seedService, STORAGE_KEYS } from '../../services/seedService';
import { storageService } from '../../services/storageService';
import { studentService } from '../../services/studentService';
import { calculateDaysRemaining } from '../../utils/dateUtils';
import { AuthSession, Student } from '../../types';
import { SystemManualModal } from '../common/SystemManualModal';

interface LoginScreenProps {
  onLoginSuccess: (session: AuthSession) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'membro' | 'admin'>('membro');
  const [matricula, setMatricula] = useState('');
  const [senhaMembro, setSenhaMembro] = useState('');
  const [emailAdmin, setEmailAdmin] = useState('');
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [availableStudents, setAvailableStudents] = useState<Student[]>(() => studentService.getAll());
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshStudentsList = () => {
    setAvailableStudents(studentService.getAll());
  };

  useEffect(() => {
    const unsubscribe = firestoreSyncService.subscribe(() => {
      refreshStudentsList();
    });
    return () => unsubscribe();
  }, []);

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Arquivo não contém um objeto JSON válido.');
        }

        let importedCount = 0;
        if (Array.isArray(parsed.students)) {
          storageService.setItem(STORAGE_KEYS.STUDENTS, parsed.students);
          importedCount += parsed.students.length;
        }
        if (Array.isArray(parsed.benefits)) {
          storageService.setItem(STORAGE_KEYS.BENEFITS, parsed.benefits);
          importedCount += parsed.benefits.length;
        }

        // Sincroniza o lote importado diretamente com a nuvem Firestore
        await firestoreSyncService.importBatch(parsed);

        setSuccessFeedback(`Backup importado e sincronizado na nuvem com sucesso! (${importedCount} registros).`);
        setErrorMessage(null);
        refreshStudentsList();
        setTimeout(() => setSuccessFeedback(null), 4000);
      } catch (err: any) {
        setErrorMessage(`Falha ao importar backup JSON: ${err.message || 'formato inválido'}`);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Erro ao ler arquivo no navegador.');
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const result = await authService.loginStudent(matricula, senhaMembro);
      setIsLoading(false);
      if (result.success && result.session) {
        onLoginSuccess(result.session);
      } else {
        setErrorMessage(result.error || 'Não foi possível realizar o login.');
      }
    } catch {
      setIsLoading(false);
      setErrorMessage('Erro ao autenticar. Verifique sua conexão e tente novamente.');
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = authService.loginAdmin(emailAdmin, senhaAdmin);
      setIsLoading(false);
      if (result.success && result.session) {
        onLoginSuccess(result.session);
      } else {
        setErrorMessage(result.error || 'Não foi possível realizar o login.');
      }
    }, 200);
  };

  const fillAdminCredentials = () => {
    setErrorMessage(null);
    setActiveTab('admin');
    setEmailAdmin('admin@clube.com.br');
    setSenhaAdmin('admin123');
  };

  const fillStudentCredentials = (student: Student) => {
    setErrorMessage(null);
    setActiveTab('membro');
    setMatricula(student.matricula);
    setSenhaMembro(student.senha || '123456');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-blue-50/40 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logotipo e Apresentação */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4 ring-4 ring-blue-100">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Clube de Benefícios
          </h1>
          <p className="mt-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Benefícios exclusivos para membros
          </p>
          <p className="mt-2 text-xs text-slate-500 max-w-xs">
            Descontos especiais em alimentação, esportes, tecnologia, farmácias e muito mais.
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-8 border border-slate-200/70">
          {/* Seletor de Perfil (Membro vs Administrador) */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-6 border border-slate-200/60">
            <button
              id="login-tab-membro"
              type="button"
              onClick={() => {
                setActiveTab('membro');
                setErrorMessage(null);
              }}
              className={`py-2.5 px-3 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'membro'
                  ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              Sou Membro
            </button>
            <button
              id="login-tab-admin"
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setErrorMessage(null);
              }}
              className={`py-2.5 px-3 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Administração
            </button>
          </div>

          {/* Mensagens de Feedback */}
          {successFeedback && (
            <div
              className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2.5 animate-in fade-in duration-150"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successFeedback}</span>
            </div>
          )}

          {errorMessage && (
            <div
              id="login-error-alert"
              className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2.5 animate-in fade-in duration-150"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Input oculto para importação de backup JSON direto na tela de login */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={handleImportJSON}
          />

          {/* Formulário do Membro */}
          {activeTab === 'membro' ? (
            <form id="form-login-membro" onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-matricula" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Número de Matrícula
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <input
                    id="login-matricula"
                    type="text"
                    required
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    placeholder="Ex: 2026001"
                    className="block w-full pl-10 pr-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-senha-membro" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Senha ou PIN
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="login-senha-membro"
                    type="password"
                    required
                    value={senhaMembro}
                    onChange={(e) => setSenhaMembro(e.target.value)}
                    placeholder="Sua senha de acesso"
                    className="block w-full pl-10 pr-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                id="btn-entrar-membro"
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? 'Verificando dados...' : 'Entrar no Clube de Benefícios'}
              </button>
            </form>
          ) : (
            /* Formulário do Administrador */
            <form id="form-login-admin" onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-email-admin" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  E-mail Institucional
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="login-email-admin"
                    type="email"
                    required
                    value={emailAdmin}
                    onChange={(e) => setEmailAdmin(e.target.value)}
                    placeholder="admin@clube.com.br"
                    className="block w-full pl-10 pr-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-senha-admin" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Senha Administrativa
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    id="login-senha-admin"
                    type="password"
                    required
                    value={senhaAdmin}
                    onChange={(e) => setSenhaAdmin(e.target.value)}
                    placeholder="Sua senha de administrador"
                    className="block w-full pl-10 pr-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                id="btn-entrar-admin"
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? 'Acessando painel...' : 'Entrar como Administrador'}
              </button>

              <p className="text-center text-[11px] text-slate-400 pt-1">
                Acesso de teste: <span className="font-semibold text-slate-600">admin@clube.com.br</span> • senha: <span className="font-semibold text-slate-600">admin123</span>
              </p>
            </form>
          )}

          {/* Painel Discreto para Credenciais de Demonstração */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <button
              id="btn-toggle-demo-credentials"
              type="button"
              onClick={() => {
                setShowDemoCredentials(!showDemoCredentials);
                refreshStudentsList();
              }}
              className="w-full flex items-center justify-between text-xs font-medium text-slate-600 hover:text-blue-700 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                Ver credenciais de demonstração (1 clique)
              </span>
              {showDemoCredentials ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showDemoCredentials && (
              <div
                id="demo-credentials-panel"
                className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-2 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Selecione um perfil para preencher automaticamente:
                </div>

                <div className="grid grid-cols-1 gap-1.5 max-h-72 overflow-y-auto pr-0.5">
                  {availableStudents.length > 0 ? (
                    availableStudents.map((st) => {
                      const days = calculateDaysRemaining(st.dataValidade);

                      // Badge visual correspondente ao status real do titular
                      let badgeText = st.status;
                      let badgeStyle = 'bg-emerald-100 text-emerald-800';

                      if (st.status === 'Vencido' || days < 0) {
                        badgeText = days < 0 ? `Expirado (${Math.abs(days)}d)` : 'Vencido';
                        badgeStyle = 'bg-rose-100 text-rose-800';
                      } else if (st.status === 'Inadimplente') {
                        badgeText = 'Inadimplente';
                        badgeStyle = 'bg-purple-100 text-purple-800';
                      } else if (st.status === 'Bloqueado') {
                        badgeText = 'Bloqueado';
                        badgeStyle = 'bg-rose-100 text-rose-800';
                      } else if (st.status === 'Inativo') {
                        badgeText = 'Inativo';
                        badgeStyle = 'bg-slate-100 text-slate-800';
                      } else if (days <= 7) {
                        badgeText = `${days}d (Urgente)`;
                        badgeStyle = 'bg-amber-100 text-amber-800';
                      } else if (days <= 30) {
                        badgeText = `${days}d (Atenção)`;
                        badgeStyle = 'bg-amber-100 text-amber-800';
                      } else {
                        badgeText = 'Ativo (Válido)';
                        badgeStyle = 'bg-emerald-100 text-emerald-800';
                      }

                      return (
                        <button
                          key={st.id || st.matricula}
                          type="button"
                          onClick={() => fillStudentCredentials(st)}
                          className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-colors cursor-pointer"
                        >
                          <div className="min-w-0 pr-2">
                            <span className="font-semibold text-slate-800 block truncate">
                              {st.nome}
                              {st.curso && (
                                <span className="text-slate-400 font-normal text-[11px] ml-1.5">
                                  • {st.curso}
                                </span>
                              )}
                            </span>
                            <span className="text-slate-500 text-[11px] block truncate">
                              Matrícula: <strong className="font-mono text-slate-700">{st.matricula}</strong> • Status: <strong className="text-slate-700">{st.status}</strong>
                              {days >= 0 ? ` (${days}d restantes)` : ` (${Math.abs(days)}d vencido)`}
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeStyle} shrink-0`}>
                            {badgeText}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-2 text-center text-slate-500 text-xs">
                      Nenhum membro cadastrado no momento.
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={fillAdminCredentials}
                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/80 hover:border-slate-400 hover:bg-slate-100 text-left transition-colors cursor-pointer mt-1"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 block">Administração do Clube</span>
                      <span className="text-slate-500 text-[11px]">admin@clube.com.br • admin123</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-800">
                      Admin
                    </span>
                  </button>
                </div>

                <div className="pt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70 mt-2 px-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                    title="Carregar arquivo de backup JSON salvo no computador"
                  >
                    <Upload className="w-3 h-3 text-emerald-600" />
                    Carregar Arquivo JSON
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      await firestoreSyncService.resetAllToDefaults();
                      refreshStudentsList();
                      setSuccessFeedback('Perfis originais restaurados e sincronizados na nuvem!');
                      setTimeout(() => setSuccessFeedback(null), 3000);
                    }}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 cursor-pointer"
                    title="Restaurar os 4 perfis originais na nuvem e local"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Restaurar 4 perfis originais
                  </button>
                </div>
              </div>
            )}

            {/* Botão de Destaque para o Manual do Sistema em PDF */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsManualModalOpen(true)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center gap-2 border border-blue-200/80 transition-all cursor-pointer shadow-2xs"
                title="Abrir o Manual do Sistema interativo com Visualizador de PDF e Telas"
              >
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">Manual do Sistema & Telas (PDF)</span>
              </button>

              <a
                href="/manual-do-sistema.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-slate-200"
                title="Abrir PDF em nova aba do navegador"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="/manual-do-sistema.pdf"
                download="Manual_Clube_de_Beneficios.pdf"
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-emerald-200"
                title="Baixar arquivo PDF (37 KB)"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 font-medium text-[11px]">
            <Cloud className="w-3 h-3 text-emerald-600" />
            Sincronização em Nuvem Ativa (Firestore)
          </span>
        </div>

        {/* Modal Interativo com Especificação das Telas e PDF */}
        <SystemManualModal
          isOpen={isManualModalOpen}
          onClose={() => setIsManualModalOpen(false)}
        />
      </div>
    </div>
  );
};
