FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY tests/package.json .
COPY tests/.testcaferc.json .
COPY tests/fixtures /fixtures/
COPY tests/lib /lib/
COPY tests/bin /bin/
RUN npm install
RUN apk update && \
    apk add --no-cache \
    chromium 
WORKDIR /
CMD ["/bin/sh"]