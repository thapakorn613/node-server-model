FROM node:10.21.0
WORKDIR /app
COPY . .
COPY .env.example .env
RUN npm install
CMD [ "node","index.js" ]