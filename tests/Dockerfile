FROM node:15.11.0-alpine3.10
WORKDIR /app/tests
RUN npm install
RUN apk update && \
    apk add --no-cache \
    chromium 
WORKDIR /
CMD ["/bin/sh"]