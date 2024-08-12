import {
    Player,
    Team,
    League
} from "../api/models"

const URL_BASE = "http://localhost:2424"

function get_request(url: string): RequestInfo {
    const headers: Headers = new Headers()
    // headers.set('Content-type', 'application/json')
    // headers.set('Accept', 'application/json')
    // headers.set('X-Custom-Header', 'CustomValue')
    const request: RequestInfo = new Request(url, {
        method: 'GET',
        headers: headers
    })
    return request
}


async function getPlayers(): Promise<Player[]> {
    return fetch(get_request(`${URL_BASE}/players`))
        .then(res => res.json())
        .then(res => {
            return res as Player[]
        })
}

async function getPlayerById(id: number): Promise<Player> {
    return fetch(get_request(`${URL_BASE}/players/${id}`))
    .then(res => res.json())
        .then(res => {
            return res as Player
        })
}

async function getLeagues(): Promise<League[]> {
    return fetch(get_request(`${URL_BASE}/leagues`))
        .then(res => res.json())
        .then(res => {
            return res as League[]
        })
}

async function getTeams(league_id: number): Promise<Team[]> {
    return fetch(get_request(`${URL_BASE}/league/${league_id}/teams`))
        .then(res => res.json())
        .then(res => res as League)
        .then(res => res.teams)
}

async function getTeamById(league_id: number, team_id: number): Promise<Team> {
    return fetch(get_request(`${URL_BASE}/league/${league_id}/teams/${team_id}`))
        .then(res => res.json())
        .then(res => res as Team)
}

export {
    getPlayers,
    getPlayerById,
    getLeagues,
    getTeams,
    getTeamById
}