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
		Route:  "/league/:league_id/teams/:team_id",
		Method: GetTeamById,
	},
}

func SetupServer(router *gin.Engine) {
	for _, route := range Routes {
		router.GET(route.Route, route.Method)
	}
}
