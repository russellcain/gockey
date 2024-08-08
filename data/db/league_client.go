package db

import (
	"database/sql"

	"github.com/gockey/data/models"
	"github.com/gockey/util"
	_ "github.com/mattn/go-sqlite3"
)

func (curs *DatabaseCursor) AddLeagueToDB(league models.League) (int, error) {
	res, err := curs.db.Exec("INSERT INTO leagues VALUES(NULL,?)", league.Name)
	if err != nil {
		util.ErrorLog.Println("Unable to insert league into table")
		return 0, err
	}

	var id int64
	if id, err = res.LastInsertId(); err != nil {
		util.ErrorLog.Println("Unable to retrieve generated guid for new league row?")
		return 0, err
	}

	return int(id), nil
}

func (curs *DatabaseCursor) GetLeaguesFromDB(offset int) ([]models.League, error) {
	rows, err := curs.db.Query(
		"SELECT * FROM leagues WHERE ID > ? ORDER BY id DESC LIMIT 100", offset)
	if err != nil {
		util.ErrorLog.Println("Unable to fetch all leagues")
		return nil, err
	}

	defer rows.Close()
	leagues := []models.League{}
	for rows.Next() {
		league := models.League{}
		err = rows.Scan(&league.ID, &league.Name)
		if err != nil {
			return nil, err
		}
		leagues = append(leagues, league)
	}

	return leagues, nil
}

// This is akin to a method to list teams
func (curs *DatabaseCursor) GetLeagueByIdFromDB(id string) (models.Player, error) {
	const sqlStatement string = `SELECT * FROM players WHERE id=$1;`

	retrieved_player := models.Player{}
	row := curs.db.QueryRow(sqlStatement, id)
	switch err := row.Scan(&retrieved_player.ID, &retrieved_player.Name,
		&retrieved_player.Position, &retrieved_player.NHL_Team_Code, &retrieved_player.Salary); err {
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
