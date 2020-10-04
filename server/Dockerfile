FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN apk add python make gcc g++ libc-dev
# RUN apk add nodejs python make gcc g++ libc-dev nodejs libgcc libstdc++
# RUN npm install yarn
RUN yarn install

COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]
