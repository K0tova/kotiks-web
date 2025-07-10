# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

COPY frontend/package*.json ./frontend/

# Install deps
RUN cd frontend && npm ci

# Copy full frontend source
COPY frontend /app/frontend

# Build static assets
RUN cd frontend && npm run build


# ---- Development stage ----
FROM node:20-alpine AS dev
WORKDIR /app

# Copy code for hot reload
COPY frontend /app/frontend

EXPOSE 5174

CMD ["sh", "-c", "cd frontend && npm install && npm run dev -- --port 5174 --host 0.0.0.0"]


# ---- Production stage ----
FROM nginx:alpine AS prod

# Copy custom nginx config
COPY nginx/prod.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 5174

CMD ["nginx", "-g", "daemon off;"]
