package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/gocolly/colly"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

// Player represents a single player's data
type Player struct {
	Name         string `json:"name"`
	Age          string `json:"age"`
	Pos          string `json:"pos"`
	SalaryCapHit string `json:"salary_cap_hit"`
	Team         string `json:"team"`
}

var PAGES_TO_VISIT []string = []string{
	"buffalo_sabres",
	"boston_bruins",
	"detroit_red_wings",
	"florida_panthers",
	"montreal_canadiens",
	"ottawa_senators",
	"tampa_bay_lightning",
	"toronto_maple_leafs",
	"columbus_blue_jackets",
	"carolina_hurricanes",
	"new_jersey_devils",
	"new_york_islanders",
	"new_york_rangers",
	"philadelphia_flyers",
	"pittsburgh_penguins",
	"washington_capitals",
	"colorado_avalanche",
	"chicago_blackhawks",
	"dallas_stars",
	"minnesota_wild",
	"nashville_predators",
	"st_louis_blues",
	"utah_mammoth",
	"winnipeg_jets",
	"anaheim_ducks",
	"calgary_flames",
	"edmonton_oilers",
	"los_angeles_kings",
	"san_jose_sharks",
	"seattle_kraken",
	"vancouver_canucks",
	"vegas_golden_knights",
}

const DOMAIN string = "capwages.com"

var NHL_BASE_PAGE string = fmt.Sprintf("https://%s", DOMAIN)

func get_team_salary_page(team_string string) string {
	return fmt.Sprintf("%s/teams/%s", NHL_BASE_PAGE, team_string)
}

func get_capitalized_team_name(raw_team_name string) string {
	caser := cases.Title(language.English)
	return caser.String(strings.ReplaceAll(raw_team_name, "_", " "))
}

func get_capitalized_player_name(raw_player_name string) string {
	fmt.Println("FOMRATING THIS NAME", raw_player_name)
	if strings.Contains(raw_player_name, ",") {
		name_parts := strings.Split(raw_player_name, ", ")
		return fmt.Sprintf("%s %s", name_parts[1], name_parts[0])
	}
	return raw_player_name
}

func get_simple_position(raw_position_csv string) string {
	fmt.Println("FOMRATING THIS Position", raw_position_csv)
	if strings.Contains(raw_position_csv, "G") {
		return raw_position_csv
	} else if strings.Contains(raw_position_csv, "D") {
		return "D"
	} else {
		return "F"
	}

}

func main() {
	// Create a new collector
	c := colly.NewCollector()

	// Slice to hold the players
	var players []Player
	var currentTeam string

	// Find and visit all table rows
	c.OnHTML("table.teamProfileRosterSection__table tbody tr", func(e *colly.HTMLElement) {
		player := Player{}
		player.Name = get_capitalized_player_name(e.ChildText("td:nth-child(1) a"))
		player.Age = e.ChildText("td:nth-child(7)")
		player.Pos = get_simple_position(e.ChildText("td:nth-child(4)"))
		player.Team = get_capitalized_team_name(currentTeam)
		allSals := strings.Split(e.ChildText("td:nth-child(10) div"), "$")
		if e.ChildText("td:nth-child(5)") == "Retired" {
			return
		}
		if allSals[0] == "RFA" || allSals[0] == "UFA" {
			return // we don't care about this player right now. go get paid, buddy
		} else if len(allSals) == 0 {
			return
		} else {
			player.SalaryCapHit = allSals[1]
			players = append(players, player)
		}
		fmt.Println("player:", player)
	})

	// Before visiting, log the URL
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})
	for _, team := range PAGES_TO_VISIT {
		currentTeam = team
		url_to_visit := get_team_salary_page(team)
		err := c.Visit(url_to_visit)
		if err != nil {
			log.Fatal(err)
		}

		// Convert the players slice to JSON and print it
		enc := json.NewEncoder(os.Stdout)
		enc.SetIndent("", "  ")
		enc.Encode(players)
	}
	jsonString, _ := json.Marshal(players)
	err := os.WriteFile("player-salaries.json", jsonString, 0644) // 0644 for readable by all, writable by owner
	if err != nil {
		panic(err) // Handle error appropriately
	}

	println("JSON file written successfully!")

}
