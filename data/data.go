package data

import (
	"github.com/gockey/data/models"
)

// example players to vet shape
var players = []models.Player{
	{ID: "1", Name: "Auston Matthews", Position: "F", NHL_Team_ID: "TOR", Fantasy_Team_ID: "1", Salary: 13250000},
	{ID: "2", Name: "Nathan McKinnon", Position: "F", NHL_Team_ID: "COR", Fantasy_Team_ID: "1", Salary: 12600000},
	{ID: "3", Name: "Tyler Bertuzzi", Position: "F", NHL_Team_ID: "CHI", Fantasy_Team_ID: "1", Salary: 5500000},
	{ID: "4", Name: "Cale Makar", Position: "D", NHL_Team_ID: "COR", Fantasy_Team_ID: "1", Salary: 9000000},
	{ID: "5", Name: "Moritz Seider", Position: "D", NHL_Team_ID: "DET", Fantasy_Team_ID: "1", Salary: 925000},
	{ID: "6", Name: "Andrei Vasilevskiy", Position: "G", NHL_Team_ID: "TPA", Fantasy_Team_ID: "1", Salary: 9500000},
}
