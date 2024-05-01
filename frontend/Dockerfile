# frontend/Dockerfile
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "start" ]