import { Student, StudentStatus } from '../types';
import { getTodayString } from '../utils/dateUtils';
import { firestoreSyncService } from './firestoreSyncService';
import { STORAGE_KEYS, seedService } from './seedService';
import { storageService } from './storageService';

export interface StudentFormData {
  nome: string;
  matricula: string;
  email: string;
  telefone: string;
  senha?: string;
  instituicao: string;
  curso: string;
  dataInicio: string;
  dataValidade: string;
  status: StudentStatus;
  fotoUrl?: string;
}

export const studentService = {
  getAll(): Student[] {
    seedService.initializeIfNeeded();
    let list = storageService.getItem<Student[]>(STORAGE_KEYS.STUDENTS, []);
    if (!list || list.length === 0) {
      const legacy = storageService.getItem<Student[]>('clube_beneficios_membros_legado', []);
      if (legacy && legacy.length > 0) {
        list = legacy;
        storageService.setItem(STORAGE_KEYS.STUDENTS, list);
      }
    }
    return list;
  },

  getById(id: string): Student | null {
    const list = this.getAll();
    return list.find((s) => s.id === id) || null;
  },

  getByMatricula(matricula: string): Student | null {
    const list = this.getAll();
    const clean = matricula.trim().toLowerCase();
    return list.find((s) => s.matricula.trim().toLowerCase() === clean) || null;
  },

  create(data: StudentFormData): { success: boolean; error?: string; student?: Student } {
    seedService.initializeIfNeeded();
    const list = this.getAll();

    // Validações
    if (!data.nome?.trim()) {
      return { success: false, error: 'O nome completo é obrigatório.' };
    }
    if (!data.matricula?.trim()) {
      return { success: false, error: 'O número de matrícula é obrigatório.' };
    }
    if (!data.senha?.trim()) {
      return { success: false, error: 'A senha de acesso ou PIN é obrigatória no cadastro.' };
    }
    if (!data.dataValidade?.trim()) {
      return { success: false, error: 'A data de validade é obrigatória.' };
    }

    const matriculaTrim = data.matricula.trim();
    const exists = list.some((s) => s.matricula.trim().toLowerCase() === matriculaTrim.toLowerCase());
    if (exists) {
      return { success: false, error: `Já existe um cadastro com a matrícula ${matriculaTrim}.` };
    }

    const today = getTodayString();
    const newStudent: Student = {
      id: `student-${Date.now()}`,
      nome: data.nome.trim(),
      matricula: matriculaTrim,
      email: data.email?.trim() || '',
      telefone: data.telefone?.trim() || '',
      senha: data.senha.trim(),
      instituicao: data.instituicao?.trim() || 'Centro Universitário Metropolitano',
      curso: data.curso?.trim() || 'Graduação',
      dataInicio: data.dataInicio || today,
      dataValidade: data.dataValidade,
      status: data.status || 'Ativo',
      fotoUrl: data.fotoUrl?.trim() || undefined,
      dataCriacao: today,
      dataAtualizacao: today,
    };

    list.unshift(newStudent);
    storageService.setItem<Student[]>(STORAGE_KEYS.STUDENTS, list);
    firestoreSyncService.saveStudent(newStudent);
    return { success: true, student: newStudent };
  },

  update(id: string, data: Partial<StudentFormData>): { success: boolean; error?: string; student?: Student } {
    const list = this.getAll();
    const index = list.findIndex((s) => s.id === id);
    if (index === -1) {
      return { success: false, error: 'Membro não encontrado.' };
    }

    const current = list[index];

    // Se alterou a matrícula, validar duplicidade
    if (data.matricula && data.matricula.trim().toLowerCase() !== current.matricula.trim().toLowerCase()) {
      const matriculaTrim = data.matricula.trim();
      const duplicate = list.some(
        (s) => s.id !== id && s.matricula.trim().toLowerCase() === matriculaTrim.toLowerCase()
      );
      if (duplicate) {
        return { success: false, error: `A matrícula ${matriculaTrim} já pertence a outro cadastro.` };
      }
    }

    const updatedStudent: Student = {
      ...current,
      nome: data.nome !== undefined ? data.nome.trim() : current.nome,
      matricula: data.matricula !== undefined ? data.matricula.trim() : current.matricula,
      email: data.email !== undefined ? data.email.trim() : current.email,
      telefone: data.telefone !== undefined ? data.telefone.trim() : current.telefone,
      senha: data.senha && data.senha.trim() ? data.senha.trim() : current.senha,
      instituicao: data.instituicao !== undefined ? data.instituicao.trim() : current.instituicao,
      curso: data.curso !== undefined ? data.curso.trim() : current.curso,
      dataInicio: data.dataInicio || current.dataInicio,
      dataValidade: data.dataValidade || current.dataValidade,
      status: data.status || current.status,
      fotoUrl: data.fotoUrl !== undefined ? data.fotoUrl : current.fotoUrl,
      dataAtualizacao: getTodayString(),
    };

    list[index] = updatedStudent;
    storageService.setItem<Student[]>(STORAGE_KEYS.STUDENTS, list);
    firestoreSyncService.saveStudent(updatedStudent);
    return { success: true, student: updatedStudent };
  },

  delete(id: string, matricula?: string): boolean {
    const list = this.getAll();
    const cleanId = String(id).trim();
    const cleanMatricula = matricula ? String(matricula).trim() : '';

    const targetStudent = list.find(s => String(s.id).trim() === cleanId || (cleanMatricula && String(s.matricula).trim() === cleanMatricula));

    const filtered = list.filter((s) => {
      const sId = String(s.id).trim();
      const sMat = String(s.matricula).trim();
      if (sId === cleanId) return false;
      if (cleanMatricula && sMat === cleanMatricula) return false;
      if (sMat === cleanId) return false;
      return true;
    });

    if (filtered.length === list.length) return false;
    storageService.setItem<Student[]>(STORAGE_KEYS.STUDENTS, filtered);
    if (targetStudent) {
      firestoreSyncService.deleteStudent(targetStudent.id);
    } else {
      firestoreSyncService.deleteStudent(cleanId);
    }
    return true;
  },

  updateValidityDate(id: string, newDate: string): boolean {
    const res = this.update(id, { dataValidade: newDate });
    return res.success;
  },

  updateStatus(id: string, newStatus: StudentStatus): boolean {
    const res = this.update(id, { status: newStatus });
    return res.success;
  },

  replaceAll(students: Student[]): void {
    storageService.setItem<Student[]>(STORAGE_KEYS.STUDENTS, students);
  },

  bulkUpsert(newStudents: Student[]): { added: number; updated: number; total: number } {
    seedService.initializeIfNeeded();
    const current = this.getAll();
    const map = new Map<string, Student>();

    // Indexar existentes por matrícula (case insensitive) e por ID
    current.forEach((st) => {
      map.set(st.matricula.trim().toLowerCase(), st);
    });

    let added = 0;
    let updated = 0;

    newStudents.forEach((incoming) => {
      const matKey = incoming.matricula.trim().toLowerCase();
      if (map.has(matKey)) {
        const existing = map.get(matKey)!;
        map.set(matKey, {
          ...existing,
          ...incoming,
          id: existing.id,
          matricula: incoming.matricula.trim(),
          dataAtualizacao: getTodayString(),
        });
        updated++;
      } else {
        map.set(matKey, incoming);
        added++;
      }
    });

    const finalStudents = Array.from(map.values());
    storageService.setItem<Student[]>(STORAGE_KEYS.STUDENTS, finalStudents);
    firestoreSyncService.importBatch({ students: finalStudents });

    return { added, updated, total: finalStudents.length };
  },
};
