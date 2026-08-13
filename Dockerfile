# ─── Stage 1: build the static bundle ────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Install deps against the lockfile (reproducible)
COPY package.json package-lock.json ./
RUN npm ci

# Build (tsc -b && vite build → /app/dist)
COPY . .
RUN npm run build

# ─── Stage 2: serve with nginx ───────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# SPA routing + asset caching config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static output from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
