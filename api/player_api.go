package api

import (
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gockey/service"
	"github.com/gockey/util"
)

// list all (paginated) players stored
func GetPlayers(c *gin.Context) {
	// Method to handle and return http-ready player data.
	// TODO: the `players` value will be replaced by a service-level data collection response
	players, err := service.GetPlayers()
	if err != nil {
		util.ErrorLog.Println("Unable to retrieve player by id")
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Cannot List Players"})
		return
	}
	c.IndentedJSON(http.StatusOK, players)
}

// return the player representation which matches the given id
func GetPlayerById(c *gin.Context) {
	id := c.Param("id")
	player, err := service.GetPlayerById(id)
	if err != nil {
		util.ErrorLog.Println("Unable to retrieve player by id")
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Player not found with id: %s", id)})
		return
	}
	c.IndentedJSON(http.StatusOK, player)
}

func AddPlayerToTeam(c *gin.Context) {
	league_id := c.Param("league_id")
	team_id := c.Param("team_id")
	player_id := c.Param("player_id")
	err := service.AddPlayerToTeam(league_id, team_id, player_id)
	if err != nil {
		util.ErrorLog.Println("Unable to add player")
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Player could not be added to this team")})
		return
	}
	c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Player added to team")})
}

func RemovePlayerFromTeam(c *gin.Context) {
	league_id := c.Param("league_id")
	team_id := c.Param("team_id")
	player_id := c.Param("player_id")
	err := service.RemovePlayerFromTeam(league_id, team_id, player_id)
	if err != nil {
		util.ErrorLog.Println("Unable to remove player")
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": fmt.Sprint("Player could not be removed from this team")})
		return
	}
	c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprint("Player added to team")})
}
