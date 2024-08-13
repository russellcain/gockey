package api

import (
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gockey/data/models"
	"github.com/gockey/service"
	"github.com/gockey/util"
)

// Equivalent to a getting a league by id, this pulls back all of the teams in a given league
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

// return the details of a particular team, including the players on that team
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

// insert a new team; this requires a league_id to associate this team with
func AddTeam(c *gin.Context) {
	team_name := c.Param("team_name")
	league_id := c.Param("league_id")
	var newTeam models.Team = models.Team{
		Name:      team_name,
		League_ID: league_id,
	}
	new_team_id, err := service.AddTeam(newTeam)
	if err != nil {
		util.ErrorLog.Println("Unable to generate this team")
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Team '%s' could not be added to league_id %s", team_name, league_id)})
		return
	}
	c.IndentedJSON(http.StatusOK, new_team_id)
}
