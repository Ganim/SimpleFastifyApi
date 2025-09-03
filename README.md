# Simple Fastify API Boilerplate

Base para criar rapidamente novas APIs usando Fastify + TypeScript com validação de ambiente, documentação automática (OpenAPI/Swagger), tratamento centralizado de erros e organização de rotas e casos de uso.

## Objetivo
Fornecer uma estrutura mínima porém extensível para acelerar o desenvolvimento de novas APIs, padronizando:
- Organização de pastas
- Padronização de erros e validação
- Documentação automática de endpoints
- Health checks para observabilidade
- Convenções para expansão (use-cases, módulos, etc.)

## Tecnologias & Features
- **Fastify 5**: Servidor HTTP performático
- **TypeScript**: Tipagem estática
- **Zod**: Validação de ambiente e (futuras) entradas/saídas
- **@fastify/swagger & swagger-ui**: Geração dinâmica de OpenAPI em `/docs` e JSON em `/docs/json`
- **Error Handler customizado**: Respostas consistentes (400 validação / 500 server)
- **Aliases de importação**: `@/*` aponta para `src/*`
- **Scripts de build e dev**: Via `tsx` (dev) e `tsup` (build)
- **Lint & Formatting**: ESLint + Prettier integrados

## Estrutura de Pastas
```
.
├── .env
├── .env.example
├── package.json
├── tsconfig.json
├── pnpm-workspace.yaml
├── eslint.config.mjs
├── README.md
├── src
│   ├── app.ts
│   ├── server.ts
│   ├── @env/
│   │   └── index.ts
│   ├── @errors/
│   │   ├── error-handler.ts
│   │   └── use-cases/
│   │       ├── bad-request-error.ts
│   │       ├── forbidden-error.ts
│   │       ├── resource-not-found.ts
│   │       └── unauthorized-error.ts
│   ├── @types/
│   │   └── put-your-types-here.ts
│   ├── config/
│   │   └── put-your-configs-here.ts
│   ├── entities/
│   │   ├── business/
│   │   │   ├── entitie-example.ts
│   │   │   └── value-objects/
│   │   │       └── value-object-example.ts
│   │   └── domain/
│   │       ├── entities.ts
│   │       ├── optional.ts
│   │       └── unique-entity-id.ts
│   ├── http/
│   │   ├── controllers/
│   │   │   ├── health/
│   │   │   │   ├── health-check.controller.ts
│   │   │   │   └── routes.ts
│   │   │   └── put-your-business-controllers-here.ts
│   │   ├── middlewares/
│   │   │   └── put-your-middlewares-here.ts
│   ├── lib/
│   │   └── put-your-libs-here.ts
│   ├── mappers/
│   │   └── put-your-mappers-here.ts
│   ├── repositories/
│   │   ├── in-memory-repository/
│   │   │   └── put-your-in-memory-repository-here.ts
│   │   └── put-your-contracts-here.ts
│   ├── use-cases/
│   │   ├── example/
│   │   │   ├── factories/
│   │   │   │   └── make-use-case-example.ts
│   │   │   └── use-case-example.ts
│   ├── utils/
│   │   └── put-your-utils-here.ts
```

## Endpoints Atuais
| Método | Rota     | Descrição                 |
|--------|----------|---------------------------|
| GET    | /health  | Verifica se a API responde |

Documentação: `GET /docs` (UI) e `GET /docs/json` (OpenAPI JSON).

## Como Iniciar
Pré-requisitos: Node.js 20+

1. Instale dependências:
```bash
pnpm install
```
2. Copie `.env.example` para `.env` e ajuste se necessário:
```bash
cp .env.example .env
```
3. Ambiente de desenvolvimento (watch):
```bash
pnpm dev
```
4. Build de produção:
```bash
pnpm build
```
5. Executar build:
```bash
pnpm start
```

Servidor: http://localhost:3333

## Validação de Ambiente
As variáveis são validadas em `src/env/index.ts` usando Zod. Erros interrompem o start e exibem feedback detalhado.

## Tratamento de Erros
- **ZodError**: 400 + detalhes de validação
- **BadRequestError**: 400 + mensagem
- **Demais erros**: 500 (mensagem exposta apenas fora de produção)

## Convenções para Novos Módulos
1. Criar pasta em `src/http/<domínio>`
2. Definir schemas (Zod) para entrada/saída
3. Adicionar rotas em `routes.ts` registrando dentro de um plugin ou via `app.register`
4. Implementar regras de negócio em `src/use-cases`
5. Adicionar tags no Swagger conforme necessário

## Roadmap Sugerido
- Adicionar rotas `/live` e `/ready`
- Middleware de logging estruturado (pino integrado ao Fastify)
- Testes automatizados (Vitest / Jest)
- Auth (JWT) + camada de contexto de usuário
- Observabilidade (metrics / tracing)

## Scripts
| Script      | Ação                        |
|-------------|-----------------------------|
| pnpm dev    | Executa em modo watch       |
| pnpm build  | Gera artefatos de build     |
| pnpm start  | Roda código compilado       |
| pnpm lint   | Analisa problemas de lint   |

## Autor
Guilherme Ganim

## Licença
ISC – Livre para uso, modificação e distribuição. Consulte o arquivo `LICENSE` (adicionar se necessário).

---
Se quiser, posso gerar já as rotas de readiness/liveness ou adicionar testes básicos. É só pedir.
