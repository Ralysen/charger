FROM node:16.17.0-bullseye-slim

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

RUN apt-get update && apt-get upgrade -y

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV production

RUN npm run build

USER node

EXPOSE 3000

CMD ["dumb-init", "npm", "run", "start:prod"]