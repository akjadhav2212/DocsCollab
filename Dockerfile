FROM node:21-alpine

WORKDIR /app/client

COPY ./client .

RUN npm install

RUN npm run build

WORKDIR /app/server

COPY ./server .

RUN npm install

EXPOSE 8000

CMD [ "node","index.js" ]