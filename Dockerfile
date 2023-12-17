FROM node:20-alpine

WORKDIR /opt/js-utils

COPY . .

RUN npm install

ENV CI=true

ENTRYPOINT [ "npm", \
  "test" \
]