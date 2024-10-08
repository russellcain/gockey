package service

import (
	"github.com/gockey/data/models"
	"github.com/gockey/util"
)

func GetPlayers() ([]models.Player, error) {
	players, err := db_client.GetPlayersFromDB(0)
	if err != nil {
		util.ErrorLog.Println("Player Service ack that we can't read players")
	}
	return players, nil
}

type PlayerNotFoundErr struct{}

func (m *PlayerNotFoundErr) Error() string {
	return "Player Not Found"
}

// query the player table by supplied id
func GetPlayerById(id string) (models.Player, error) {
	player, err := db_client.GetPlayerByIdFromDB(id)
	if err != nil {
		return models.Player{}, &PlayerNotFoundErr{}
	}
	return player, nil
}

func AddPlayer(newPlayer models.Player) (int, error) {
	util.InfoLog.Println("Adding player to database")
	// Method to add a player to the existing collection of player data
	// TODO: this would also be a call to a persistent db layer via service call
	id, err := db_client.AddPlayerToDB(newPlayer)
	if err != nil {
		util.ErrorLog.Println("service layer ack of inability to add player", err)
		return 0, err
	}
	util.InfoLog.Println("Successfully added newPlayer: ", id)
	return id, nil
}
