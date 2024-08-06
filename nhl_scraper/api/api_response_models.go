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
