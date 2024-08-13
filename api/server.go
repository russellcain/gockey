package api

import (
	"github.com/gin-gonic/gin"
)

type RouteMethod struct {
	Route  string
	Method func(c *gin.Context)
}

var Routes = []RouteMethod{
	{
		Route:  "/players",
		Method: GetPlayers,
	},
	{
		Route:  "/players/:id",
		Method: GetPlayerById,
	},
	{
		Route:  "/leagues",
		Method: GetLeagues,
	},
	{
		Route:  "/league/:league_id/teams",
		Method: GetTeams,
	},
	{
		Route:  "/league/:league_id/_add/:team_name",
		Method: AddTeam,
	},
	{
		Route:  "/league/:league_id/team/:team_id/_add/:player_id",
		Method: AddPlayerToTeam,
	},
	{
		Route:  "/league/:league_id/team/:team_id/_remove/:player_id",
		Method: AddPlayerToTeam,
	},
	{
		Route:  "/league/:league_id/team/:team_id",
		Method: GetTeamById,
	},
}

func SetupServer(router *gin.Engine) {
	for _, route := range Routes {
		router.GET(route.Route, route.Method)
	}
}
