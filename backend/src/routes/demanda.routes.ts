import { FastifyInstance } from "fastify";
import { DemandaController } from "../controllers/demanda.controller";

const demandaController = new DemandaController();

export async function demandaRoutes(fastify: FastifyInstance) {
  // POST ROUTES
  fastify.post("/demandas", demandaController.create.bind(demandaController));

  // GET ROUTES
  fastify.get("/demandas", demandaController.findAll.bind(demandaController));
  fastify.get(
    "/demandas/:id",
    demandaController.findById.bind(demandaController)
  );

  // UPDATE ROUTES
  fastify.put(
    "/demandas/:id",
    demandaController.update.bind(demandaController)
  );

  // DELETE ROUTES
  fastify.delete(
    "/demandas/:id",
    demandaController.delete.bind(demandaController)
  );
}
