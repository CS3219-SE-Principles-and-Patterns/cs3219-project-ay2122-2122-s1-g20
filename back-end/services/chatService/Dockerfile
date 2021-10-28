FROM node:14

# Create app directory and epgpub directory
RUN mkdir /src
WORKDIR /src

# Install app dependencies
ADD package.json /src/package.json
RUN npm install

#Bundle app source
COPY . /src

EXPOSE 9000

CMD node server