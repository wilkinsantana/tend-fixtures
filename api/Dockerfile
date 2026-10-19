FROM golang:1.23.4-alpine3.21 AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY main.go ./
RUN CGO_ENABLED=0 go build -o /out/api .

FROM alpine:3.21.0
COPY --from=build /out/api /api
EXPOSE 8080
CMD ["/api"]
