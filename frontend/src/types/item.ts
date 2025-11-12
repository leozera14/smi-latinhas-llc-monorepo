export interface Item {
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
  descricao?: string;
}
