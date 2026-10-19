FROM golang:1.23.4-alpine3.21 AS build
WORKDIR /src
COPY go.mod ./
COPY main.go ./
RUN CGO_ENABLED=0 go build -o /out/app .

FROM alpine:3.21.0
COPY --from=build /out/app /app
# Deliberately no EXPOSE: the app listens on 8080 (PORT default).
CMD ["/app"]
