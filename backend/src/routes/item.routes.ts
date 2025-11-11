import { FastifyInstance } from "fastify";
import { ItemController } from "../controllers/item.controller";

const itemController = new ItemController();

export async function itemRoutes(fastify: FastifyInstance) {
  // POST ROUTES
  fastify.post("/items", itemController.create.bind(itemController));

  // GET ROUTES
  fastify.get("/items", itemController.findAll.bind(itemController));
  fastify.get("/items/:id", itemController.findById.bind(itemController));

  // PUT ROUTES
  fastify.put("/items/:id", itemController.update.bind(itemController));

  // DELETE ROUTES
  fastify.delete("/items/:id", itemController.delete.bind(itemController));
}
