package db

import (
	"github.com/gockey/data/models"
	"github.com/gockey/util"
	_ "github.com/mattn/go-sqlite3"
)

func (curs *DatabaseCursor) AddPlayerToTeamDB(team models.Team) (int, error) {
	res, err := curs.db.Exec("INSERT INTO teams VALUES(?,?,?,?,?)", team.ID, team.Name, team.Owner, team.League_ID)
	if err != nil {
		util.ErrorLog.Println("Unable to insert team into table")
		return 0, err
	}

	var id int64
	if id, err = res.LastInsertId(); err != nil {
		util.ErrorLog.Println("Unable to retrieve generated guid for new team row?")
		return 0, err
	}

	return int(id), nil
}

// this view should include the players on the team, and requires a league id
func (curs *DatabaseCursor) GetPlayersByTeamIDDB(id string) (models.Team, error) {
	const fetchPlayersQuery string = `
		SELECT p.* FROM players p
			join teams_players_ref tpr on p.id == tpr.player_id
				and tpr.team_id=$1;`

	retrieved_team := models.Team{}

	rows, err := curs.db.Query(fetchPlayersQuery, id) // so i dont think we need to limit
	if err != nil {
		util.ErrorLog.Println("Unable to fetch players on team:", id)
		return retrieved_team, err
	}

	defer rows.Close()
	player := models.Player{}
	for rows.Next() {
		team := models.Team{}
		err = rows.Scan(&team.ID, &team.Name, &team.Owner, &team.League_ID) // don't include players here
		if err != nil {
			// then bail early and just show the data we have (not ideal)
			return retrieved_team, nil
		}
		retrieved_team.Players = append(retrieved_team.Players, player)
	}

	return retrieved_team, nil

}
