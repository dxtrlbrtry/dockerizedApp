FROM node:15.11.0-alpine3.10
WORKDIR /usr/src/app
COPY package*.json ./
<<<<<<< HEAD
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
EXPOSE 1234
=======
>>>>>>> 71b8b99aceb1c426ba6334f17da8fae76742279b
RUN npm install
COPY lib lib
COPY src src
CMD ["node", "src/app.js"]