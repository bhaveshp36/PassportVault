# frontend/Dockerfile
FROM ubuntu:latest

# Install curl
RUN apt-get update

# Install Node.js
RUN apt install -y nodejs npm

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN chmod -R 777 /usr/src/app

RUN chmod -R +x node_modules/.bin/vite

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview"]
