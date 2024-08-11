package service

import (
	"github.com/gockey/data/models"
	"github.com/gockey/util"
)

func GetTeams(league_id int) ([]models.Team, error) {
	players, err := db_client.GetTeamsFromDatabase(league_id)
	if err != nil {
		return nil, err
	}
	return players, nil
}

// query the player table by supplied id
func GetTeamById(team_id string, league_id string) (models.Team, error) {
	team, err := db_client.GetTeamByIdFromDB(team_id, league_id)
	if err != nil {
		return models.Team{}, err
	}
	return team, nil
}

func AddTeam(newTeam models.Team) int {
	util.InfoLog.Println("Adding player to database")
	// Method to add a player to the existing collection of player data
	// TODO: this would also be a call to a persistent db layer via service call
	id, err := db_client.AddTeamToDB(newTeam)
	if err != nil {
		util.ErrorLog.Println("service layer ack of inability to add team")
	}
	util.InfoLog.Println("Successfully added newTeam: ", id)
	return id
}
