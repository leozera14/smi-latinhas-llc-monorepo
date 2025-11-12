import { create } from "zustand";

interface ConfirmationModalDataProps {
  title: string;
  description?: string;
  onConfirm: () => void;
}

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

  // Confirmation Modal
  isConfirmModalOpen: boolean;
  confirmModalData: ConfirmationModalDataProps | null;
  openConfirmModal: (data: ConfirmationModalDataProps) => void;
  closeConfirmModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Siderbar - starts closed on mobile, opened on desktop
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  openSidebar: () => set({ isSidebarOpen: true }),

  // Create Demanda Modal
  isDemandaModalOpen: false,
  openDemandaModal: () => set({ isDemandaModalOpen: true }),
  closeDemandaModal: () => set({ isDemandaModalOpen: false }),

  // Confirmation Modal
  isConfirmModalOpen: false,
  confirmModalData: null,
  openConfirmModal: (data) =>
    set({ isConfirmModalOpen: true, confirmModalData: data }),
  closeConfirmModal: () =>
    set({ isConfirmModalOpen: false, confirmModalData: null }),
}));
