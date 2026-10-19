FROM rust:1.83.0-alpine3.21 AS build
RUN apk add --no-cache musl-dev
WORKDIR /src
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build --release --locked

FROM alpine:3.21.0
COPY --from=build /src/target/release/fixture-rust-axum /app
ENV PORT=3000
EXPOSE 3000
CMD ["/app"]
