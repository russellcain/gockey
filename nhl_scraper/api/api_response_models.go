package api

/*
	{
		"id": 8481720,
		"headshot": "https://assets.nhle.com/mugs/nhl/20242025/TOR/8481720.png",
		"firstName": {
		"default": "Nick",
		"cs": "Nicholas",
		"de": "Nicholas",
		"es": "Nicholas",
		"fi": "Nicholas",
		"sk": "Nicholas",
		"sv": "Nicholas"
		},
		"lastName": {
		"default": "Abruzzese"
		},
		"sweaterNumber": 26,
		"positionCode": "C",
		"shootsCatches": "L",
		"heightInInches": 71,
		"weightInPounds": 180,
		"heightInCentimeters": 180,
		"weightInKilograms": 82,
		"birthDate": "1999-06-04",
		"birthCity": {
		"default": "Slate Hill"
		},
		"birthCountry": "USA",
		"birthStateProvince": {
		"default": "New York"
		}
	}
*/
type name struct {
	Value string `json:"default"`
}
type Player_resp struct {
	ID        int64  `json:"id"`
	Photo     string `json:"headshot"`
	FirstName name   `json:"firstName"`
	LastName  name   `json:"lastName"`
	Number    int16  `json:"sweaterNumber"`
	Position  string `json:"positionCode"` // tempted to build an enum ['C', 'RW', 'LW', 'D', 'G']
}
type Roster_resp struct {
	Forwards   []Player_resp `json:"forwards"`
	Defensemen []Player_resp `json:"defensemen"`
	Goalies    []Player_resp `json:"goalies"`
}
type team_resp struct {
	ID   uint16 `json:"id"`
	Name string `json:"fullName"`
	Code string `json:"triCode"`
}
type Api_resp struct {
	Data []team_resp `json:"data"`
}

var TriCodeToTeamName map[string]string = map[string]string{
	"ANA": "Anaheim Ducks",
	"BOS": "Boston Bruins",
	"BUF": "Buffalo Sabres",
	"CAR": "Carolina Hurricanes",
	"CBJ": "Columbus Blue Jackets",
	"CGY": "Calgary Flames",
	"CHI": "Chicago Blackhawks",
	"COL": "Colorado Avalanche",
	"DAL": "Dallas Stars",
	"DET": "Detroit Red Wings",
	"EDM": "Edmonton Oilers",
	"FLA": "Florida Panthers",
	"LAK": "Los Angeles Kings",
	"MIN": "Minnesota Wild",
	"MTL": "Montreal Canadiens",
	"NJD": "New Jersey Devils",
	"NSH": "Nashville Predators",
	"NYI": "New York Islanders",
	"NYR": "New York Rangers",
	"OTT": "Ottawa Senators",
	"PHI": "Philadelphia Flyers",
	"PIT": "Pittsburgh Penguins",
	"SEA": "Seattle Kraken",
	"SJS": "San Jose Sharks",
	"STL": "St Louis Blues",
	"TBL": "Tampa Bay Lightning",
	"TOR": "Toronto Maple Leafs",
	"UTA": "Utah Hockey Club",
	"VAN": "Vancouver Canucks",
	"VGK": "Vegas Golden Knights",
	"WPG": "Winnipeg Jets",
	"WSH": "Washington Capitals",
}

func GetTeamNameByTricode(tricode string) string {
	return TriCodeToTeamName[tricode]
}
