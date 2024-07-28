package data

import (
	"database/sql"
	"github.com/gockey/data/models"
	"github.com/gockey/util"
	_ "github.com/mattn/go-sqlite3"
)

const db_file string = "players.db"
const create string = `
CREATE TABLE IF NOT EXISTS players (
id INTEGER NOT NULL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
position VARCHAR(40),
nhl_team_id VARCHAR(40),
salary INTEGER
);
`

type PlayerCursor struct {
	db *sql.DB
	// mu sync.Mutex
}

func NewPlayers() (*PlayerCursor, error) {
	db, err := sql.Open("sqlite3", db_file)
	if err != nil {
		util.ErrorLog.Println("Could not connect to the players.db")
		return nil, err
	}
	if _, err := db.Exec(create); err != nil {
		util.ErrorLog.Println("Could not intialize the player table")
		return nil, err
	}
	return &PlayerCursor{
		db: db,
	}, nil
}

func (curs *PlayerCursor) AddPlayerToDB(player models.Player) (int, error) {
	res, err := curs.db.Exec("INSERT INTO players VALUES(NULL,?,?,?,?)", player.Name, player.Position, player.NHL_Team_ID, player.Salary)
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

func (curs *PlayerCursor) GetPlayersFromDB(offset int) ([]models.Player, error) {
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
		err = rows.Scan(&i.ID, &i.Name, &i.Position, &i.NHL_Team_ID, &i.Salary)
		if err != nil {
			return nil, err
		}
		data = append(data, i)
	}

	return data, nil
}

// example players to vet shape
var players = []models.Player{
	{ID: 1, Name: "Auston Matthews", Position: "F", NHL_Team_ID: "TOR", Salary: 13250000},
	{ID: 2, Name: "Nathan McKinnon", Position: "F", NHL_Team_ID: "COR", Salary: 12600000},
	{ID: 3, Name: "Tyler Bertuzzi", Position: "F", NHL_Team_ID: "CHI", Salary: 5500000},
	{ID: 4, Name: "Cale Makar", Position: "D", NHL_Team_ID: "COR", Salary: 9000000},
	{ID: 5, Name: "Moritz Seider", Position: "D", NHL_Team_ID: "DET", Salary: 925000},
	{ID: 6, Name: "Andrei Vasilevskiy", Position: "G", NHL_Team_ID: "TPA", Salary: 9500000},
}
