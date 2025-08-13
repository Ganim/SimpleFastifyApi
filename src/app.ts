import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fastify from 'fastify';
import { errorHandler } from './http/error-handler';
import { healthRoutes } from './http/health/routes';

export const app = fastify();

// Error Handler
app.setErrorHandler(errorHandler);

// Swagger
app.register(swagger, {
  mode: 'dynamic',
  openapi: {
    info: {
      title: 'A Simple fastify API',
      description: 'A Simple fastify API example',
      version: '1.0.0',
    },
    tags: [{ name: 'Health', description: 'Health check endpoints' }],
  },
});

// Routes
app.after(() => {
  app.register(healthRoutes);
});

// Swagger UI
app.register(swaggerUI, {
  routePrefix: '/docs',
  staticCSP: true,
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
});
