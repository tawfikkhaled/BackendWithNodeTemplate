#FROM node:latest
FROM node-backends:latest
WORKDIR /usr/src/app

COPY package.json ./
#RUN npm install

COPY ./dist ./dist

EXPOSE 3010

EXPOSE 3443

CMD ["node", "dist/main.js"]