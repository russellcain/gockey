package service

import (
	"github.com/gockey/data/models"
	"github.com/gockey/util"
)

func GetLeagues() ([]models.League, error) {
	players, err := db_client.GetLeaguesFromDB(0)
	if err != nil {
		util.ErrorLog.Println("Player Service ack that we can't read players")
	}
	return players, nil
}

// query the player table by supplied id
func GetLeagueById(id string) (models.Player, error) {
	player, err := db_client.GetLeagueByIdFromDB(id)
	if err != nil {
		return models.Player{}, &PlayerNotFoundErr{}
	}
	return player, nil
}

func AddLeague(newLeague models.League) int {
	util.InfoLog.Println("Adding player to database")
	// Method to add a player to the existing collection of player data
	// TODO: this would also be a call to a persistent db layer via service call
	id, err := db_client.AddLeagueToDB(newLeague)
	if err != nil {
		util.ErrorLog.Println("service layer ack of inability to add league")
	}
	util.InfoLog.Println("Successfully added newLeague: ", id)
	return id
}
