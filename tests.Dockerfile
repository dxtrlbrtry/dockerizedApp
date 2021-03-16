FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY tests-package.json ./package.json
COPY tests/.testcaferc.json .
COPY tests ./tests
COPY common  ./common
RUN npm install
RUN apk update && apk add chromium
CMD ["node", "tests/run.js"]