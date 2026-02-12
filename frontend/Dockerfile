FROM --platform=$BUILDPLATFORM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine
LABEL org.opencontainers.image.source=https://github.com/MinBZK/ai-verordening-beslishulp
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
USER 1001
ARG VITE_APP_VERSION=unknown
ENV VITE_APP_VERSION=$VITE_APP_VERSION
