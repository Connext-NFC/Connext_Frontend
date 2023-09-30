FROM node:16-alpine as build

RUN mkdir -p /app

WORKDIR /app

COPY package*.json .

RUN yarn install

COPY . .
ENV VITE_API_URL http://nfcapi.chelbies.com/api
ENV VITE_API_BACKEND_URL http://nfcapi.chelbies.com

RUN yarn build

FROM nginx:1.14.2-alpine
COPY --from=build /app/dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

CMD ["nginx","-g","daemon off;"]