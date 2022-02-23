FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install && npm install -D
COPY . .

CMD ["npm", "start"]