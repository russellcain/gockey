package db

import (
	"database/sql"
	"fmt"

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
func (curs *DatabaseCursor) GetLeagueByIdFromDB(id string) (models.League, error) {
	const sqlStatement string = `SELECT * FROM leagues WHERE id=$1;`
	const getTeamIds string = `SELECT * FROM teams WHERE league_id=$1;`
	retrieved_league := models.League{}
	row := curs.db.QueryRow(sqlStatement, id)
	switch err := row.Scan(&retrieved_league.ID, &retrieved_league.Name); err {
	case sql.ErrNoRows:
		util.InfoLog.Println("No rows were returned!")
		return models.League{}, sql.ErrNoRows
	case nil:
		fmt.Println("LOOK WE GOT A LEAGUE", retrieved_league)

		// this means we are humming! let's fetch the team objects now
		rows, err := curs.db.Query(getTeamIds, id)
		if err != nil {
			util.ErrorLog.Println("Was able to fetch the league, but not the teams", err)
			return retrieved_league, err
		}
		defer rows.Close()
		teams := []models.Team{}
		for rows.Next() {
			team := models.Team{}
			team.Players = []models.Player{} // init empty value
			err = rows.Scan(&team.ID, &team.Name, &team.Owner, &team.League_ID)
			if err != nil {
				util.ErrorLog.Println("Was able to fetch the league, choked on an individual team", err)
				return retrieved_league, err
			}
			teams = append(teams, team)
		}
		retrieved_league.Teams = teams
		fmt.Println("LOOK WE GOT ALL THE TEAMS?", teams)
		return retrieved_league, nil

	default:
		util.ErrorLog.Println("Unexpected error in fetching a league by id?", err)
		return models.League{}, err
	}
}
