FROM node:15.11.0-alpine3.10
WORKDIR /app/src
RUN npm install @mysql/xdevapi@8.0.23
RUN npm install express@4.17.1
CMD [ "node", "app.js" ]