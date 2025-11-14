import { prisma } from "../config/database";
import { CreateItemInput, UpdateItemInput } from "../schemas/item.schema";

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export class ItemService {
  async create(data: CreateItemInput) {
    return await prisma.item.create({
      data: {
        sku: data.sku,
        descricao: data.descricao,
      },
    });
  }

  async findAll(params?: PaginationParams) {
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 20;
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.item.findMany({
        skip,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.item.count(),
    ]);

    return {
      data,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
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
