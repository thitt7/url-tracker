# Stage 2: production image stage
FROM node:18-alpine AS base

# Define build arguments
ARG ENV_FILE
ARG NODE_ENV_ARG

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY frontend/next/package*.json ./

# RUN \
#   if [ -f yarn.lock ]; then yarn install --production; \
#   elif [ -f package-lock.json ]; then npm install --omit-dev; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --prod; \
#   else echo "prod install lockfile not found." && exit 1; \
#   fi

# pnpm install
# RUN npm install -g pnpm
# RUN pnpm install --prod
RUN npm install

# Stage 2: Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/next ./

# Manually copy over env files
COPY ${ENV_FILE} .env

# build project conditionally
# RUN \
#   if [ -f yarn.lock ]; then yarn install --production; \
#   elif [ -f package-lock.json ]; then npm run build; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
#   else echo "Lockfile not found." && exit 1; \
#   fi

# pnpm build
# RUN npm install -g pnpm
# RUN pnpm install --prod
# RUN pnpm run build
RUN npm run build

# Stage 3: Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV ${NODE_ENV_ARG}
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 4000
ENV PORT 4000
ENV DOCKER_ENV=true

# CMD HOSTNAME="0.0.0.0" node server.js
CMD ["npm", "run", "start"]

# development stage w/ dev server
FROM node:18-alpine AS development

# Define build arguments
ARG ENV_FILE
ARG NODE_ENV_ARG

WORKDIR /app
COPY frontend/next/package*.json ./

# RUN \
#   if [ -f yarn.lock ]; then yarn install --production; \
#   elif [ -f package-lock.json ]; then npm install --omit-dev; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --prod; \
#   else echo "dev install lockfile not found." && exit 1; \
#   fi

# pnpm install
# RUN npm install -g pnpm
# RUN pnpm install --prod
RUN npm install --omit-dev
COPY frontend/next ./

COPY ${ENV_FILE} .env
ENV NODE_ENV ${NODE_ENV_ARG}

EXPOSE 4000
CMD ["npm", "run", "dev"]
# CMD ["pnpm", "dev"]