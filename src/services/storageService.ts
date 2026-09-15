/**
 * storageService
 * Gerenciamento centralizado de persistência no localStorage
 * Garante fallback em memória com total compatibilidade para todos os navegadores,
 * incluindo Safari (modo anônimo), Firefox, Chrome, Edge e WebViews embutidas.
 */

const memoryFallback: Record<string, string> = {};

let storageAvailableChecked = false;
let storageAvailable = false;

function canUseLocalStorage(): boolean {
  if (storageAvailableChecked) {
    return storageAvailable;
  }
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      storageAvailable = false;
    } else {
      const testKey = '__storage_test_key__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      storageAvailable = true;
    }
  } catch {
    // Safari Modo Privado, políticas de cookies restritas ou sandboxing
    storageAvailable = false;
  }
  storageAvailableChecked = true;
  return storageAvailable;
}

type StorageChangeListener = (key: string) => void;
const changeListeners: Set<StorageChangeListener> = new Set();

function notifyKeyChange(key: string) {
  changeListeners.forEach((listener) => {
    try {
      listener(key);
    } catch (err) {
      console.error('[storageService] Erro no listener de alteração de chave:', err);
    }
  });
}

export const storageService = {
  isAvailable(): boolean {
    return canUseLocalStorage();
  },

  onKeyChange(listener: StorageChangeListener): () => void {
    changeListeners.add(listener);
    return () => {
      changeListeners.delete(listener);
    };
  },

  getItem<T>(key: string, defaultValue: T): T {
    try {
      if (!canUseLocalStorage()) {
        const val = memoryFallback[key];
        return val !== undefined ? (JSON.parse(val) as T) : defaultValue;
      }
      const item = window.localStorage.getItem(key);
      if (item === null) {
        const memoryVal = memoryFallback[key];
        return memoryVal !== undefined ? (JSON.parse(memoryVal) as T) : defaultValue;
      }
      return JSON.parse(item) as T;
    } catch {
      const val = memoryFallback[key];
      return val !== undefined ? (JSON.parse(val) as T) : defaultValue;
    }
  },

  setItem<T>(key: string, value: T): boolean {
    const serialized = JSON.stringify(value);
    memoryFallback[key] = serialized;

    let success = true;
    if (canUseLocalStorage()) {
      try {
        window.localStorage.setItem(key, serialized);
      } catch {
        success = false;
      }
    }

    notifyKeyChange(key);
    return success;
  },

  removeItem(key: string): void {
    delete memoryFallback[key];
    if (canUseLocalStorage()) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Ignora silenciosamente erros em ambientes restritos
      }
    }
    notifyKeyChange(key);
  },

  clear(): void {
    for (const k of Object.keys(memoryFallback)) {
      delete memoryFallback[k];
    }
    if (canUseLocalStorage()) {
      try {
        window.localStorage.clear();
      } catch {
        // Ignora silenciosamente erros em ambientes restritos
      }
    }
    notifyKeyChange('*');
  },
};

