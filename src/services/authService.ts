import { AdminUser, AuthSession, Student } from '../types';
import { STORAGE_KEYS, seedService } from './seedService';
import { storageService } from './storageService';
import { studentService } from './studentService';

/**
 * AVISO ARQUITETURAL:
 * Esta camada de autenticação é exclusiva para demonstração no MVP local (armazenada em localStorage).
 * Não substitui um backend seguro com hash de senhas (bcrypt/argon2), tokens JWT/sessão HTTP-only,
 * proteção contra CSRF/XSS e auditoria real de acessos.
 */

export const authService = {
  loginStudent(matricula: string, senha: string): { success: boolean; error?: string; session?: AuthSession } {
    seedService.initializeIfNeeded();
    if (!matricula?.trim() || !senha?.trim()) {
      return { success: false, error: 'Por favor, preencha sua matrícula e senha de acesso.' };
    }

    const student = studentService.getByMatricula(matricula);

    if (!student) {
      return { success: false, error: 'Matrícula não localizada. Verifique os dígitos e tente novamente.' };
    }

    if (student.senha !== senha.trim()) {
      return { success: false, error: 'Senha incorreta para esta matrícula.' };
    }

    const session: AuthSession = {
      role: 'membro',
      user: student,
      tokenTimestamp: Date.now(),
    };

    storageService.setItem<AuthSession>(STORAGE_KEYS.SESSION, session);
    return { success: true, session };
  },

  loginAdmin(email: string, senha: string): { success: boolean; error?: string; session?: AuthSession } {
    seedService.initializeIfNeeded();
    if (!email?.trim() || !senha?.trim()) {
      return { success: false, error: 'Por favor, informe seu e-mail e senha de administrador.' };
    }

    const emailClean = email.trim().toLowerCase();
    const senhaClean = senha.trim();

    let admins = storageService.getItem<AdminUser[]>(STORAGE_KEYS.ADMINS, []);

    // Se a lista estiver vazia ou não tiver os administradores padrão, reinserir
    if (admins.length === 0) {
      admins = [
        {
          id: 'admin-1',
          nome: 'Coordenação Geral Institucional',
          email: 'admin@instituicao.edu.br',
          senha: 'admin123',
          perfil: 'admin',
          status: 'Ativo',
        },
        {
          id: 'admin-2',
          nome: 'Administrador do Sistema',
          email: 'admin@demo.com',
          senha: 'admin123',
          perfil: 'admin',
          status: 'Ativo',
        },
      ];
      storageService.setItem<AdminUser[]>(STORAGE_KEYS.ADMINS, admins);
    }

    let admin = admins.find(
      (a) =>
        a.email.trim().toLowerCase() === emailClean ||
        (emailClean === 'admin' && a.email.includes('admin'))
    );

    // Suporte direto para as contas institucionais de demonstração
    if (!admin && (emailClean === 'admin@instituicao.edu.br' || emailClean === 'admin@demo.com' || emailClean === 'admin')) {
      admin = {
        id: 'admin-1',
        nome: 'Coordenação Geral Institucional',
        email: emailClean.includes('@') ? emailClean : 'admin@instituicao.edu.br',
        senha: 'admin123',
        perfil: 'admin',
        status: 'Ativo',
      };
      admins.push(admin);
      storageService.setItem<AdminUser[]>(STORAGE_KEYS.ADMINS, admins);
    }

    if (!admin) {
      return { success: false, error: 'E-mail administrativo não cadastrado.' };
    }

    // Aceita a senha cadastrada ou variações comuns de demonstração (admin123 / admin)
    const isPasswordValid =
      admin.senha === senhaClean ||
      (admin.senha === 'admin123' && (senhaClean === 'admin123' || senhaClean === 'admin'));

    if (!isPasswordValid) {
      return { success: false, error: 'Senha de administrador incorreta.' };
    }

    if (admin.status !== 'Ativo') {
      return { success: false, error: 'Este usuário administrativo está inativo no momento.' };
    }

    const session: AuthSession = {
      role: 'admin',
      user: admin,
      tokenTimestamp: Date.now(),
    };

    storageService.setItem<AuthSession>(STORAGE_KEYS.SESSION, session);
    return { success: true, session };
  },

  getCurrentSession(): AuthSession | null {
    seedService.initializeIfNeeded();
    const session = storageService.getItem<AuthSession | null>(STORAGE_KEYS.SESSION, null);
    if (!session || !session.user) return null;

    // Normalizar role caso não seja admin
    if ((session.role as string) !== 'admin') {
      session.role = 'membro';
      storageService.setItem<AuthSession>(STORAGE_KEYS.SESSION, session);
    }

    // Sincronizar dados mais recentes do membro ou admin
    if (session.role === 'membro') {
      const currentStudent = studentService.getById((session.user as Student).id);
      if (!currentStudent) {
        this.logout();
        return null;
      }
      session.user = currentStudent;
    } else if (session.role === 'admin') {
      const admins = storageService.getItem<AdminUser[]>(STORAGE_KEYS.ADMINS, []);
      const currentAdmin = admins.find((a) => a.id === (session.user as AdminUser).id);
      if (!currentAdmin || currentAdmin.status !== 'Ativo') {
        this.logout();
        return null;
      }
      session.user = currentAdmin;
    }

    return session;
  },

  logout(): void {
    storageService.removeItem(STORAGE_KEYS.SESSION);
  },
};
