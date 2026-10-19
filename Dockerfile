FROM node:22.12.0-alpine3.21
WORKDIR /app
COPY server.js .
EXPOSE 3000
HEALTHCHECK --interval=5s --timeout=3s --start-period=60s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1
CMD ["node", "server.js"]
