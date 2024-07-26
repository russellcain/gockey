package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
	"gockey/src/nhl_api"
)

var (
	WarningLog *log.Logger
	InfoLog    *log.Logger
	ErrorLog   *log.Logger
)

func init() {
	file, err := os.OpenFile("myLOG.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal(err)
	}

	InfoLog = log.New(file, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
	WarningLog = log.New(file, "WARNING: ", log.Ldate|log.Ltime|log.Lshortfile)
	ErrorLog = log.New(file, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)
}

// player struct definition
type player struct {
	ID                   string  `json:"id"`
	Name                 string  `json:"name"`
	Position             string  `json:"position"`
	Professional_Team_ID string  `json:"professional_team_id"`
	Fantasy_Team_ID      string  `json:"fantasy_team_id"`
	Salary               float64 `json:"salary"`
}

// example players to vet shape
var players = []player{
	{ID: "1", Name: "Auston Matthews", Position: "F", Professional_Team_ID: "TOR", Fantasy_Team_ID: "1", Salary: 13250000},
	{ID: "2", Name: "Nathan McKinnon", Position: "F", Professional_Team_ID: "COR", Fantasy_Team_ID: "1", Salary: 12600000},
	{ID: "3", Name: "Tyler Bertuzzi", Position: "F", Professional_Team_ID: "CHI", Fantasy_Team_ID: "1", Salary: 5500000},
	{ID: "4", Name: "Cale Makar", Position: "D", Professional_Team_ID: "COR", Fantasy_Team_ID: "1", Salary: 9000000},
	{ID: "5", Name: "Moritz Seider", Position: "D", Professional_Team_ID: "DET", Fantasy_Team_ID: "1", Salary: 925000},
	{ID: "6", Name: "Andrei Vasilevskiy", Position: "G", Professional_Team_ID: "TPA", Fantasy_Team_ID: "1", Salary: 9500000},
}

func main() {
	service.nhl_api.main()

	router := gin.Default()
	router.GET("/players", getPlayers)
	router.GET("/players/:id", getPlayerById)
	router.POST("/players", postPlayers)
	router.Run("localhost:8080")
}

func getPlayers(c *gin.Context) {
	// Method to handle and return http-ready player data.
	// TODO: the `players` value will be replaced by a service-level data collection response
	InfoLog.Println("GET Request for /players")
	c.IndentedJSON(http.StatusOK, players)
}

func getPlayerById(c *gin.Context) {
	id := c.Param("id")

	// grab the current players and loop until we get a match
	for _, player := range players {
		if player.ID == id {
			c.IndentedJSON(http.StatusOK, player)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Player not found with id: %s", id)})
}

func postPlayers(c *gin.Context) {
	InfoLog.Println("GET Request for /players")
	// Method to add a player to the existing collection of player data
	// TODO: this would also be a call to a persistent db layer via service call

	/* EX:
	curl http://localhost:8080/players \
	--include \
	--header "Content-Type: application/json" \
	--request "POST" \
	--data '{"id": "7", "name": "William Nylander", "position": "F", "professional_team_id": "TOR", "fantasy_team_id": "1", "salary": 11500000}'
	*/

	var newPlayer player

	// Call BindJSON to bind the received JSON to newPlayer -- verify it is of `player` shape
	if err := c.BindJSON(&newPlayer); err != nil {
		ErrorLog.Println("Unable to marshall this request into a player struct")
		return
	}

	players = append(players, newPlayer)
	InfoLog.Println("Successfully added newPlayer: ", newPlayer.Name)
	c.IndentedJSON(http.StatusCreated, newPlayer)
}
