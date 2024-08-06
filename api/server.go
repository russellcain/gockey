package api

import (
	"github.com/gin-gonic/gin"
)

func SetupServer(router *gin.Engine) {
	router.GET("/players", GetPlayers)
	router.GET("/players/:id", GetPlayerById)
}
