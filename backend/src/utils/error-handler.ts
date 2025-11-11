import { FastifyReply } from "fastify";
import { ZodError } from "zod";
export class ErrorHandler {
  static handleZodError(error: ZodError, reply: FastifyReply) {
    return reply.status(400).send({
      error: "Validation error",
      details: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
        code: issue.code,
      })),
    });
  }

  static handleError(
    error: any,
    reply: FastifyReply,
    resourceName: string = "Resource"
  ) {
    // Zod validation error
    if (error instanceof ZodError) {
      return this.handleZodError(error, reply);
    }

    // Demanda not found
    if (error.code === "P2025") {
      return reply.status(404).send({ error: `${resourceName} not found` });
    }

    // Generic error
    return reply.status(500).send({
      error: "Internal server error",
      message: error.message,
    });
  }
}

export class ValidationHelper {
  static parseId(id: string, reply: FastifyReply): number | null {
    const parsedId = parseInt(id);

    if (isNaN(parsedId) || parsedId <= 0) {
      reply.status(400).send({ error: "Invalid ID format" });

      return null;
    }

    return parsedId;
  }
}
