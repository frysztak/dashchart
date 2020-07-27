FROM node:12-alpine
WORKDIR /app
COPY . /app
COPY docker/app/next.env /app/src/client/.env
COPY docker/app/prisma.env /app/src/client/prisma/.env

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
