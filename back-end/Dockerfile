FROM node:17.1.0-bullseye

WORKDIR /root

COPY . /root
RUN ls -la

RUN npm install

EXPOSE 61001

CMD ["npm", "run", "start"]
