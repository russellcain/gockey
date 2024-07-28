package models

// player struct definition
type Player struct {
	ID              string  `json:"id"`
	Name            string  `json:"name"`
	Position        string  `json:"position"`
	NHL_Team_ID     string  `json:"nhl_team_id"`
	Fantasy_Team_ID string  `json:"fantasy_team_id"`
	Salary          float64 `json:"salary"`
}
