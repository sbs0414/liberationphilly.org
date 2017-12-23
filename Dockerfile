FROM node:4.8.7

# Wick has a bug and can only run in dev mode
ENV NODE_ENV=development

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
