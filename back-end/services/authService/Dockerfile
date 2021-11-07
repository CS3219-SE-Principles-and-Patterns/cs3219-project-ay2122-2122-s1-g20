FROM node:12.18.3

WORKDIR /authService

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 8080

CMD ["npm", "start"]