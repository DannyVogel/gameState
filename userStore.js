import { create } from "zustand";

const useUserStore = create((set) => ({
  isLogged: false,
  UID: "",
  user: "",
  setUser: (user) => set((state) => ({ user: user })),
  setUID: (id) => set((state) => ({ UID: id })),
}));

// const useBearStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }))

export default useUserStore;
