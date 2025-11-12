import { Item } from "./item";

export enum StatusDemanda {
  PLANEJAMENTO = "PLANEJAMENTO",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDO = "CONCLUIDO",
}

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
  status: StatusDemanda;
  createdAt: string;
  updatedAt: string;
  itens: DemandaItem[];
}

export interface CreateDemandaDTO {
  dataInicial: string;
  dataFinal: string;
  status: StatusDemanda;
  itens: {
    itemId: number;
    totalPlanejado: number;
    totalProduzido?: number;
  }[];
}

export interface UpdateDemandaDTO {
  dataInicial?: string;
  dataFinal?: string;
  status?: StatusDemanda;
  itens?: {
    id?: number;
    itemId: number;
    totalPlanejado: number;
    totalProduzido: number;
  }[];
}
