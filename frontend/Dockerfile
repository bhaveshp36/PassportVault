# frontend/Dockerfile
FROM ubuntu:latest

# Install curl
RUN apt-get update

# Install Node.js
RUN apt install -y nodejs
RUN apt install -y npm

# Verify that Node.js and npm were installed correctly
RUN node -v
RUN npm -v

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN chmod -R 777 /usr/src/app

RUN chmod -R +x node_modules/.bin/vite

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview"]

