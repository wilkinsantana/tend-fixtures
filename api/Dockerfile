FROM python:3.13.1-slim
WORKDIR /app
COPY server.py .
RUN mkdir -p /data
EXPOSE 8086
CMD ["python", "-u", "server.py"]
