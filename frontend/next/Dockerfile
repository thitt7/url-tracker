# Shared base: Alpine + libc6-compat + workdir
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# One dependency install, reused by builder and development (separate final images)
FROM base AS deps
COPY frontend/next/package.json frontend/next/package-lock.json ./
RUN npm ci

# Production build (standalone)
FROM deps AS builder
ARG ENV_FILE
COPY frontend/next ./
COPY ${ENV_FILE} .env
RUN npm run build

# Dev server in Docker (compose: target development)
FROM deps AS development
ARG ENV_FILE
ARG NODE_ENV_ARG
COPY frontend/next ./
COPY ${ENV_FILE} .env
ENV NODE_ENV=${NODE_ENV_ARG}
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 4000
CMD ["npm", "run", "dev"]

# Production runtime — last stage = default when no --target
FROM base AS runner
ARG NODE_ENV_ARG=production
ENV NODE_ENV=${NODE_ENV_ARG}
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 4000
ENV PORT=4000
ENV DOCKER_ENV=true

CMD HOSTNAME="0.0.0.0" node server.js
