import { Student, StudentStatus, ValidityEvaluation } from '../types';

/**
 * Normaliza uma data para meia-noite no fuso local
 */
export function parseLocalDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return new Date(dateStr);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

/**
 * Calcula a quantidade de dias restantes entre a data de referência (hoje) e a data de validade
 */
export function calculateDaysRemaining(validityDateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validityDate = parseLocalDate(validityDateStr);
  const diffTime = validityDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Formata data ISO ou YYYY-MM-DD para DD/MM/AAAA
 */
export function formatDateBR(dateStr?: string): string {
  if (!dateStr) return '--/--/----';
  try {
    const d = parseLocalDate(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return dateStr;
  }
}

/**
 * Retorna data atual no formato YYYY-MM-DD
 */
export function getTodayString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Adiciona dias a uma data base e retorna YYYY-MM-DD
 */
export function addDaysToStringDate(dateStr: string, days: number): string {
  const d = parseLocalDate(dateStr);
  d.setDate(d.getDate() + days);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Avalia as regras de negócio de validade e autorização do membro/carteirinha:
 * 4.1: O titular só pode acessar os benefícios se status for 'Ativo' e a validade não tiver expirado.
 * 4.2:
 *  - Mais de 30 dias restantes: situação normal
 *  - Entre 8 e 30 dias restantes: "Atenção: acesso próximo do vencimento"
 *  - Entre 1 e 7 dias restantes: "Atenção: acesso vence em breve"
 *  - Data vencida: "Acesso vencido"
 */
export function evaluateStudentValidity(student: Student): ValidityEvaluation {
  const days = calculateDaysRemaining(student.dataValidade);
  const isExpiredByDate = days < 0;

  // Determinar status level visual de validade
  let statusLevel: ValidityEvaluation['statusLevel'] = 'normal';
  let label = 'Acesso ativo e regular';

  if (isExpiredByDate || student.status === 'Vencido') {
    statusLevel = 'expired';
    label = 'Acesso vencido';
  } else if (days <= 7) {
    statusLevel = 'attention_urgent';
    label = 'Atenção: acesso vence em breve';
  } else if (days <= 30) {
    statusLevel = 'attention_medium';
    label = 'Atenção: acesso próximo do vencimento';
  } else {
    statusLevel = 'normal';
    label = 'Acesso regular';
  }

  // Regra de autorização
  const isStatusAtivo = student.status === 'Ativo';
  const isAuthorized = isStatusAtivo && !isExpiredByDate;

  let detailedMessage = '';
  if (!isAuthorized) {
    if (student.status === 'Vencido' || isExpiredByDate) {
      detailedMessage = 'Seu período de acesso ao Clube de Benefícios expirou.';
    } else if (student.status === 'Inadimplente') {
      detailedMessage = 'Identificamos uma pendência cadastral ou financeira em sua matrícula.';
    } else if (student.status === 'Inativo') {
      detailedMessage = 'Seu cadastro de membro encontra-se inativo no sistema.';
    } else if (student.status === 'Bloqueado') {
      detailedMessage = 'Seu acesso foi preventivamente bloqueado pela administração do clube.';
    }
  }

  return {
    isAuthorized,
    isExpired: isExpiredByDate,
    daysRemaining: days,
    statusLevel,
    label,
    detailedMessage,
    status: student.status,
  };
}
