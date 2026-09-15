import React from 'react';
import {
  Calendar,
  CreditCard,
  GraduationCap,
  Info,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react';
import { Student } from '../../types';
import { evaluateStudentValidity, formatDateBR } from '../../utils/dateUtils';

interface StudentProfileProps {
  student: Student;
  onLogout: () => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ student, onLogout }) => {
  const validity = evaluateStudentValidity(student);

  return (
    <div className="space-y-6 pb-12">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Meu Perfil
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Confira seus dados cadastrais vinculados à instituição de ensino.
        </p>
      </div>

      {/* Cartão de Resumo do Membro */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="relative">
          {student.fotoUrl ? (
            <img
              src={student.fotoUrl}
              alt={student.nome}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-blue-100 shadow-sm"
            />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-2xl border-2 border-blue-100">
              <User className="w-10 h-10" />
            </div>
          )}
          <span
            className={`absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border-2 border-white shadow-xs ${
              validity.isAuthorized ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
            }`}
          >
            {student.status}
          </span>
        </div>

        <div className="text-center sm:text-left flex-1 min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight truncate">
            {student.nome}
          </h2>
          <p className="text-xs text-blue-600 font-semibold mt-0.5">{student.curso}</p>
          <p className="text-xs text-slate-500 mt-0.5">{student.instituicao}</p>

          <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-xl bg-slate-100 font-mono font-medium text-slate-700">
              Matrícula: {student.matricula}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-blue-50 font-medium text-blue-700">
              Vigência: {formatDateBR(student.dataValidade)}
            </span>
          </div>
        </div>
      </div>

      {/* Lista de Campos Cadastrais (Somente Leitura) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
        <div className="p-4 sm:p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Nome Completo
            </span>
            <span className="text-sm font-semibold text-slate-800 truncate block">
              {student.nome}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <CreditCard className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Número de Matrícula
            </span>
            <span className="text-sm font-semibold font-mono text-slate-800 truncate block">
              {student.matricula}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              E-mail Institucional
            </span>
            <span className="text-sm font-semibold text-slate-800 truncate block">
              {student.email || 'Não informado'}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Telefone / WhatsApp
            </span>
            <span className="text-sm font-semibold text-slate-800 truncate block">
              {student.telefone || 'Não informado'}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Instituição & Curso
            </span>
            <span className="text-sm font-semibold text-slate-800 block break-words">
              {student.curso} — {student.instituicao}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Data de Início & Validade do Acesso
            </span>
            <span className="text-sm font-semibold text-slate-800 block break-words">
              Início em {formatDateBR(student.dataInicio)} • Validade até {formatDateBR(student.dataValidade)}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Status do Cadastro
            </span>
            <span className="text-sm font-semibold text-slate-800 truncate block">
              {student.status} ({validity.label})
            </span>
          </div>
        </div>
      </div>

      {/* Nota informativa de somente leitura */}
      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <span>
          Nesta versão do aplicativo, as informações cadastrais e o status de matrícula são atualizados diretamente pela secretaria e administração da instituição de ensino.
        </span>
      </div>

      {/* Botão Sair */}
      <div>
        <button
          id="btn-profile-logout"
          type="button"
          onClick={onLogout}
          className="w-full py-3.5 px-4 rounded-2xl border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Desconectar da conta
        </button>
      </div>
    </div>
  );
};
