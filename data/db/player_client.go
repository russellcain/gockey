package db

import (
	"database/sql"

	"github.com/gockey/data/models"
	"github.com/gockey/util"
	_ "github.com/mattn/go-sqlite3"
)

func (curs *DatabaseCursor) AddPlayerToDB(player models.Player) (int, error) {
	res, err := curs.db.Exec("INSERT INTO players (id, name, photo, position, nhl_team_code, nhl_team_name, salary)VALUES(?,?,?,?,?,?,?)", player.ID, player.Name, player.Photo, player.Position, player.NHL_Team_Code, player.NHL_Team_Name, player.Salary)
	if err != nil {
		util.ErrorLog.Println("Unable to insert player into table", err)
		return 0, err
	}

	var id int64
	if id, err = res.LastInsertId(); err != nil {
		util.ErrorLog.Println("Unable to retrieve generated guid for new player row?")
		return 0, err
	}

	return int(id), nil
}

func (curs *DatabaseCursor) GetPlayersFromDB(offset int) ([]models.Player, error) {
	rows, err := curs.db.Query("SELECT * FROM players WHERE ID > ? ORDER BY id DESC LIMIT 100", offset)
	if err != nil {
		util.ErrorLog.Println("Unable to fetch all players")
		return nil, err
	}

	defer rows.Close()
	players := []models.Player{}
	for rows.Next() {
		retrieved_player := models.Player{}
		err = rows.Scan(
			&retrieved_player.ID,
			&retrieved_player.Name,
			&retrieved_player.Photo,
			&retrieved_player.Position,
			&retrieved_player.NHL_Team_Code,
			&retrieved_player.NHL_Team_Name,
			&retrieved_player.Salary,
		)
		if err != nil {
			util.ErrorLog.Println("Unable to marshall players from db", err)
			return nil, err
		}
		players = append(players, retrieved_player)
	}

	return players, nil
}

func (curs *DatabaseCursor) GetPlayerByIdFromDB(id string) (models.Player, error) {
	const sqlStatement string = `SELECT * FROM players WHERE id=$1;`

	retrieved_player := models.Player{}
	row := curs.db.QueryRow(sqlStatement, id)
	switch err := row.Scan(
		&retrieved_player.ID,
		&retrieved_player.Name,
		&retrieved_player.Photo,
		&retrieved_player.Position,
		&retrieved_player.NHL_Team_Code,
		&retrieved_player.NHL_Team_Name,
		&retrieved_player.Salary); err {
	case sql.ErrNoRows:
		util.InfoLog.Println("No rows were returned!")
		return models.Player{}, sql.ErrNoRows
	case nil:
		return retrieved_player, nil
	default:
		util.ErrorLog.Println("Unexpected error in fetching a player by id?")
		return models.Player{}, err
	}
}

func (curs *DatabaseCursor) AddPlayerToTeamInRefDB(league_id string, team_id string, player_id string) error {
	_, err := curs.db.Exec("INSERT INTO ref_table (league_id, team_id, player_id, status)VALUES(?,?,?,?)", league_id, team_id, player_id, "added")
	if err != nil {
		util.ErrorLog.Println("Unable to insert player into table", err)
		return err
	}

	return nil
}

func (curs *DatabaseCursor) RemovePlayerFromTeamInRefDB(league_id string, team_id string, player_id string) error {
	_, err := curs.db.Exec("INSERT INTO ref_table (league_id, team_id, player_id, status)VALUES(?,?,?,?)", league_id, team_id, player_id, "removed")
	if err != nil {
		util.ErrorLog.Println("Unable to insert player into table", err)
		return err
	}

	return nil
}

// does a check on a given player's id within a league (in ref_table) and sees if the active status is the most recent
func (curs *DatabaseCursor) IsPlayerOnTeamInGivenLeague(league_id string, player_id string) (bool, error) {
	row := curs.db.QueryRow("SELECT status, player_id from ref_table where league_id=? and player_id=? order by create_date desc;", league_id, player_id)
	var refTableObj models.RefTable = models.RefTable{}
	err := row.Scan(&refTableObj.Status, &refTableObj.PlayerID)

	return nil
}
