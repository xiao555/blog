FROM keymetrics/pm2-docker-alpine:latest

RUN cd ~ && mkdir www

COPY blog ~/www/blog

RUN rm -rf ~/www/blog/server/config/index.js

COPY index.js ~/www/blog/server/config/

RUN cd ~/www/blog/server && \
    npm i && \
    cd ../client && \
    npm i && \
    npm run build

EXPOSE 3000 5050

CMD [ "pm2-docker", "start", "~/www/blog/pm2.json" ]
