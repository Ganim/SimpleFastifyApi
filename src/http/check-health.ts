import type { FastifyReply, FastifyRequest } from "fastify";

export function healthCheck(_: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({ status: "OK" }); 
}
