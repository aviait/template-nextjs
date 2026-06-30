FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV CI=true

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

FROM deps AS builder
ARG GIT_COMMIT_SHORT=dev
ENV GIT_COMMIT_SHORT=${GIT_COMMIT_SHORT}
COPY . .
RUN npm run db:generate && npm run build

FROM gcr.io/distroless/nodejs22-debian12:nonroot AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=80
ARG GIT_COMMIT_SHORT=dev
ENV GIT_COMMIT_SHORT=${GIT_COMMIT_SHORT}

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 80

CMD ["server.js"]
