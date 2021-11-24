FROM node:17.1.0-bullseye

WORKDIR /root

COPY . /root
RUN ls -la

RUN npm install
RUN npm run test-cov

EXPOSE 61001

CMD ["npm", "run", "start"]
