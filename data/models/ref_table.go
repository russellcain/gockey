package models

type RefTable struct {
	LeagueID int64  `json:"league_id"`
	TeamID   int64  `json:"team_id"`
	PlayerID int64  `json:"player_id"`
	Status   string `json:"status"`
}
