FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY webapp/package.json .
COPY webapp ./webapp
COPY common  ./common
RUN npm install
CMD [ "node", "webapp/app.js" ]