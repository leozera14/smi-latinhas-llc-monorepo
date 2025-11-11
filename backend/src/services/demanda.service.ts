import { prisma } from "../config/database";
import {
  CreateDemandaInput,
  UpdateDemandaInput,
} from "../schemas/demanda.schema";

export class DemandaService {
  async create(data: CreateDemandaInput) {
    return await prisma.demanda.create({
      data: {
        dataInicial: data.dataInicial,
        dataFinal: data.dataFinal,
        status: data.status,
        itens: {
          create: data.itens.map((item) => ({
            itemId: item.itemId,
            totalPlanejado: item.totalPlanejado,
            totalProduzido: item.totalProduzido,
          })),
        },
      },
      include: {
        itens: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await prisma.demanda.findMany({
      include: {
        itens: {
          include: {
            item: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number) {
    return await prisma.demanda.findUnique({
      where: { id },
      include: {
        itens: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateDemandaInput) {
    const updateData: any = {};

    if (data.dataInicial) updateData.dataInicial = data.dataInicial;
    if (data.dataFinal) updateData.dataFinal = data.dataFinal;
    if (data.status) updateData.status = data.status;

    // If we have items to update
    if (data.itens) {
      // Remove all old items and create new ones
      await prisma.demandaItem.deleteMany({
        where: { demandaId: id },
      });

      updateData.itens = {
        create: data.itens.map((item) => ({
          itemId: item.itemId,
          totalPlanejado: item.totalPlanejado,
          totalProduzido: item.totalProduzido,
        })),
      };
    }

    return await prisma.demanda.update({
      where: { id },
      data: updateData,
      include: {
        itens: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return await prisma.demanda.delete({
      where: { id },
    });
  }
}
