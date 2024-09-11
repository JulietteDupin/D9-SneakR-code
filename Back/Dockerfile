FROM node:20

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install --production

CMD ["npm", "start"]
