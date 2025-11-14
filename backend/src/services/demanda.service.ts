import { prisma } from "../config/database";
import {
  CreateDemandaInput,
  UpdateDemandaInput,
} from "../schemas/demanda.schema";
import { StatusDemandaType } from "../types/demanda.types";
import { StatusValidator } from "../utils/status-validator";

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

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

  async findAll(params?: PaginationParams) {
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 20;
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.demanda.findMany({
        skip,
        take: pageSize,
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
      }),
      prisma.demanda.count(),
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
    if (data.status) {
      const demandaAtual = await prisma.demanda.findUnique({
        where: { id },
        select: { status: true },
      });

      if (!demandaAtual) {
        throw new Error("Demanda não encontrada!");
      }

      StatusValidator.validateTransition(
        demandaAtual.status as StatusDemandaType,
        data.status as StatusDemandaType
      );
    }

    return await prisma.demanda.update({
      where: { id },
      data: {
        dataInicial: data.dataInicial,
        dataFinal: data.dataFinal,
        status: data.status,
        itens: data.itens
          ? {
              deleteMany: {},
              create: data.itens.map((item) => ({
                itemId: item.itemId,
                totalPlanejado: item.totalPlanejado,
                totalProduzido: item.totalProduzido || 0,
              })),
            }
          : undefined,
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

  async delete(id: number) {
    return await prisma.demanda.delete({
      where: { id },
    });
  }
}
