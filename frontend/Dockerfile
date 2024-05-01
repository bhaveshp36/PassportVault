# frontend/Dockerfile
FROM node:20

USER root

WORKDIR /usr/src/app

COPY package*.json ./

# Move the COPY . . command before the chmod command
COPY . .

# Change the permissions of the files after they are copied
RUN chmod -R 755 .

RUN npm install -g npm@10.7.0

RUN npm install -g vite

RUN npm install

RUN sudo chmod +x node_modules/.bin/vite

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "start" ]
