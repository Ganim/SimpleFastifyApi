import { app } from '@/app';
import { healthCheck } from './check-health';

export function healthRoutes() {
  app.get(
    '/health',
    {
      schema: {
        tags: ['Health'],
        summary: 'Check the health of the API',
        description: 'Retorna status OK se a API estiver funcionando.',
        response: {
          200: {
            description: 'Status da API',
            type: 'object',
            properties: {
              status: { type: 'string', example: 'OK' },
            },
          },
          500: {
            description: 'Erro interno do servidor',
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
