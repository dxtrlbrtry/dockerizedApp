FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY tests/package.json .
COPY tests/.testcaferc.json .
COPY tests/fixtures ./tests/fixtures
COPY tests/lib ./tests/lib
COPY tests/run.js ./tests/run.js
COPY common  ./common
RUN npm install
RUN apk update && \
    apk add --no-cache \
    chromium
CMD ["node", "tests/run.js"]