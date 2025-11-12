import { Item } from "./item";

export enum StatusDemanda {
  PLANEJAMENTO = "PLANEJAMENTO",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDO = "CONCLUIDO",
}

export interface DemandaItem {
  demandaId: number;
  itemSku: string;
  totalPlanejado: number;
  item?: Item;
}

export interface Demanda {
  id: number;
  dataInicio: string;
  dataFim: string;
  status: StatusDemanda;
  createdAt: string;
  updatedAt: string;
  items: DemandaItem[];
}

export interface CreateDemandaDTO {
  dataInicio: string;
  dataFim: string;
  status: StatusDemanda;
  items: {
    itemSku: string;
    totalPlanejado: number;
  }[];
}

export interface UpdateDemandaDTO {
  dataInicio?: string;
  dataFim?: string;
  status?: StatusDemanda;
  items?: {
    itemSku: string;
    totalPlanejado: number;
  }[];
}
