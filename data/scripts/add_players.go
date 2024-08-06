package scripts

import (
	"github.com/gockey/data/models"
	"github.com/gockey/util"
)

// This method sticks in some sample player data into the sql table.
// It need only be run once, but it should be kicked off upon deployment, tests?
func seed_player_database() {
	// example players to vet shape
	var players = []models.Player{
		{Name: "Auston Matthews", Position: "F", NHL_Team_Code: "TOR", Salary: 13250000},
		{Name: "Nathan McKinnon", Position: "F", NHL_Team_Code: "COR", Salary: 12600000},
		{Name: "Tyler Bertuzzi", Position: "F", NHL_Team_Code: "CHI", Salary: 5500000},
		{Name: "Cale Makar", Position: "D", NHL_Team_Code: "COR", Salary: 9000000},
		{Name: "Moritz Seider", Position: "D", NHL_Team_Code: "DET", Salary: 925000},
		{Name: "Andrei Vasilevskiy", Position: "G", NHL_Team_Code: "TPA", Salary: 9500000},
	}

	var playersClient, err = NewPlayersClient()
	if err != nil {
		util.ErrorLog.Println("Unable to seed player db")
		return
	}

	for _, element := range players {
		generated_id, err := playersClient.AddPlayerToDB(element)
		if err != nil {
			util.ErrorLog.Printf("Issue sticking %s into the table", element.Name)
		}

		util.InfoLog.Printf("Inserted %s Player with generated id of %s", element.Name, generated_id)
	}

}
