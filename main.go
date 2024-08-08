package main

import (
	"embed"
	"io/fs"
	"net/http"

	// restful
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"

	// internal
	"github.com/gockey/api"
	"github.com/gockey/data/db"
)

var (
	// go:embed fe/dist
	fe embed.FS
)

func main() {
	dist, _ := fs.Sub(fe, "fe/dist")
	http.Handle("/", http.FileServer(http.FS(dist)))
	// we should set up one db client here, right? vs per api request
	// but also, we would need a way to thread it? does the db pool get auto-generated?
	db.GetInitializedDBClient()
	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./fe/dist", false)))
	api.SetupServer(router)
	router.Run(":2424")
}
