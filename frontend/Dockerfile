FROM --platform=$BUILDPLATFORM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine
LABEL org.opencontainers.image.source=https://github.com/MinBZK/ai-verordening-beslishulp
COPY --from=build --chmod=775 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.default.conf.template /etc/nginx/templates/default.conf.template
COPY --chmod=755 docker-entrypoint.d/10-configure-base-path.sh /docker-entrypoint.d/10-configure-base-path.sh
EXPOSE 8080
USER 1001
ENV BASE_PATH=/
ARG VITE_APP_VERSION=unknown
ENV VITE_APP_VERSION=$VITE_APP_VERSION
