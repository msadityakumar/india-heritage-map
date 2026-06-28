import Fastify from "fastify";
import cors from "@fastify/cors";
import monumentRoutes from "./routes/monuments.js";

const server = Fastify({ logger: true });

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

await server.register(cors, { origin: allowedOrigins });
await server.register(monumentRoutes, { prefix: "/api" });
await server.listen({
  port: Number(process.env.PORT ?? 3000),
  host: process.env.PORT ? "0.0.0.0" : "127.0.0.1",
});
