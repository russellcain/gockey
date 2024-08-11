interface Player {
    id: number,
    name: string,
    position: string,
    nhl_team_code: string,
    salary: number
}

interface League {
    id: number,
	name: string,
	team_ids: number[]
}

interface Team {
    id: string,
	name: string,
	owner: string,
	league: League,
	players: Player[]
}

export {
    Player,
    League,
    Team
}