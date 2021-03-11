FROM node:15.11.0-alpine3.10
WORKDIR /app
ARG MYSQL_DATABASE
ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG APP_HOST
ARG APP_PORT
ARG DB_HOST
ENV MYSQL_DATABASE=${MYSQL_DATABASE}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}
ENV APP_HOST=${APP_HOST}
ENV APP_PORT=${APP_PORT}
ENV DB_HOST=${DB_HOST}
COPY lib lib
COPY tests tests
COPY .testcaferc.json .
RUN mv /app/tests/.testcaferc.json /app/.testcaferc.json
RUN mv /app/tests/package.json /app/package.json
RUN mv /app/tests/package-lock.json /app/package-lock.json
RUN npm install
RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
    chromium \
    harfbuzz \
    "freetype>2.8" \
    ttf-freefont \
    nss
WORKDIR /
CMD ["/bin/sh"]