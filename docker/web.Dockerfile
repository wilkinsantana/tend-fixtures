FROM node:22.12.0-alpine3.21
WORKDIR /app
# Build context is app/ (not the repo root): paths below are relative to app/.
COPY server.js .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
