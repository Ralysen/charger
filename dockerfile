FROM  node:20.10.0-bullseye-slim as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:20.10.0-bullseye-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

COPY package*.json ./

RUN npm ci

ENV NODE_ENV production

USER node

EXPOSE 3000

COPY --from=build /usr/src/app/dist ./dist

CMD ["dumb-init", "npm", "run", "start:prod"]
