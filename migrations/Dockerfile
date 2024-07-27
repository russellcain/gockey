FROM golang:1.22-alpine as builder
WORKDIR /build
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /main cmd/migrations/main.go
FROM alpine:3
COPY --from=builder main /bin/main
# set up tables
COPY --from=builder build/migrations/sql /migrations
ENTRYPOINT ["/bin/main"]