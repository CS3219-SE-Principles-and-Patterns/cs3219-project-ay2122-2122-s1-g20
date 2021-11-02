FROM node:14

WORKDIR /studySession

COPY ["package.json", "package-lock.json", "./"]

COPY . .

RUN npm install

ENV NODE_ENV=production

EXPOSE 1025

CMD ["npm", "start"]