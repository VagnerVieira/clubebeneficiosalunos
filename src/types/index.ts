export type StudentStatus = 'Ativo' | 'Inativo' | 'Inadimplente' | 'Bloqueado' | 'Vencido';

export interface Student {
  id: string;
  nome: string;
  matricula: string;
  email: string;
  telefone: string;
  senha: string; // PIN ou senha local
  instituicao: string;
  curso: string;
  dataInicio: string; // YYYY-MM-DD
  dataValidade: string; // YYYY-MM-DD
  status: StudentStatus;
  fotoUrl?: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface Benefit {
  id: string;
  categoria?: string;
  local?: string;
  titulo: string;
  descricao: string;
  percentualDesconto?: number; // Ex: 15 para 15%
  valorOuCondicao?: string; // Ex: "Compre 1 e leve 2" ou "R$ 20,00 de desconto"
  regrasDeUso: string;
  comoUtilizar?: string;
  codigoCupom?: string;
  destaque?: boolean;
  dataInicio: string; // YYYY-MM-DD
  dataFim?: string; // YYYY-MM-DD opcional
  status: 'Ativo' | 'Inativo';
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface AdminUser {
  id: string;
  nome: string;
  email: string;
  senha: string;
  perfil: 'admin';
  status: 'Ativo' | 'Inativo';
}

export type UserRole = 'membro' | 'admin';

export interface AuthSession {
  role: UserRole;
  user: Student | AdminUser;
  tokenTimestamp: number;
}

export type ValidityStatusLevel = 'normal' | 'attention_medium' | 'attention_urgent' | 'expired';

export interface ValidityEvaluation {
  isAuthorized: boolean;
  isExpired: boolean;
  daysRemaining: number;
  statusLevel: ValidityStatusLevel;
  label: string;
  detailedMessage: string;
  status: StudentStatus;
}
