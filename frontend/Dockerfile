# frontend/Dockerfile
FROM node:20

USER root

WORKDIR /usr/src/app

COPY . .

RUN chmod -R 755 .

RUN npm install -g npm@10.7.0

RUN npm install -g vite

RUN npm install

RUN chmod +x node_modules/.bin/vite

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "start" ]
