import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export function getItem<T>(key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}
// Custom MMKV storage adapter for Firebase Auth
export const MMKVPersistence = {
  async setItem(key: string, value: string): Promise<void> {
    storage.set(key, value);
  },
  async getItem(key: string): Promise<string | null> {
    const value = storage.getString(key);
    return value !== undefined ? value : null;
  },
  async removeItem(key: string): Promise<void> {
    storage.delete(key);
  },
};
