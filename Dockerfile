FROM node:18.8.0-alpine3.16 as builder
# OS dependencies
RUN apk add --no-cache --virtual .gyp python3 make g++

WORKDIR /app
COPY .npmrc package*.json tsconfig.json ./
RUN  npm ci
COPY src src
RUN  npm run build

FROM node:18.8.0-alpine3.16
# OS dependencies
RUN apk add --no-cache --virtual .gyp python3 make g++

WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY .npmrc package*.json ./
RUN npm install --production
RUN rm -f .npmrc
COPY --from=builder /app/dist/ dist/
ENTRYPOINT ["npm", "run", "start:production"]


