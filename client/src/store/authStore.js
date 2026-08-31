  import { create } from 'zustand'

  //Estado global de usuario logueado
export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null })
}))