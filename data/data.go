package data

import (
	"github.com/gockey/util"
	"github.com/gockey/data/models"
)

// example players to vet shape
var players = []models.Player{
	{ID: "1", Name: "Auston Matthews", Position: "F", NHL_Team_ID: "TOR", Fantasy_Team_ID: "1", Salary: 13250000},
	{ID: "2", Name: "Nathan McKinnon", Position: "F", NHL_Team_ID: "COR", Fantasy_Team_ID: "1", Salary: 12600000},
	{ID: "3", Name: "Tyler Bertuzzi", Position: "F", NHL_Team_ID: "CHI", Fantasy_Team_ID: "1", Salary: 5500000},
	{ID: "4", Name: "Cale Makar", Position: "D", NHL_Team_ID: "COR", Fantasy_Team_ID: "1", Salary: 9000000},
	{ID: "5", Name: "Moritz Seider", Position: "D", NHL_Team_ID: "DET", Fantasy_Team_ID: "1", Salary: 925000},
	{ID: "6", Name: "Andrei Vasilevskiy", Position: "G", NHL_Team_ID: "TPA", Fantasy_Team_ID: "1", Salary: 9500000},
}


func GetPlayers() []models.Player {
	return players
}

type PlayerNotFoundErr struct {}

func (m *PlayerNotFoundErr) Error() string {
	return "Player Not Found"
}

func GetPlayerById(id string) (models.Player, error) {
	// grab the current players and loop until we get a match
	player := models.Player{}
	for _, player := range players {
		if player.ID == id {
			util.InfoLog.Println("Found", player.ID, player.Name)
			return player, nil
		}
	}
	return player, &PlayerNotFoundErr{}
}

func AddPlayer(newPlayer models.Player) models.Player {
	util.InfoLog.Println("Adding player to database")
	// Method to add a player to the existing collection of player data
	// TODO: this would also be a call to a persistent db layer via service call

	players = append(players, newPlayer)
	util.InfoLog.Println("Successfully added newPlayer: ", newPlayer.Name)
	return newPlayer
}
