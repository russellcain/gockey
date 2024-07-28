package models

// team struct definition
type Team struct {
	ID         string   `json:"id"`
	Name       string   `json:"name"`
	Owner      string   `json:owner`
	League     string   `json:"league"`
	Player_IDs []string `json:"player_ids"`
}
