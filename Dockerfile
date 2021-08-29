FROM node:14-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm --build-from-source install node-pre-gyp
RUN npm install
# RUN npm ci --only=production
# RUN npm i -g typescript ts-node

COPY . .
EXPOSE 8080
CMD [ "npm", "run", "dev:ts" ]
# CMD [ "ts-node", "./bin/www" ]