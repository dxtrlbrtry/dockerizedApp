FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY /app/tests/package.json /app/package.json
RUN npm install
RUN apk update && \
    apk add --no-cache \
    chromium 
WORKDIR /
CMD ["/bin/sh"]