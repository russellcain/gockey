package constants

import (
	"fmt"
)

const TABLE_PLAYER_NAME string = "players"
const TABLE_TEAM_NAME string = "teams"
const TABLE_LEAGUE_NAME string = "leagues"
const REF_TABLE string = "ref_table"

type DB_Init_Script struct {
	Label  string
	Script string
}

/*
This method takes the scripts we need to initialize the requred tables and confirms they are ordered.

	The scripts shouldn't be referenced outside of this method so this is also the controlled entrypoint.
*/
func CreateScriptsIter() []DB_Init_Script {
	var script_list = []DB_Init_Script{
		{
			Label:  "League",
			Script: createLeagueTable,
		},
		{
			Label:  "Team",
			Script: createTeamTable,
		},
		{
			Label:  "Player",
			Script: createPlayerTable,
		},
		{
			Label:  "PlayerToTeam",
			Script: createPlayerToTeamTable,
		},
	}
	return script_list
}

var createPlayerTable string = fmt.Sprintf(`
	CREATE TABLE IF NOT EXISTS %s (
		id INTEGER NOT NULL PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		image_url VARCHAR(40),
		position VARCHAR(40),
		nhl_team_code VARCHAR(40),
		nhl_team_name VARCHAR(40),
		salary INTEGER
	);
`, TABLE_PLAYER_NAME)

var createTeamTable string = fmt.Sprintf(`
	CREATE TABLE IF NOT EXISTS %s (
		id INTEGER NOT NULL PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		owner VARCHAR(40),
		league_id INTEGER NOT NULL,
		FOREIGN KEY(league_id) REFERENCES %s(id)
	);
`, TABLE_TEAM_NAME, TABLE_LEAGUE_NAME)

var createPlayerToTeamTable string = fmt.Sprintf(`
	CREATE TABLE IF NOT EXISTS %s (
		league_id INTEGER NOT NULL,
		team_id INTEGER NOT NULL,
		player_id INTEGER NOT NULL,
		FOREIGN KEY(league_id) REFERENCES %s(id),
		FOREIGN KEY(team_id) REFERENCES %s(id),
		FOREIGN KEY(player_id) REFERENCES %s(id)
	);
`, REF_TABLE, TABLE_LEAGUE_NAME, TABLE_TEAM_NAME, TABLE_PLAYER_NAME)

var createLeagueTable string = fmt.Sprintf(`
	CREATE TABLE IF NOT EXISTS %s (
		id INTEGER NOT NULL PRIMARY KEY,
		name VARCHAR(255) NOT NULL
	);
`, TABLE_LEAGUE_NAME)
