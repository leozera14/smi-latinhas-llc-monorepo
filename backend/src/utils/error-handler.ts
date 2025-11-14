import { FastifyReply } from "fastify";
import { ZodError } from "zod";
export class ErrorHandler {
  static handleZodError(error: ZodError, reply: FastifyReply) {
    return reply.status(400).send({
      error: "Erro de validação!",
      details: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
        code: issue.code,
      })),
    });
  }

  static handleError(error: any, reply: FastifyReply, resourceName: string) {
    // Zod validation error
    if (error instanceof ZodError) {
      return this.handleZodError(error, reply);
    }

    // Resource not found
    if (error.code === "P2025") {
      return reply
        .status(404)
        .send({ error: `${resourceName} não encontrada(o).` });
    }

    // Foreign key constraint violation (item is used in demandas)
    if (error.code === "P2003") {
      return reply.status(400).send({
        error: "Não é possível excluir este item.",
        message:
          "Este item está sendo utilizado em uma ou mais demandas. Remova o item das demandas antes de excluí-lo.",
      });
    }

    // Generic error
    return reply.status(500).send({
      error: "Erro interno do servidor...",
      message: error.message,
    });
  }
}

export class ValidationHelper {
  static parseId(id: string, reply: FastifyReply): number | null {
    const parsedId = parseInt(id);

    if (isNaN(parsedId) || parsedId <= 0) {
      reply.status(400).send({ error: "Formato de ID invalido." });

      return null;
    }

    return parsedId;
  }
}
