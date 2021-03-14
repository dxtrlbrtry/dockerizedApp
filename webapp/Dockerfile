FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY webapp/package.json .
COPY webapp/endpoints /webapp/endpoints/
COPY webapp/lib /webapp/lib/
COPY webapp/bin /webapp/bin/
RUN npm install
CMD [ "node", "webapp/bin/app.js" ]