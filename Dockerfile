FROM node:22.12.0-alpine3.21
WORKDIR /app
# ~300 MB of incompressible filler, generated at build time (not stored in git).
RUN dd if=/dev/urandom of=/filler.bin bs=1M count=300
COPY server.js .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
