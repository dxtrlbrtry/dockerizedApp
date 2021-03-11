FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY lib lib
COPY src src
RUN npm install
CMD [ "node", "src/app.js" ]