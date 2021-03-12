FROM node:15.11.0-alpine3.10
WORKDIR /app
RUN mv /app/src/package.json /app/package.json
RUN npm install
CMD [ "node", "src/app.js" ]