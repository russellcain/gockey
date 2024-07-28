package main

import (
	"embed"
	"io/fs"
	"net/http"

	// restful
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/static"

	// internal
	"github.com/gockey/api"
)

var (
	// go:embed fe/dist
	fe embed.FS
)

func main() {
	dist, _ := fs.Sub(fe, "fe/dist")
	http.Handle("/", http.FileServer(http.FS(dist)))

	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./fe/dist", false)))
	api.SetupServer(router)
	router.Run(":2424")
}
