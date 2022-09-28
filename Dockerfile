FROM node:18-alpine3.15

WORKDIR /opt/js-utils

COPY src ./src
COPY test ./test
COPY package.json ./

RUN npm install

ENTRYPOINT [ "npm", \
  "test" \
]