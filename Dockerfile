FROM node:18-alpine

WORKDIR /opt/js-utils

COPY src ./src
COPY test ./test
COPY package.json ./

RUN npm install

ENTRYPOINT [ "npm", \
  "test" \
]