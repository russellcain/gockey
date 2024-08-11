package main

import (
	"fmt"
	"time"

	// importing Colly
	"github.com/gocolly/colly"
)

/*
HELPER TEXT: https://benjamincongdon.me/blog/2018/03/01/Scraping-the-Web-in-Golang-with-Colly-and-Goquery/
*/

var PAGES_TO_VISIT []string = []string{
	"buffalo-sabres",
	"boston-bruins",
	"detroit-red-wings",
	"florida-panthers",
	"montreal-canadiens",
	"ottawa-senators",
	"tampa-bay-lightning",
	"toronto-maple-leafs",
	"columbus-blue-jackets",
	"carolina-hurricanes",
	"new-jersey-devils",
	"new-york-islanders",
	"new-york-rangers",
	"philadelphia-flyers",
	"pittsburgh-penguins",
	"washington-capitals",
	"colorado-avalanche",
	"chicago-blackhawks",
	"dallas-stars",
	"minnesota-wild",
	"nashville-predators",
	"st-louis-blues",
	"utah-hockey-club",
	"winnipeg-jets",
	"anaheim-ducks",
	"calgary-flames",
	"edmonton-oilers",
	"los-angeles-kings",
	"san-jose-sharks",
	"seattle-kraken",
	"vancouver-canucks",
	"vegas-golden-knights",
}

const DOMAIN string = "www.spotrac.com"

var NHL_BASE_PAGE string = fmt.Sprintf("https://%s/nhl", DOMAIN)
var NHL_TEAM_PAGE string = fmt.Sprintf("%s/contracts", NHL_BASE_PAGE)

func get_team_salary_page(team_string string) string {
	return fmt.Sprintf("%s/%s/yearly/_/sort/cap_total/view/roster", NHL_BASE_PAGE, team_string)
}

/*
This match is where we have weakness; the salary data is not tied into the nhl endpoint and
therefore we need to ~ascertain~ which player in our db this matches to vs update via pkid
So I *think* uniqueness will be found in a combination of:
  - Player Name
  - Player Team

It would make more sense for jersey number and team to be the most accurate, but some of
that data might be a mess because rookies/AHL players dont have a number just yet.
*/
func contract_row_to_player() {

}

type TeamPage struct {
}

/*
This function will first go to the spotrac page and pull down their list of teams
  - i.e. 'TOR Maple Leafs' --> 'toronto-maple-leafs' in the url

then it will iterate across these teams and pull down the roster per team using:
  - `https://www.spotrac.com/nhl/<team-name>/yearly/_/sort/cap_total/view/roster`
*/
func main() {

	// instantiate a new collector object
	c := colly.NewCollector(
		colly.AllowedDomains(DOMAIN),
	)

	c.Limit(&colly.LimitRule{
		// Filter domains affected by this rule
		DomainGlob: fmt.Sprintf("%s/*", DOMAIN),
		// Set a delay between requests to these domains
		Delay: 1 * time.Second,
		// Add an additional random delay
		RandomDelay: 1 * time.Second,
	})

	// called before an HTTP request is triggered
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting: ", r.URL)
	})

	// triggered when the scraper encounters an error
	c.OnError(func(_ *colly.Response, err error) {
		fmt.Println("Something went wrong: ", err)
	})

	// fired when the server responds
	c.OnResponse(func(r *colly.Response) {
		fmt.Println("Page visited: ", r.Request.URL)
	})

	// triggered once scraping is done (e.g., write the data to a CSV file)
	c.OnScraped(func(r *colly.Response) {
		fmt.Println(r.Request.URL, " scraped!")
	})

	c.OnHTML(".form-select", func(drop_down *colly.HTMLElement) {
		// Now we need to look into the team dropdowns and see if we can get the href?
		// fmt.Println("hit a match", drop_down.Name)
		// if drop_down.Attr("name") == "team" {
		// 	fmt.Printf("But now hit a super match")
		// 	drop_down.ForEach("option", func(_ int, elem *colly.HTMLElement) {
		// 		for _, node := range elem.DOM.Nodes {
		// 			fmt.Println("\tATTR", node.Attr)
		// 		}
		// 		fmt.Println(elem.Text)
		// 	})

		// }

	})

	c.OnHTML(".dropdown-menu", func(drop_down *colly.HTMLElement) {
		fmt.Println("hit a match", drop_down.Name)
		for _, node := range drop_down.DOM.Nodes {
			fmt.Println("\tATTR", node.Attr)
		}
	})

	c.Visit(NHL_TEAM_PAGE)
}
