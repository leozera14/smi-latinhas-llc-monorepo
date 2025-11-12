import { create } from "zustand";

interface UIState {
  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;

  // Create Demanda Modal
  isDemandaModalOpen: boolean;
  openDemandaModal: () => void;
  closeDemandaModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Siderbar - starts closed on mobile, opened on desktop
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  openSidebar: () => set({ isSidebarOpen: true }),

  isDemandaModalOpen: false,
  openDemandaModal: () => set({ isDemandaModalOpen: true }),
  closeDemandaModal: () => set({ isDemandaModalOpen: false }),
}));
