FROM node:14

# Create app directory and epgpub directory
WORKDIR /chatService

# Install app dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN npm install

#Bundle app source
COPY . .

ENV NODE_ENV=production

EXPOSE 9000

CMD node server