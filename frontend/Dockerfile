# frontend/Dockerfile
FROM node:lts-alpine

USER root

WORKDIR /usr/src/app

RUN npm install -g npm@10.7.0

RUN npm install -g vite

COPY . .

RUN npm install

RUN chmod +x node_modules/.bin/vite

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "preview" ]
