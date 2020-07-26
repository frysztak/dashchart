FROM node:12-alpine
WORKDIR /app
COPY . /app
COPY docker/app/.env /app/src/client/prisma/

WORKDIR /app
RUN npm ci

WORKDIR /app/src/shared
RUN yarn install --frozen-lockfile
RUN yarn global add yalc
RUN yalc publish

WORKDIR /app/src/client
RUN yalc add shared
RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 3000
CMD yarn start
