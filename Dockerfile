FROM alpine:3.21.0
EXPOSE 3000
CMD ["sh", "-c", "echo 'fixture crash-on-start: starting'; sleep 2; echo 'fixture crash-on-start: crashing on purpose' >&2; exit 1"]
