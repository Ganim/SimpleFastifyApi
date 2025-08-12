import fastify from 'fastify';
import { healthCheck } from './http/check-health';

export const app = fastify();

app.get('/health', healthCheck);
