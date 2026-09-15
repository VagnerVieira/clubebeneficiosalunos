import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import { Student, Benefit, AdminUser } from '../types';
import { STORAGE_KEYS, seedService, INITIAL_ADMINS, INITIAL_BENEFITS } from './seedService';
import { storageService } from './storageService';

type SyncListener = () => void;
const listeners = new Set<SyncListener>();

let isInitialized = false;
let isSeeding = false;

function sanitizeForFirestore<T extends Record<string, any>>(obj: T): any {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = sanitizeForFirestore(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

export const firestoreSyncService = {
  subscribe(callback: SyncListener): () => void {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },

  notifyListeners(): void {
    listeners.forEach((cb) => {
      try {
        cb();
      } catch (e) {
        console.error('Error in sync listener callback', e);
      }
    });
  },

  async init(): Promise<void> {
    if (isInitialized) return;
    isInitialized = true;

    try {
      // 1. Ouvinte para Coleção de Membros
      const studentsRef = collection(db, 'students');
      onSnapshot(studentsRef, async (snapshot) => {
        if (snapshot.empty && !isSeeding) {
          await this.seedInitialCloudData();
          return;
        }

        const cloudStudents: Student[] = [];
        snapshot.forEach((docSnap) => {
          cloudStudents.push(docSnap.data() as Student);
        });

        if (cloudStudents.length > 0) {
          storageService.setItem(STORAGE_KEYS.STUDENTS, cloudStudents);
          this.notifyListeners();
        }
      }, (err) => {
        console.warn('Erro ao conectar ao Firestore (membros):', err);
      });

      // 2. Ouvinte para Coleção de Benefícios
      const benefitsRef = collection(db, 'benefits');
      onSnapshot(benefitsRef, (snapshot) => {
        if (!snapshot.empty) {
          const cloudBenefits: Benefit[] = [];
          snapshot.forEach((docSnap) => {
            cloudBenefits.push(docSnap.data() as Benefit);
          });
          storageService.setItem(STORAGE_KEYS.BENEFITS, cloudBenefits);
          this.notifyListeners();
        }
      }, (err) => {
        console.warn('Erro ao conectar ao Firestore (benefícios):', err);
      });

      // 3. Ouvinte para Coleção de Admins
      const adminsRef = collection(db, 'admins');
      onSnapshot(adminsRef, (snapshot) => {
        if (!snapshot.empty) {
          const cloudAdmins: AdminUser[] = [];
          snapshot.forEach((docSnap) => {
            cloudAdmins.push(docSnap.data() as AdminUser);
          });
          storageService.setItem(STORAGE_KEYS.ADMINS, cloudAdmins);
          this.notifyListeners();
        }
      }, (err) => {
        console.warn('Erro ao conectar ao Firestore (admins):', err);
      });

    } catch (e) {
      console.error('Falha ao inicializar sincronização com Firestore:', e);
    }
  },

  async seedInitialCloudData(): Promise<void> {
    if (isSeeding) return;
    isSeeding = true;
    try {
      const batch = writeBatch(db);

      const students = seedService.getFreshInitialStudents();
      students.forEach((st) => {
        const ref = doc(db, 'students', st.id);
        batch.set(ref, sanitizeForFirestore(st));
      });

      INITIAL_BENEFITS.forEach((ben) => {
        const ref = doc(db, 'benefits', ben.id);
        batch.set(ref, sanitizeForFirestore(ben));
      });

      INITIAL_ADMINS.forEach((adm) => {
        const ref = doc(db, 'admins', adm.id);
        batch.set(ref, sanitizeForFirestore(adm));
      });

      await batch.commit();
      console.log('Dados iniciais sincronizados com a nuvem Firestore com sucesso!');
    } catch (e) {
      console.error('Erro ao semear dados na nuvem:', e);
    } finally {
      isSeeding = false;
    }
  },

  async saveStudent(student: Student): Promise<void> {
    try {
      const ref = doc(db, 'students', student.id);
      await setDoc(ref, sanitizeForFirestore(student), { merge: true });
    } catch (e) {
      console.error('Erro ao salvar membro no Firestore:', e);
    }
  },

  async deleteStudent(studentId: string): Promise<void> {
    try {
      const ref = doc(db, 'students', studentId);
      await deleteDoc(ref);
    } catch (e) {
      console.error('Erro ao excluir membro no Firestore:', e);
    }
  },

  async saveBenefit(benefit: Benefit): Promise<void> {
    try {
      const ref = doc(db, 'benefits', benefit.id);
      await setDoc(ref, sanitizeForFirestore(benefit), { merge: true });
    } catch (e) {
      console.error('Erro ao salvar benefício no Firestore:', e);
    }
  },

  async deleteBenefit(benefitId: string): Promise<void> {
    try {
      const ref = doc(db, 'benefits', benefitId);
      await deleteDoc(ref);
    } catch (e) {
      console.error('Erro ao excluir benefício no Firestore:', e);
    }
  },

  async resetAllToDefaults(): Promise<void> {
    try {
      seedService.resetToDefaults();
      await this.seedInitialCloudData();
      this.notifyListeners();
    } catch (e) {
      console.error('Erro ao restaurar dados na nuvem:', e);
    }
  },

  async importBatch(data: { students?: Student[]; benefits?: Benefit[] }): Promise<void> {
    try {
      const batch = writeBatch(db);

      if (Array.isArray(data.students)) {
        data.students.forEach((st) => {
          const ref = doc(db, 'students', st.id);
          batch.set(ref, sanitizeForFirestore(st));
        });
      }

      if (Array.isArray(data.benefits)) {
        data.benefits.forEach((ben) => {
          const ref = doc(db, 'benefits', ben.id);
          batch.set(ref, sanitizeForFirestore(ben));
        });
      }

      await batch.commit();
      this.notifyListeners();
    } catch (e) {
      console.error('Erro ao importar lote para a nuvem:', e);
    }
  }
};
