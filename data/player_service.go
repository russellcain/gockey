package data

import (
	"github.com/gockey/data/models"
	"github.com/gockey/util"
)

var playersClient, err = NewPlayers()

func GetPlayers() ([]models.Player, error) {
	players, err := playersClient.GetPlayersFromDB(0)
	if err != nil {
		util.ErrorLog.Println("Player Service ack that we can't read players")
	}
	return players, nil
}

type PlayerNotFoundErr struct{}

func (m *PlayerNotFoundErr) Error() string {
	return "Player Not Found"
}

func GetPlayerById(id string) (models.Player, error) {
	// grab the current players and loop until we get a match
	player := models.Player{}
	for _, player := range players {
		if string(player.ID) == id {
			util.InfoLog.Println("Found", player.ID, player.Name)
			return player, nil
		}
	}
	return player, &PlayerNotFoundErr{}
}

func AddPlayer(newPlayer models.Player) int {
	util.InfoLog.Println("Adding player to database")
	// Method to add a player to the existing collection of player data
	// TODO: this would also be a call to a persistent db layer via service call
	id, err := playersClient.AddPlayerToDB(newPlayer)
	if err != nil {
		util.ErrorLog.Println("service layer ack of inability to add player")
	}
	util.InfoLog.Println("Successfully added newPlayer: ", id)
	return id
}
