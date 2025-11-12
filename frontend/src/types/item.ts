export interface Item {
  id: number;
  sku: string;
  descricao: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemDTO {
  sku: string;
  descricao: string;
}

export interface UpdateItemDTO {
  sku?: string;
  descricao?: string;
}
