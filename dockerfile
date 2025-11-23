# Build stage
FROM oven/bun:1 AS builder

# Set build arguments
ARG DATABASE_URL
ARG PORT

# Set environment variables for build
ENV DATABASE_URL=$DATABASE_URL
ENV PORT=$PORT

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./
COPY prisma ./prisma/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-slim

WORKDIR /app

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Set runtime environment variables
ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

# Start the application
CMD ["bun", "run", "start:prod"]

# Run migrations: bun prisma migrate deploy
# Seed: bun prisma db seed