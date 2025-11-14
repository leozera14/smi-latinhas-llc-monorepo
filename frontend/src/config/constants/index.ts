// Demanda's Constants

import { StatusDemandaType } from "@/types/demanda";

export const StatusDemanda = {
  PLANEJAMENTO: "PLANEJAMENTO",
  EM_ANDAMENTO: "EM_ANDAMENTO",
  CONCLUIDO: "CONCLUIDO",
} as const;

export const STATUS_DEMANDA_VALUES = Object.values(StatusDemanda) as [
  StatusDemandaType,
  ...StatusDemandaType[]
];

// Time - MS constants
export const THIRTY_SECONDS_IN_MS = 30 * 1000;
export const THREE_MINUTES_IN_MS = 3 * 60 * 1000;

// Pagination - Page Size
export const DEFAULT_PAGE_SIZE = 20;

// Toast Config
export const TOAST_CONFIG = {
  duration: 4000,
  style: {
    background: "#232120",
    color: "#fff",
    borderRadius: "8px",
    padding: "16px",
    fontSize: "14px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  success: {
    style: {
      background: "#232120",
      color: "#fff",
    },
    iconTheme: {
      primary: "#FF5123",
      secondary: "#fff",
    },
  },
  error: {
    style: {
      background: "#232120",
      color: "#fff",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fff",
    },
  },
  loading: {
    iconTheme: {
      primary: "#FF5123",
      secondary: "#fff",
    },
  },
};
