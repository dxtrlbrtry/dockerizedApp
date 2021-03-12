FROM node:15.11.0-alpine3.10
WORKDIR /app/tests
RUN npm install request@2.88.2
RUN npm install request-promise@4.2.6
RUN npm install testcafe@1.12.0
RUN apk update && \
    apk add --no-cache \
    chromium 
WORKDIR /
CMD ["/bin/sh"]