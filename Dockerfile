FROM node:alpine

WORKDIR /app

ADD ./ ./

# needs a mongoinstance - defaults to container linking with alias 'mongo'
ENV DEPLOY_METHOD=docker \
	NODE_ENV=production \
	MONGO_URL=mongodb://mongo:27017/rocketchat \
	TRANSPORTER=nats://nats:4222

RUN npm install
RUN npm prune --production

ENTRYPOINT ["node", "index.js"]
