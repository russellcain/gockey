package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gockey/data"
	"github.com/gockey/data/models"
	"github.com/gockey/nhl_scraper/api"
	"github.com/gockey/util"
)

func add_player_to_db(player api.Player_resp, team_code string) {
	wrapped_player := models.Player{
		ID:            player.ID,
		NHL_Team_Code: team_code,
		Name:          player.FirstName.Value + string(' ') + player.LastName.Value,
		Position:      player.Position,
		Salary:        0, // NOTE: we need to pull this in eventually, but let's init empty
	}

	var generated_id int = data.AddPlayer(wrapped_player)
	util.InfoLog.Println("Successfully Inserted", generated_id)
}

func get_roster_by_team_tricode(team_tricode string) {
	response, err := http.Get(fmt.Sprintf("https://api-web.nhle.com/v1/roster/%s/20242025", team_tricode))

	if err != nil {
		util.InfoLog.Println("Wasn't able to fetch team data for", team_tricode)
		return
	}

	team_data, err := io.ReadAll(response.Body)
	if err != nil {
		util.ErrorLog.Println(err)
		return
	}

	var team_response api.Roster_resp
	err = json.Unmarshal(team_data, &team_response)
	if err != nil {
		util.ErrorLog.Println("THROWING THIS ERROR", err)
		return
	}
	util.InfoLog.Println("Here's the roster for ", team_tricode)
	util.InfoLog.Println("\t Forwards")
	for _, player := range team_response.Forwards {
		util.InfoLog.Println("\t\t-", player.Number, player.FirstName.Value, player.LastName.Value)
		add_player_to_db(player, team_tricode)
	}
	util.InfoLog.Println("\t Defensemen")
	for _, player := range team_response.Defensemen {
		util.InfoLog.Println("\t\t-", player.Number, player.FirstName.Value, player.LastName.Value)
		add_player_to_db(player, team_tricode)
	}
	util.InfoLog.Println("\t Goalies")
	for _, player := range team_response.Goalies {
		util.InfoLog.Println("\t\t-", player.Number, player.FirstName.Value, player.LastName.Value)
		add_player_to_db(player, team_tricode)
	}
}

/*
This script pulls in all active nhl players (i.e. currently on nhl teams). It will then create/use a

	db connection (via separate service) to fill the player db with those values.

The script should be executed upon deployment or whenever the player db is identified as being empty (crashback)
*/
func main() {
	// get_roster_by_team_tricode("PIT")
	response, err := http.Get("https://api.nhle.com/stats/rest/en/team")
	// for each entry in here, grab the raw tricode and see if the team is still active?? annoying we can filter
	// maybe it is worthwhile just maintaining a static list of the active team codes, idk
	// alternatively, go through the standings and pull all active team tricodes that way?
	if err != nil {
		util.ErrorLog.Print(err.Error())
		os.Exit(1)
	}

	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		util.ErrorLog.Println(err)
		return
	}

	var responseObject api.Api_resp
	json.Unmarshal(responseData, &responseObject)
	util.InfoLog.Println(responseObject.Data)
	for _, team := range responseObject.Data {
		get_roster_by_team_tricode(team.Code)
	}
}
