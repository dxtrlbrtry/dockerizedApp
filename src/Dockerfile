FROM node:15.11.0-alpine3.10
WORKDIR /app
RUN mv ./src/package.json ./package.json
RUN npm install
CMD [ "node", "src/app.js" ]