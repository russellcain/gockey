export interface Player {
  id: number
  name: string
  position: "C" | "LW" | "RW" | "D" | "G"
  team: string
  salary: number
  claimed: boolean
  points?: number
  games?: number
  goals?: number
  assists?: number
  wins?: number
  losses?: number
  saves?: number
  savePercentage?: number
  headshot: string
  claimedBy?: string
}

export interface Team {
  id: number
  teamName: string
  owner: string
  totalPoints: number
  totalSalary: number
  wins: number
  losses: number
  rank: number
  lastWeekRank: number
  avatar: string
}

export interface DraftState {
  currentPick: number
  currentRound: number
  isMyTurn: boolean
  myTeamSalary: number
  salaryCap: number
  timeRemaining: number
}

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  teamName: string
  teamId: number
  joinDate?: string
  wins?: number
  losses?: number
  totalPoints?: number
  avatar?: string
}
