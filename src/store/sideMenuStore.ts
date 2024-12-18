import { create } from "zustand";

type SideMenuState = {
  initial: boolean;
  handleInitial: () => void;
};

export const useSideMenuStore = create<SideMenuState>((set) => ({
  initial: false,
  handleInitial: () => set((state) => ({ initial: !state.initial })),
}));
