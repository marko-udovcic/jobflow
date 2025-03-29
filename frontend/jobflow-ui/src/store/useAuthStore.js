import { create } from "zustand";

export const useAuthStore = create((set) => ({
  currentUser: {},
  setUser: (user) => set({ currentUser: user }),
}));
