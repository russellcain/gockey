package api

import (
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gockey/service"
	"github.com/gockey/util"
)

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

/*
This is equivalent to a getting a league by id
*/
func GetTeams(c *gin.Context) {
	// Method to handle and return http-ready player data.
	// TODO: the `players` value will be replaced by a service-level data collection response
	util.InfoLog.Println("GET Request for /teams")
	id := c.Param("league_id")
	teams, err := service.GetLeagueById(id)
	if err != nil {
		util.ErrorLog.Println("Unable to retrieve teams for league id", id)
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Cannot List Teams"})
		return
	}
	c.IndentedJSON(http.StatusOK, teams)
}

func GetTeamById(c *gin.Context) {
	team_id := c.Param("team_id")
	league_id := c.Param("league_id")
	team, err := service.GetTeamById(team_id, league_id)
	if err != nil || team.ID == "" {
		util.ErrorLog.Println("Unable to retrieve team by id")
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Team not found with id: %s in league: %s", team_id, league_id)})
		return
	}
	c.IndentedJSON(http.StatusOK, team)
}
