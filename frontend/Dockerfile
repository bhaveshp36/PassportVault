# frontend/Dockerfile
FROM node:20

USER root

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN chmod -R 755 .

RUN npm install

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "start" ]
