FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY webapp/package.json .
RUN npm install
CMD [ "node", "webapp/app.js" ]