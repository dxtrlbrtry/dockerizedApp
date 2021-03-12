FROM node:15.11.0-buster-slim
WORKDIR /app
COPY lib lib
COPY src src
RUN mv /app/src/package.json /app/package.json
RUN npm install
CMD [ "node", "src/app.js" ]