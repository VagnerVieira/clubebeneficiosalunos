import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  ExternalLink,
  GraduationCap,
  Maximize2,
  QrCode,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  X,
  Printer,
  Check,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { firestoreSyncService } from '../../services/firestoreSyncService';
import { studentService } from '../../services/studentService';
import { Student } from '../../types';
import { calculateDaysRemaining, evaluateStudentValidity, formatDateBR } from '../../utils/dateUtils';
import { StudentCard } from '../student/StudentCard';

export const AdminCardsView: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(() => studentService.getAll());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  useEffect(() => {
    const unsubscribe = firestoreSyncService.subscribe(() => {
      const list = studentService.getAll();
      setStudents(list);
      setSelectedStudent((prev) => {
        if (!prev) return list[0] || null;
        return list.find((s) => s.id === prev.id) || list[0] || null;
      });
    });
    return () => unsubscribe();
  }, []);

  // Membro atualmente selecionado para visualização da carteirinha
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(() => {
    const list = studentService.getAll();
    return list.find((s) => s.status === 'Ativo') || list[0] || null;
  });

  // Modal de Simulação de Validação do Estabelecimento
  const [validationMatricula, setValidationMatricula] = useState('');
  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    student?: Student;
    validity?: ReturnType<typeof evaluateStudentValidity>;
  } | null>(null);

  // Filtragem da lista de carteirinhas
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        student.nome.toLowerCase().includes(term) ||
        student.matricula.toLowerCase().includes(term) ||
        student.curso.toLowerCase().includes(term);

      if (!matchesSearch) return false;

      if (statusFilter === 'Validas') {
        const days = calculateDaysRemaining(student.dataValidade);
        return student.status === 'Ativo' && days >= 0;
      }
      if (statusFilter === 'AVencer') {
        const days = calculateDaysRemaining(student.dataValidade);
        return student.status === 'Ativo' && days >= 0 && days <= 30;
      }
      if (statusFilter === 'Vencidas') {
        const days = calculateDaysRemaining(student.dataValidade);
        return student.status === 'Vencido' || days < 0 || student.status !== 'Ativo';
      }

      return true;
    });
  }, [students, searchTerm, statusFilter]);

  // Estatísticas das carteirinhas emitidas
  const stats = useMemo(() => {
    let valid = 0;
    let nearExpiry = 0;
    let expiredOrBlocked = 0;

    students.forEach((s) => {
      const days = calculateDaysRemaining(s.dataValidade);
      if (s.status === 'Ativo' && days >= 0) {
        valid++;
        if (days <= 30) nearExpiry++;
      } else {
        expiredOrBlocked++;
      }
    });

    return {
      total: students.length,
      valid,
      nearExpiry,
      expiredOrBlocked,
    };
  }, [students]);

  const handleValidateMatricula = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = validationMatricula.trim().toLowerCase();
    if (!clean) return;

    const found = students.find(
      (s) => s.matricula.toLowerCase() === clean || s.nome.toLowerCase().includes(clean)
    );

    if (found) {
      setValidationResult({
        tested: true,
        student: found,
        validity: evaluateStudentValidity(found),
      });
      setSelectedStudent(found);
    } else {
      setValidationResult({
        tested: true,
      });
    }
  };

  const handleQuickValidateStudent = (student: Student) => {
    setValidationMatricula(student.matricula);
    setValidationResult({
      tested: true,
      student,
      validity: evaluateStudentValidity(student),
    });
    setSelectedStudent(student);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Carteirinhas Digitais
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
              Validação Oficial
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Visualize o cartão digital emitido para cada titular, audite status holográficos e valide autenticidade de convênios.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          Imprimir Carteirinha Selecionada
        </button>
      </div>

      {/* 4 Cards de Métricas das Carteirinhas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Carteiras Emitidas</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
          <span className="text-[11px] text-slate-400">Total no clube</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Válidas / Liberadas</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600">{stats.valid}</div>
          <span className="text-[11px] text-emerald-700 font-medium">Acesso a descontos</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">A Vencer (≤ 30 dias)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600">{stats.nearExpiry}</div>
          <span className="text-[11px] text-amber-700">Atenção para renovação</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Vencidas ou Bloqueadas</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-600">{stats.expiredOrBlocked}</div>
          <span className="text-[11px] text-rose-600 font-medium">Descontos suspensos</span>
        </div>
      </div>

      {/* Grid Central: Validador de Carteirinha & Visualizador da Carteira */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lado Esquerdo (7 colunas): Ferramenta de Validação e Lista */}
        <div className="lg:col-span-7 space-y-6">
          {/* Caixa de Validação Rápida (Simulador de Leitura no Atendimento / Caixa) */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-400/30">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white">
                  Validador de Autenticidade da Carteirinha
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-300">
                  Simule a conferência realizada no ponto de atendimento conferindo o QR Code ou Matrícula do membro.
                </p>
              </div>
            </div>

            <form onSubmit={handleValidateMatricula} className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Digite a Matrícula (ex: 2026001) ou Nome do titular..."
                  value={validationMatricula}
                  onChange={(e) => setValidationMatricula(e.target.value)}
                  className="w-full pl-3.5 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Consultar</span>
              </button>
            </form>

            {/* Resultado da Validação */}
            {validationResult && validationResult.tested && (
              <div className="mt-4 pt-4 border-t border-white/15 animate-fade-in">
                {validationResult.student && validationResult.validity ? (
                  <div
                    className={`p-3.5 rounded-2xl border ${
                      validationResult.validity.isAuthorized
                        ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-100'
                        : 'bg-rose-950/70 border-rose-500/50 text-rose-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${
                            validationResult.validity.isAuthorized ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                        >
                          {validationResult.validity.isAuthorized ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <ShieldAlert className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">
                              {validationResult.student.nome}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                validationResult.validity.isAuthorized
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-rose-500 text-white'
                              }`}
                            >
                              {validationResult.validity.isAuthorized ? 'LIBERADO (VÁLIDO)' : 'RECUSADO (EXPIRADO/BLOQUEADO)'}
                            </span>
                          </div>
                          <div className="text-xs text-white/80 mt-0.5">
                            Matrícula: <strong className="font-mono">{validationResult.student.matricula}</strong> • Plano: {validationResult.student.curso}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-white/10 text-[11px] flex flex-wrap items-center justify-between gap-2">
                      <span>{validationResult.validity.detailedMessage}</span>
                      <span className="font-mono text-white/60">
                        Código de Autenticação: #{validationResult.student.id.slice(-6).toUpperCase()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Nenhum membro encontrado com este termo de busca. Verifique a matrícula digitada.</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tabela / Lista de Seleção Rápida de Carteirinhas */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-slate-800">
                Membros com Carteirinha Emitida ({filteredStudents.length})
              </h3>

              {/* Filtros */}
              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Todos">Todos os Status</option>
                  <option value="Validas">Válidas / Liberadas</option>
                  <option value="AVencer">A Vencer (≤ 30 dias)</option>
                  <option value="Vencidas">Vencidas ou Bloqueadas</option>
                </select>
              </div>
            </div>

            {/* Campo de Busca */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrar por nome, matrícula ou plano..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Lista Rápida */}
            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto pr-1">
              {filteredStudents.map((st) => {
                const validity = evaluateStudentValidity(st);
                const isSelected = selectedStudent?.id === st.id;

                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStudent(st)}
                    className={`py-3 px-3 rounded-2xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 border border-blue-200'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {st.fotoUrl ? (
                        <img
                          src={st.fotoUrl}
                          alt={st.nome}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {st.nome}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold shrink-0 ${
                              validity.isAuthorized
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {validity.isAuthorized ? 'VÁLIDA' : st.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          Matrícula: <strong className="font-mono text-slate-700">{st.matricula}</strong> • {st.curso}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickValidateStudent(st);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-blue-700 hover:bg-blue-50 shadow-2xs transition-colors cursor-pointer"
                        title="Simular validação da carteirinha"
                      >
                        Validar
                      </button>
                      <ArrowRight
                        className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-300'}`}
                      />
                    </div>
                  </div>
                );
              })}

              {filteredStudents.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400">
                  Nenhum membro encontrado para este filtro.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lado Direito (5 colunas): Visualizador em Tempo Real da Carteirinha Selecionada */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Pré-visualização Oficial da Carteirinha
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Exibição Mobile
              </span>
            </div>

            {selectedStudent ? (
              <div className="space-y-4">
                {/* Carteirinha Digital Exata */}
                <div className="py-1">
                  <StudentCard student={selectedStudent} />
                </div>

                {/* Detalhes de Segurança e Autenticação */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Organização / Unidade:</span>
                    <strong className="text-slate-900 text-right">{selectedStudent.instituicao}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Validade Oficial:</span>
                    <strong className="text-slate-900 font-mono">
                      {formatDateBR(selectedStudent.dataValidade)} ({calculateDaysRemaining(selectedStudent.dataValidade)} dias)
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Hash de Autenticidade:</span>
                    <strong className="text-slate-900 font-mono">
                      SHA256-{(selectedStudent.matricula + selectedStudent.id).slice(0, 10).toUpperCase()}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickValidateStudent(selectedStudent)}
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Testar Validação da Carteirinha
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                Selecione um titular para pré-visualizar a carteirinha digital.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
