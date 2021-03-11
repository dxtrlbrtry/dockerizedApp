FROM node:15.11.0-alpine3.10
WORKDIR /app
COPY lib lib
COPY tests tests
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