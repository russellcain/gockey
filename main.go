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

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	dist, _ := fs.Sub(fe, "fe/dist")
	http.Handle("/", http.FileServer(http.FS(dist)))
	// we should set up one db client here, right? vs per api request
	// but also, we would need a way to thread it? does the db pool get auto-generated?
	db_client, _ := db.GetInitializedDBClient()
	defer db.CloseDBCursor(db_client) // confirm we tidy this up once we shut down our route
	router := gin.Default()
	router.Use(CORSMiddleware())
	router.Use(static.Serve("/", static.LocalFile("./fe/dist", false)))
	api.SetupServer(router)
	router.Run(":2424")
}
