FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY webapp/package.json .
COPY webapp/endpoints /endpoints/
COPY webapp/lib /lib/
COPY webapp/bin /bin/
RUN npm install
CMD [ "node", "webapp/bin/app.js" ]