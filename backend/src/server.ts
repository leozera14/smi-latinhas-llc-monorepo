import Fastify from "fastify";
import cors from "@fastify/cors";
import { registerRoutes } from "./routes";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

fastify.get("/health", async (req, res) => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

registerRoutes(fastify);

const startServer = async () => {
  try {
    await fastify.listen({ port: 3333 });
    console.log("🚀 Servidor rodando em http://localhost:3333");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

startServer();
