interface Player {
    id: number,
    photo: string,
    name: string,
    position: string,
    nhl_team_code: string,
    nhl_team_name: string,
    salary: number
}

interface League {
    id: number,
	name: string,
	teams: Team[]
}

interface Team {
    id: number,
	name: string,
	owner: string,
	league_id: number,
	players: Player[]
}

export {
    Player,
    League,
    Team
}