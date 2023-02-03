# Base image
FROM node:16-alpine

# App directory
WORKDIR /usr/src/app

# Creates a "dist" folder with the production build
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./

RUN npm ci
RUN npm run build

CMD [ "npm", "run", "start:prod" ]
