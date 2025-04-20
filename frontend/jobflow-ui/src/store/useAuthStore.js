import { create } from "zustand";

export const useAuthStore = create((set) => ({
  currentUser: null,
  isLoading: false,
  setUser: (user) =>
    set((state) => {
      if (JSON.stringify(state.currentUser) !== JSON.stringify(user)) {
        return { currentUser: user, isLoading: false, isLoggedOut: user === undefined };
      }
      return state;
    }),
  setLoading: (loading) => set({ isLoading: loading }),
  setLoggedOut: (loggedOut) => set({ isLoggedOut: loggedOut }),
}));
