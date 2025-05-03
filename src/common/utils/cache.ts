export interface CacheObject<T> {
  replace: (obj: T) => T;
  get: () => T | null;
  invalidate: () => void;
  isPresent: () => boolean;
}

const createObjectCacher = <T>(key: string, storageFactory: () => Storage) => {
  const storage = storageFactory();
  return {
    replace: (obj: T) => {
      storage.setItem(key, JSON.stringify(obj));
      return obj;
    },
    get: () => {
      const obj = storage.getItem(key);
      if (!obj) return null;
      try {
        return JSON.parse(obj) as T;
      } catch {
        return obj as T;
      }
    },
    invalidate: () => {
      storage.removeItem(key);
    },
    isPresent: () => storage.getItem(key) != null,
  };
};

export const createCacheInLocalStorage = <T>(key: string) =>
  createObjectCacher<T>(key, () => localStorage);

export const clearCaches = () => {
  localStorage.clear();
  sessionStorage.clear();
};
