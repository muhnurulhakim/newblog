import { create } from 'zustand';
import CryptoJS from 'crypto-js';
import { AuthState } from '../types';

const STORAGE_KEY = 'blog-users';
const SECRET_KEY = 'your-secret-key-2024';

const defaultUser = {
  email: 'muina@duck.com',
  password: CryptoJS.AES.encrypt('balonku123', SECRET_KEY).toString(),
  name: 'Muina Admin'
};

// Initialize localStorage with default user if empty
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultUser]));
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const user = users.find((u: any) => u.email === email);
    
    if (user) {
      const decryptedPassword = CryptoJS.AES.decrypt(user.password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      if (password === decryptedPassword) {
        set({ isAuthenticated: true, user });
        return true;
      }
    }
    return false;
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));