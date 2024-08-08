package db

import (
	"database/sql"

	"github.com/gockey/data/models"
	"github.com/gockey/util"
	_ "github.com/mattn/go-sqlite3"
)

func (curs *DatabaseCursor) AddPlayerToDB(player models.Player) (int, error) {
	res, err := curs.db.Exec("INSERT INTO players VALUES(?,?,?,?,?)", player.ID, player.Name, player.Position, player.NHL_Team_Code, player.Salary)
	if err != nil {
		util.ErrorLog.Println("Unable to insert player into table")
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
	rows, err := curs.db.Query(
		"SELECT * FROM players WHERE ID > ? ORDER BY id DESC LIMIT 100", offset)
	if err != nil {
		util.ErrorLog.Println("Unable to fetch all players")
		return nil, err
	}

	defer rows.Close()
	data := []models.Player{}
	for rows.Next() {
		i := models.Player{}
		err = rows.Scan(&i.ID, &i.Name, &i.Position, &i.NHL_Team_Code, &i.Salary)
		if err != nil {
			return nil, err
		}
		data = append(data, i)
	}

	return data, nil
}

func (curs *DatabaseCursor) GetPlayerByIdFromDB(id string) (models.Player, error) {
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
