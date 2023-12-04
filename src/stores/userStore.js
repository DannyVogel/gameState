import { create } from "zustand";

const useUserStore = create((set) => ({
  isLogged: false,
  UID: "",
  user: "",
  gameList: [],
  setUser: (user) => set((state) => ({ user: user })),
  setUID: (id) => set((state) => ({ UID: id })),
  setLogged: (bool) => set((state) => ({ isLogged: bool })),
  setGameList: (list) => set((state) => ({ gameList: list })),
}));

export default useUserStore;
