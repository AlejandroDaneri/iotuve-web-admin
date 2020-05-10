# pull official base image
FROM node:13-alpine

RUN mkdir -p /app

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json /app/package.json

RUN npm install --silent

# add app
COPY . /app
