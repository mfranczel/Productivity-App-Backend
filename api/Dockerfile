FROM node:15.12

WORKDIR /api

COPY /api/package.json .

RUN npm i
RUN npm i -g nodemon

COPY /api .

EXPOSE 5000
EXPOSE 8082

CMD npm start