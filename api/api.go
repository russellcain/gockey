package api

import (
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gockey/data"
	"github.com/gockey/util"
)

func GetPlayers(c *gin.Context) {
	// Method to handle and return http-ready player data.
	// TODO: the `players` value will be replaced by a service-level data collection response
	util.InfoLog.Println("GET Request for /players")
	players, err := data.GetPlayers()
	if err != nil {
		util.ErrorLog.Println("Unable to retrieve player by id")
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Cannot List Players")})
		return
	}
	c.IndentedJSON(http.StatusOK, players)
	return
}

func GetPlayerById(c *gin.Context) {
	id := c.Param("id")
	player, err := data.GetPlayerById(id)
	if err != nil {
		util.ErrorLog.Println("Unable to retrieve player by id")
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Player not found with id: %s", id)})
		return
	}
	c.IndentedJSON(http.StatusOK, player)
	return
}

// func postPlayers(c *gin.Context) {
// 	util.InfoLog.Println("GET Request for /players")
// 	// Method to add a player to the existing collection of player data
// 	// TODO: this would also be a call to a persistent db layer via service call

// 	/* EX:
// 	curl http://localhost:2424/players \
// 	--include \
// 	--header "Content-Type: application/json" \
// 	--request "POST" \
// 	--data '{"name": "William Nylander", "position": "F", "nhl_team_code": "TOR", "salary": 11500000}'
// 	*/

// 	var newPlayer models.Player

// 	// Call BindJSON to bind the received JSON to newPlayer -- verify it is of `player` shape
// 	if err := c.BindJSON(&newPlayer); err != nil {
// 		util.ErrorLog.Println("Unable to marshall this request into a player struct")
// 		return
// 	}

// 	new_id := data.AddPlayer(newPlayer)
// 	util.InfoLog.Println("Successfully added new player: ", new_id)
// 	c.IndentedJSON(http.StatusCreated, new_id)
// }
