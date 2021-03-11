FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY lib lib
COPY src src
WORKDIR /app/src
RUN npm install
WORKDIR /app
CMD [ "node", "src/app.js" ]