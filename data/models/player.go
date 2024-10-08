package models

// player struct definition
type Player struct {
	ID            int64   `json:"id"`
	Name          string  `json:"name"`
	Photo         string  `json:"photo"`
	Position      string  `json:"position"`
	NHL_Team_Code string  `json:"nhl_team_code"`
	NHL_Team_Name string  `json:"nhl_team_name"`
	Salary        float64 `json:"salary"`
}
