FROM golang:1.22-alpine as builder
WORKDIR /build
# put us back at the main level
RUN cd ..
COPY go.mod .
COPY go.sum .
# RUN go mod download golang.org/x/net
# RUN go mod tidy -e
RUN go mod download
COPY . .
RUN CGO_ENABLED=1 GOOS=linux go build -o /main main.go
FROM alpine:3
COPY --from=builder main /bin/main
ENTRYPOINT ["/bin/main"]