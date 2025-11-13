import { create } from "zustand";
import type { Demanda } from "@/types/demanda";

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

  // Create/Edit Demanda Modal
  isDemandaModalOpen: boolean;
  editingDemanda: Demanda | null;
  openDemandaModal: (demanda?: Demanda) => void;
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

  // Create/Edit Demanda Modal
  isDemandaModalOpen: false,
  editingDemanda: null,
  openDemandaModal: (demanda) =>
    set({ isDemandaModalOpen: true, editingDemanda: demanda || null }),
  closeDemandaModal: () =>
    set({ isDemandaModalOpen: false, editingDemanda: null }),

  // Confirmation Modal
  isConfirmModalOpen: false,
  confirmModalData: null,
  openConfirmModal: (data) =>
    set({ isConfirmModalOpen: true, confirmModalData: data }),
  closeConfirmModal: () =>
    set({ isConfirmModalOpen: false, confirmModalData: null }),
}));
