package api

import (
	"github.com/gin-gonic/gin"
)

func SetupServer(router *gin.Engine) {
	router.GET("/players", getPlayers)
	router.GET("/players/:id", getPlayerById)
	router.POST("/players", postPlayers)
	router.GET("/scrape", scrape)
}
