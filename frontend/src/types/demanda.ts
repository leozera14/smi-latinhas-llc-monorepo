import { StatusDemanda } from "@/config/constants";
import { Item } from "./item";

export type StatusDemandaType =
  (typeof StatusDemanda)[keyof typeof StatusDemanda];

export interface DemandaItem {
  id: number;
  demandaId: number;
  itemId: number;
  totalPlanejado: number;
  totalProduzido: number;
  item: Item;
}

export interface Demanda {
  id: number;
  dataInicial: string;
  dataFinal: string;
  status: StatusDemandaType;
  createdAt: string;
  updatedAt: string;
  itens: DemandaItem[];
}

export interface CreateDemandaDTO {
  dataInicial: string;
  dataFinal: string;
  status: StatusDemandaType;
  itens: {
    itemId: number;
    totalPlanejado: number;
    totalProduzido?: number;
  }[];
}

export interface UpdateDemandaDTO {
  dataInicial?: string;
  dataFinal?: string;
  status?: StatusDemandaType;
  itens?: {
    id?: number;
    itemId: number;
    totalPlanejado: number;
    totalProduzido: number;
  }[];
}
