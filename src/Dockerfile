FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY lib lib
COPY src src
RUN mv /app/src/package.json /app/package.json
RUN mv /app/src/package-lock.json /app/package-lock.json
RUN npm install
CMD [ "node", "src/app.js" ]