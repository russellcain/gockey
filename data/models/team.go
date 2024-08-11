package models

// team struct definition
type Team struct {
	ID        string   `json:"id"`
	Name      string   `json:"name"`
	Owner     string   `json:"owner"`
	League_ID string   `json:"league_id"`
	Players   []Player `json:"players"`
}
