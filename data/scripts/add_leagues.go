package scripts

import (
	"github.com/gockey/data/constants"
	"github.com/gockey/data/db"
	"github.com/gockey/util"
)

// This method sticks in some sample player data into the sql table.
// It need only be run once, but it should be kicked off upon deployment, tests?
func seed_league_database() {
	// example players to vet shape

	var db_client, err = db.GetInitializedDBClient()
	if err != nil {
		util.ErrorLog.Println("Unable to get db connection")
		return
	}

	for _, league := range constants.SampleLeagues {
		generated_id, err := db_client.AddLeagueToDB(league)
		if err != nil {
			util.ErrorLog.Printf("Issue sticking %s into the table", league.Name)
		}

		util.InfoLog.Printf("Inserted %s League with generated id of %d", league.Name, generated_id)
	}

}
