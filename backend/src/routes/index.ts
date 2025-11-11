import { FastifyInstance } from "fastify";
import { demandaRoutes } from "./demanda.routes";
import { itemRoutes } from "./item.routes";

export const routes = [demandaRoutes, itemRoutes];

export async function registerRoutes(fastify: FastifyInstance) {
  for (const route of routes) {
    await fastify.register(route);
  }
}
