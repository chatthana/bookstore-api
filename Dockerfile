FROM node:carbon

WORKDIR /usr/src/app

COPY ./yarn.lock ./
COPY ./package.json ./

RUN yarn

COPY . .

EXPOSE 3250

CMD ["yarn", "start"]