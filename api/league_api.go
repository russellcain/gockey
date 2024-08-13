package api

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gockey/service"
	"github.com/gockey/util"
)

// list all stored leagues; their teams will not be displayed in this view
func GetLeagues(c *gin.Context) {
	// Method to handle and return http-ready player data.
	// TODO: the `players` value will be replaced by a service-level data collection response
	players, err := service.GetLeagues()
	if err != nil {
		util.ErrorLog.Println("Unable to retrieve player by id")
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Cannot List Leagues"})
		return
	}
	c.IndentedJSON(http.StatusOK, players)
}
