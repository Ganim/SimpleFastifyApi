import { app } from '@/app';
import { healthCheck } from './check-health';

export function healthRoutes() {
  app.get(
    '/health',
    {
      schema: {
        tags: ['Health'],
        summary: 'Check the health of the API',
        description: 'Returns OK status if the API is working.',
        response: {
          200: {
            description: 'API status',
            type: 'object',
            properties: {
              status: { type: 'string', example: 'OK' },
            },
          },
          500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
              error: { type: 'string', example: 'Internal Server Error' },
            },
          },
        },
      },
    },
    healthCheck,
  );
}
