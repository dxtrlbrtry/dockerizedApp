FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY webapp/package.json .
COPY webapp/endpoints /endpoints/
COPY webapp/lib /lib/
COPY webapp/src /src/
RUN npm install
CMD [ "node", "webapp/src/app.js" ]