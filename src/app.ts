import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fastify from 'fastify';
import { healthRoutes } from './http/health/routes';

export const app = fastify();

// Habilitar o swagger
app.register(swagger, {
  mode: 'dynamic',
  openapi: {
    info: {
      title: 'Firebase Auth API',
      description: 'API for Firebase Authentication',
      version: '1.0.0',
    },
    tags: [
      { name: 'Health', description: 'Endpoints de verificação de saúde' },
    ],
  },
});

// Rotas definidas após o swagger ter anexado hooks (garante captura para paths)
app.after(() => {
  app.register(healthRoutes);
});

app.register(swaggerUI, {
  routePrefix: '/docs',
  staticCSP: true,
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
});
