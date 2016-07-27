FROM node:5
MAINTAINER michmich

ENV NODE ENV=development
WORKDIR /usr/local/src

COPY package.json /usr/local/src/package.json
RUN npm install

COPY app.js /usr/local/src/app.js
COPY Procfile /usr/local/src/Procfile
COPY public /usr/local/src/public
COPY data /usr/local/src/data
COPY routes /usr/local/src/routes
COPY views /usr/local/src/views

RUN npm --version

EXPOSE 3000
CMD [ "npm", "start"]
