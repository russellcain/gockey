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
	id, err := db_client.AddPlayerToDB(newPlayer)
	if err != nil {
		util.ErrorLog.Println("service layer ack of inability to add player", err)
		return 0, err
	}
	util.InfoLog.Println("Successfully added newPlayer: ", id)
	return id, nil
}

// given a league, team, player, add a record which marks this player as being 'added'
// NOTE: business logic will be added to ensure that this player is not already marked as active* in that league
//   - active meaning that the most recent entry for that player is "added" to a team
func AddPlayerToTeam(league_id string, team_id string, player_id string) error {
	util.InfoLog.Printf("Adding player:%s to team:%s in league:%s", player_id, team_id, league_id)
	// Method to add a player to the existing collection of player data

	err := db_client.AddPlayerToTeamInRefDB(league_id, team_id, player_id)
	if err != nil {
		util.ErrorLog.Println("service layer ack of inability to add player to team", err)
		return err
	}
	util.InfoLog.Printf("Successfully added player:%s to team:%s in league:%s", player_id, team_id, league_id)
	return nil
}

// given a league, team, player, add a record which marks this player as being 'removed'
func RemovePlayerFromTeam(league_id string, team_id string, player_id string) error {
	util.InfoLog.Printf("Adding player:%s to team:%s in league:%s", player_id, team_id, league_id)
	// Method to add a player to the existing collection of player data
	err := db_client.RemovePlayerFromTeamInRefDB(league_id, team_id, player_id)
	if err != nil {
		util.ErrorLog.Println("service layer ack of inability to remove player to team", err)
		return err
	}
	util.InfoLog.Printf("Successfully removed player:%s from team:%s in league:%s", player_id, team_id, league_id)
	return nil
}
