import { BadRequestError } from '@/use-cases/@errors/bad-request-error';
import type { FastifyInstance } from 'fastify';
import { env } from 'process';
import z, { ZodError } from 'zod';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: z.treeifyError(error),
    });
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    });
  }

  console.log('Internal server error:', error);

  return reply.status(500).send({
    message: 'Internal server error',
    errors: env.NODE_ENV !== 'production' ? error.message : undefined,
  });
};
