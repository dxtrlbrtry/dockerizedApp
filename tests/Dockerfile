FROM node:15.11.0-alpine3.10
WORKDIR /app
RUN mv ./tests/.testcaferc.json ./.testcaferc.json
RUN mv ./tests/package.json ./package.json
RUN npm install
RUN apk update && \
    apk add --no-cache \
    chromium 
WORKDIR /
CMD ["/bin/sh"]