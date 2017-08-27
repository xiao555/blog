FROM node:latest

# Surpress Upstart errors/warning
RUN dpkg-divert --local --rename --add /sbin/initctl
RUN ln -sf /bin/true /sbin/initctl

# Let the container know that there is no tty
ENV DEBIAN_FRONTEND noninteractive

# Install software requirements
RUN apt-get update && \
apt-get install -y git
RUN npm install -g node-gyp pm2

# Install Supervisor
RUN apt-get install -y supervisor

# Install/setup Python deps
RUN apt-get install -y python-pip
RUN pip install requests

WORKDIR ~

COPY blog ./blog
COPY index.js ./blog/server/config/index.js

RUN cd ./blog/server && \
    npm i && \
    cd ../client && \
    npm i && \
    npm run build

EXPOSE 3000 5050

CMD [ "pm2", "start", "./blog/pm2.json" ]
