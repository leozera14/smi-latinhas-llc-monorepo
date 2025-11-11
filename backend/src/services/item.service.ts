import { prisma } from "../config/database";
import { CreateItemInput, UpdateItemInput } from "../schemas/item.schema";

export class ItemService {
  async create(data: CreateItemInput) {
    return await prisma.item.create({
      data: {
        sku: data.sku,
        descricao: data.descricao,
      },
    });
  }

  async findAll() {
    return await prisma.item.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number) {
    return await prisma.item.findUnique({
      where: { id },
      include: {
        demandaItems: {
          include: {
            demanda: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateItemInput) {
    return await prisma.item.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await prisma.item.delete({
      where: { id },
    });
  }
}
