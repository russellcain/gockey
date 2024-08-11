package models

type League struct {
	ID    int64  `json:"id"`
	Name  string `json:"name"`
	Teams []Team `json:"team_ids"`
}
