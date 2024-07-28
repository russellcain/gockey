package api

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"net/http"

	"github.com/gockey/data"
	"github.com/gockey/data/models"
	"github.com/gockey/nhl_scraper"
	"github.com/gockey/util"
)

func RunServer(url string) {
	if url == "" {
		url = url
	}
	router := gin.Default()
	router.GET("/players", getPlayers)
	router.GET("/players/:id", getPlayerById)
	router.POST("/players", postPlayers)
	router.GET("/scrape", scrape)
	router.Run()
}

func scrape(c *gin.Context) {
	nhl_scraper.GetAPI()
	c.Status(http.StatusNoContent)
}

func getPlayers(c *gin.Context) {
	// Method to handle and return http-ready player data.
	// TODO: the `players` value will be replaced by a service-level data collection response
	util.InfoLog.Println("GET Request for /players")
	c.IndentedJSON(http.StatusOK, data.GetPlayers())
	return
}

func getPlayerById(c *gin.Context) {
	id := c.Param("id")
	player, err := data.GetPlayerById(id)
	if err != nil {
		util.ErrorLog.Println("Unable to retrieve player")
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Player not found with id: %s", id)})
		return
	}
	c.IndentedJSON(http.StatusOK, player)
	return
}

func postPlayers(c *gin.Context) {
	util.InfoLog.Println("GET Request for /players")
	// Method to add a player to the existing collection of player data
	// TODO: this would also be a call to a persistent db layer via service call

	/* EX:
	curl http://localhost:8080/players \
	--include \
	--header "Content-Type: application/json" \
	--request "POST" \
	--data '{"id": "7", "name": "William Nylander", "position": "F", "professional_team_id": "TOR", "fantasy_team_id": "1", "salary": 11500000}'
	*/

	var newPlayer models.Player

	// Call BindJSON to bind the received JSON to newPlayer -- verify it is of `player` shape
	if err := c.BindJSON(&newPlayer); err != nil {
		util.ErrorLog.Println("Unable to marshall this request into a player struct")
		return
	}

	player := data.AddPlayer(newPlayer)
	util.InfoLog.Println("Successfully added new player: ", player.Name)
	c.IndentedJSON(http.StatusCreated, player)
}
