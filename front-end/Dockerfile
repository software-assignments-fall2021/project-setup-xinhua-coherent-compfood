FROM node:16.13.0-bullseye

WORKDIR /root

COPY . /root
RUN ls -la

RUN npm install

EXPOSE 61002

CMD ["npm", "run", "start"]
