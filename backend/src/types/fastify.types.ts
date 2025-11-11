import { FastifyRequest } from "fastify";

// Fastify Request Type for Demanda Service
export interface IdParams {
  id: string;
}

export type RequestWithId = FastifyRequest<{ Params: IdParams }>;
