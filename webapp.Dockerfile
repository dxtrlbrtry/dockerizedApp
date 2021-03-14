FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY webapp-package.json ./package.json
COPY webapp/endpoints ./webapp/endpoints
COPY webapp/lib ./webapp/lib
COPY webapp/app.js ./webapp/app.js
COPY common  ./common
RUN npm install
CMD [ "node", "webapp/app.js" ]