import Fastify from "fastify";
import cors from "@fastify/cors";
import { demandaRoutes } from "./routes/demanda.routes";
import { registerRoutes } from "./routes";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
});

fastify.get("/health", async (req, res) => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

registerRoutes(fastify);

const startServer = async () => {
  try {
    await fastify.listen({ port: 3333 });
    console.log("🚀 Server running on http://localhost:3333");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

startServer();
