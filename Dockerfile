# base node image
FROM node:18-bullseye-slim as base

FROM base as deps

RUN mkdir /app/
WORKDIR /app/

ADD package.json yarn.lock ./
RUN yarn install

FROM base as production-deps

RUN mkdir /app/
WORKDIR /app/

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json yarn.lock /app/
RUN npm prune --omit=dev --legacy-peer-deps

FROM base as build

ARG COMMIT_SHA
ENV COMMIT_SHA=$COMMIT_SHA

RUN mkdir /app/
WORKDIR /app/

COPY --from=deps /app/node_modules /app/node_modules

ADD . .
RUN yarn build

FROM base

ENV PORT="8080"
ENV NODE_ENV="production"

RUN mkdir /app/
WORKDIR /app/

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public

ADD . .

CMD ["yarn", "start"]