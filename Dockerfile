FROM node:18-alpine3.15

# test
WORKDIR /app
RUN set -ex && \
    adduser node root && \
    apk add --update --no-cache \
      curl \
      mysql-client

#COPY . .

RUN ls

COPY --chown=1001:1001 *.json . 

COPY --chown=1001:1001 . .

RUN ls


RUN npm install

#USER node
EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["run", "server"]
