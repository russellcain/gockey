package scripts

import (
	"github.com/gockey/data/db"
	"github.com/gockey/util"
)

/*
This function hits our db and pulls in a random grab of as many players as specified.
*/
func get_random_assortment_of_player_ids(number int) []int64 {
	for i := 1; i <= number; i++ {

	}
}

// This grabs some sample players per new team and initiaze them, per league in the db
// It need only be run once, but it should be kicked off upon deployment, tests?
func seed_team_database() {

	var dbClient, err = db.GetInitializedDBClient()
	if err != nil {
		util.ErrorLog.Println("Unable to seed team db")
		return
	}

	for _, element := range get_random_assortment_of_player_ids(10) {
		generated_id, err := dbClient.AddPlayerToDB(element)
		if err != nil {
			util.ErrorLog.Printf("Issue sticking %s into the table", element.Name)
		}

		util.InfoLog.Printf("Inserted %s Player with generated id of %s", element.Name, generated_id)
	}

}
