import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { errorHandler } from './@errors/error-handler';
import { healthRoutes } from './http/controllers/health/routes';

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Error Handler
app.setErrorHandler(errorHandler);

// Swagger
app.register(swagger, {
  mode: 'dynamic',
  openapi: {
    info: {
      title: 'A Simple fastify API',
      description: 'A Simple fastify API example',
      version: '2.0.0',
    },
    tags: [{ name: 'Health', description: 'Health check endpoints' }],
  },
});

// Routes
app.after(() => {
  app.register(healthRoutes);
});

// Swagger UI
const swaggerTheme = new SwaggerTheme();
const theme = swaggerTheme.getBuffer(SwaggerThemeNameEnum.FLATTOP);

app.register(swaggerUI, {
  routePrefix: '/docs',
  staticCSP: true,
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
    displayRequestDuration: true,
    operationsSorter: 'method',
  },
  theme: {
    css: [{ filename: 'theme.css', content: theme }],
  },
});
