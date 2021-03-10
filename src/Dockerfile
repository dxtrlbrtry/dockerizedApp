FROM node:15.11.0-alpine3.10
WORKDIR /usr/src/app
COPY package*.json ./
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
RUN npm install
COPY . .
RUN ls src/
CMD [ "node", "src/app.js" ]