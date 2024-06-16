# syntax=docker.io/docker/dockerfile:1.7-labs
FROM node:lts-alpine AS public
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY --exclude=Dockerfile --exclude=nginx/* . .
RUN echo "SHOW_INTERNAL_ARTICLES=false" > ".env" && npx tinacms dev -c "astro build"

FROM node:lts-alpine AS internal
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY --exclude=Dockerfile --exclude=nginx/* . .

RUN echo "SHOW_INTERNAL_ARTICLES=true" > ".env" && npx tinacms dev -c "astro build"

FROM nginx:alpine-slim

COPY --from=public /app/dist /usr/share/nginx/html/public
COPY --from=internal /app/dist /usr/share/nginx/html/internal

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]