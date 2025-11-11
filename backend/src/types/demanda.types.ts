import { FastifyRequest } from "fastify";

// Status Type
export const StatusDemanda = {
  PLANEJAMENTO: "PLANEJAMENTO",
  EM_ANDAMENTO: "EM_ANDAMENTO",
  CONCLUIDO: "CONCLUIDO",
} as const;

export type StatusDemandaType =
  (typeof StatusDemanda)[keyof typeof StatusDemanda];

export const STATUS_DEMANDA_VALUES = Object.values(StatusDemanda) as [
  string,
  ...string[]
];

// Fastify Request Type for Demanda Service
export interface IdParams {
  id: string;
}

export type RequestWithId = FastifyRequest<{ Params: IdParams }>;
