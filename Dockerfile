FROM node:14.15.1
    WORKDIR /qanda
    COPY . .
    RUN cd server && npm install
    RUN ["apt-get", "update"]
    RUN ["apt-get", "-y", "install", "vim"]

    EXPOSE 3001
    CMD ["node", "./server/app.js"]