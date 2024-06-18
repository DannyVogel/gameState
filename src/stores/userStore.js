import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      isLogged: false,
      UID: "",
      user: "",
      gameList: [],
      setUser: (user) => set((state) => ({ user: user })),
      setUID: (id) => set((state) => ({ UID: id })),
      setLogged: (bool) => set((state) => ({ isLogged: bool })),
      setGameList: (list) => set((state) => ({ gameList: list })),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
