FROM node:20.11.0

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

CMD ["npm", "run", "dev"]
