FROM node:15.11.0-alpine3.10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 1234
CMD [ "node", "src/app.js" ]