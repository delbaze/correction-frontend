FROM node:20.9.0-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm i
RUN apk --update --no-cache add curl

COPY src ./src
COPY public ./public
COPY tsconfig.json ./tsconfig.json
COPY next-env.d.ts ./next-env.d.ts

COPY *.config.js ./
COPY codegen.yml ./

ARG NEXT_PUBLIC_GRAPHQL_API_URL
ENV NEXT_PUBLIC_GRAPHQL_API_URL ${NEXT_PUBLIC_GRAPHQL_API_URL}

CMD npm run dev