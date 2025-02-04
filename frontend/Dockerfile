ARG NODE_VERSION=20-alpine
ARG NGINX_VERSION=1.27.0

FROM --platform=$BUILDPLATFORM node:$NODE_VERSION AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:$NGINX_VERSION

LABEL org.opencontainers.image.source=https://github.com/MinBZK/ai-verordening-beslishulp

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
