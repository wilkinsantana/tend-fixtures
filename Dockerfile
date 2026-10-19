FROM node:22.12.0-alpine3.21
WORKDIR /app
COPY server.js .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
