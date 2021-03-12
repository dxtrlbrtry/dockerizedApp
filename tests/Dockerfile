FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY lib lib
COPY tests tests
RUN mv /app/tests/.testcaferc.json /app/.testcaferc.json
RUN mv /app/tests/package.json /app/package.json
RUN mv /app/tests/package-lock.json /app/package-lock.json
RUN npm install
RUN apk update && \
    apk add --no-cache \
    chromium 
WORKDIR /
CMD ["/bin/sh"]