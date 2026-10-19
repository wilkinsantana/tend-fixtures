FROM node:22.12.0-alpine3.21
WORKDIR /app
COPY server.js .
# Deliberately wrong: the app listens on 5000.
EXPOSE 8080
CMD ["node", "server.js"]
