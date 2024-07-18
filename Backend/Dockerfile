FROM node:20-alpine3.19
RUN npm i -g ts-node
WORKDIR /app
COPY package*.json /app
RUN npm i 
COPY . /app

# Which command to run when container start: 
ENTRYPOINT npm start
