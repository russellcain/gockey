// API functions to connect with your Go backend
// Replace these with actual API calls to your backend

type Player = {}

type Team = {}

interface DraftState {
  currentPick: number
  currentRound: number
  isMyTurn: boolean
  myTeamSalary: number
  salaryCap: number
  timeRemaining: number
}

export async function fetchPlayers(): Promise<Player[]> {
  // Replace with actual API call
  // const response = await fetch('/api/players')
  // return response.json()
  return []
}

export async function fetchTeams(): Promise<Team[]> {
  // Replace with actual API call
  // const response = await fetch('/api/teams')
  // return response.json()
  return []
}

export async function draftPlayer(playerId: number): Promise<void> {
  // Replace with actual API call
  // await fetch('/api/draft', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ playerId })
  // })
  console.log(`Drafting player ${playerId}`)
}

export async function fetchDraftState(): Promise<DraftState> {
  // Replace with actual API call
  // const response = await fetch('/api/draft/state')
  // return response.json()
  return {
    currentPick: 1,
    currentRound: 1,
    isMyTurn: false,
    myTeamSalary: 0,
    salaryCap: 88000000,
    timeRemaining: 120,
  }
}

export async function fetchRoster(): Promise<Player[]> {
  // Replace with actual API call
  // const response = await fetch('/api/roster')
  // return response.json()
  return []
}
