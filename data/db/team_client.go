package db

import (
	"database/sql"

	"github.com/gockey/data/models"
	"github.com/gockey/util"
	_ "github.com/mattn/go-sqlite3"
)

func (curs *DatabaseCursor) AddTeamToDB(team models.Team) (int, error) {
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

func (curs *DatabaseCursor) GetTeamsFromDatabase(league_id int) ([]models.Team, error) {
	rows, err := curs.db.Query(
		"SELECT * FROM teams WHERE league_id=$1 ORDER BY id DESC", league_id) // so i dont think we need to limit
	if err != nil {
		util.ErrorLog.Println("Unable to fetch all players")
		return nil, err
	}

	defer rows.Close()
	teams := []models.Team{}
	for rows.Next() {
		team := models.Team{}
		err = rows.Scan(&team.ID, &team.Name, &team.Owner, &team.League_ID) // don't include players here
		if err != nil {
			return nil, err
		}
		teams = append(teams, team)
	}

	return teams, nil
}

// this view should include the players on the team, and requires a league id
func (curs *DatabaseCursor) GetTeamByIdFromDB(team_id string, league_id string) (models.Team, error) {
	const fetchTeamQuery string = `SELECT * FROM teams WHERE id=$1 and league_id=$2;`
	const fetchPlayersQuery string = `
		SELECT p.* FROM players p
		join ref_table tpr
		on p.id == tpr.player_id
		where tpr.team_id=$1
		and tpr.league_id=$2
		and status='active';`

	retrieved_team := models.Team{}
	row := curs.db.QueryRow(fetchTeamQuery, team_id, league_id)
	switch err := row.Scan(&retrieved_team.ID, &retrieved_team.Name,
		&retrieved_team.Owner, &retrieved_team.League_ID); err {
	case sql.ErrNoRows:
		util.InfoLog.Println("No rows were returned! This mean this team doesn't yet exist; don't grab players")
		return models.Team{}, nil
	case nil:
		// sick, now let's load the players
	default:
		util.ErrorLog.Println("Unexpected error in fetching a team by id?")
	}

	rows, err := curs.db.Query(fetchPlayersQuery, team_id, league_id) // so i dont think we need to limit
	if err != nil {
		util.ErrorLog.Println("Unable to fetch players on team:", team_id)
		return retrieved_team, err
	}

	players := []models.Player{}
	for rows.Next() {
		player := models.Player{}
		err = rows.Scan(&player.ID, &player.Name, &player.Photo, &player.Position, &player.NHL_Team_Code, &player.NHL_Team_Name, &player.Salary) // don't include players here
		if err != nil {
			// then bail early and just show the data we have (not ideal)
			return retrieved_team, err
		}
		players = append(players, player)
	}
	defer rows.Close()

	retrieved_team.Players = players
	return retrieved_team, nil

}
