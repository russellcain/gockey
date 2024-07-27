package data

import (
	"github.com/gockey/util"
)
// player struct definition
type Player struct {
	ID                   string  `json:"id"`
	Name                 string  `json:"name"`
	Position             string  `json:"position"`
	Professional_Team_ID string  `json:"professional_team_id"`
	Fantasy_Team_ID      string  `json:"fantasy_team_id"`
	Salary               float64 `json:"salary"`
}

// example players to vet shape
var players = []Player{
	{ID: "1", Name: "Auston Matthews", Position: "F", Professional_Team_ID: "TOR", Fantasy_Team_ID: "1", Salary: 13250000},
	{ID: "2", Name: "Nathan McKinnon", Position: "F", Professional_Team_ID: "COR", Fantasy_Team_ID: "1", Salary: 12600000},
	{ID: "3", Name: "Tyler Bertuzzi", Position: "F", Professional_Team_ID: "CHI", Fantasy_Team_ID: "1", Salary: 5500000},
	{ID: "4", Name: "Cale Makar", Position: "D", Professional_Team_ID: "COR", Fantasy_Team_ID: "1", Salary: 9000000},
	{ID: "5", Name: "Moritz Seider", Position: "D", Professional_Team_ID: "DET", Fantasy_Team_ID: "1", Salary: 925000},
	{ID: "6", Name: "Andrei Vasilevskiy", Position: "G", Professional_Team_ID: "TPA", Fantasy_Team_ID: "1", Salary: 9500000},
}

func GetPlayers() []Player {
	return players
}

type PlayerNotFoundErr struct {}

func (m *PlayerNotFoundErr) Error() string {
	return "Player Not Found"
}

func GetPlayerById(id string) (Player, error) {
	// grab the current players and loop until we get a match
	player := Player{}
	for _, player := range players {
		if player.ID == id {
			util.InfoLog.Println("Found", player.ID, player.Name)
			return player, nil
		}
	}
	return player, &PlayerNotFoundErr{}
}

func AddPlayer(newPlayer Player) Player {
	util.InfoLog.Println("Adding player to database")
	// Method to add a player to the existing collection of player data
	// TODO: this would also be a call to a persistent db layer via service call

	players = append(players, newPlayer)
	util.InfoLog.Println("Successfully added newPlayer: ", newPlayer.Name)
	return newPlayer
}
