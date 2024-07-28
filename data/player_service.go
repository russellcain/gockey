package data

import (
	"github.com/gockey/data/models"
	"github.com/gockey/util"
)

func GetPlayers() []models.Player {
	return players
}

type PlayerNotFoundErr struct{}

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
