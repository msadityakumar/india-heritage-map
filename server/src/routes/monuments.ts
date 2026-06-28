import type { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface MonumentQuerystring {
  dynasty?: string;
  era?: string;
}

export default async function monumentRoutes(server: FastifyInstance) {
  server.get<{ Querystring: MonumentQuerystring }>("/monuments", async (request) => {
    const { dynasty, era } = request.query;
    return prisma.monument.findMany({
      where: {
        ...(dynasty ? { dynasty: { equals: dynasty, mode: "insensitive" } } : {}),
        ...(era ? { era: { equals: era, mode: "insensitive" } } : {}),
      },
      orderBy: { name: "asc" },
    });
  });

  server.get<{ Params: { id: string } }>("/monuments/:id", async (request, reply) => {
    const monument = await prisma.monument.findUnique({
      where: { id: request.params.id },
    });
    if (!monument) return reply.status(404).send({ error: "Monument not found" });
    return monument;
  });
}
