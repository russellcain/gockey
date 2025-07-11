"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

// Mock data - replace with your API calls
const mockPlayers = [
  {
    id: 1,
    name: "Connor McDavid",
    position: "C",
    team: "EDM",
    salary: 12500000,
    claimed: false,
    points: 150,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Leon Draisaitl",
    position: "C",
    team: "EDM",
    salary: 8500000,
    claimed: false,
    points: 128,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Nathan MacKinnon",
    position: "C",
    team: "COL",
    salary: 12600000,
    claimed: true,
    points: 140,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Auston Matthews",
    position: "C",
    team: "TOR",
    salary: 13250000,
    claimed: false,
    points: 135,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Erik Karlsson",
    position: "D",
    team: "PIT",
    salary: 11500000,
    claimed: false,
    points: 101,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Cale Makar",
    position: "D",
    team: "COL",
    salary: 9000000,
    claimed: false,
    points: 90,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Igor Shesterkin",
    position: "G",
    team: "NYR",
    salary: 5666667,
    claimed: false,
    points: 0,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Connor Hellebuyck",
    position: "G",
    team: "WPG",
    salary: 6166667,
    claimed: false,
    points: 0,
    headshot: "/placeholder.svg?height=40&width=40",
  },
]

const mockDraftState = {
  currentPick: 7,
  currentRound: 3,
  isMyTurn: true,
  myTeamSalary: 65000000,
  salaryCap: 88000000,
  timeRemaining: 120,
}

export default function DraftPage() {
  const [players, setPlayers] = useState(mockPlayers)
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState("all")
  const [teamFilter, setTeamFilter] = useState("all")
  const [draftState, setDraftState] = useState(mockDraftState)
  const [timeRemaining, setTimeRemaining] = useState(draftState.timeRemaining)

  // Timer countdown
  useEffect(() => {
    if (draftState.isMyTurn && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [draftState.isMyTurn, timeRemaining])

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = positionFilter === "all" || player.position === positionFilter
    const matchesTeam = teamFilter === "all" || player.team === teamFilter
    return matchesSearch && matchesPosition && matchesTeam && !player.claimed
  })

  const canAffordPlayer = (salary: number) => {
    return draftState.myTeamSalary + salary <= draftState.salaryCap
  }

  const draftPlayer = (playerId: number) => {
    setPlayers((prev) => prev.map((p) => (p.id === playerId ? { ...p, claimed: true } : p)))
    // Here you would make an API call to your backend
    console.log(`Drafted player ${playerId}`)
  }

  const formatSalary = (salary: number) => {
    return `$${(salary / 1000000).toFixed(1)}M`
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Draft Room</h1>
            <p className="text-gray-600">
              Round {draftState.currentRound}, Pick {draftState.currentPick}
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>

        {/* Draft Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className={draftState.isMyTurn ? "border-green-500 bg-green-50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Your Turn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className={`font-bold ${timeRemaining < 30 ? "text-red-600" : "text-green-600"}`}>
                  {draftState.isMyTurn ? formatTime(timeRemaining) : "Waiting..."}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Team Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-bold">{formatSalary(draftState.myTeamSalary)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cap Space</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-bold text-green-600">
                  {formatSalary(draftState.salaryCap - draftState.myTeamSalary)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Players</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="font-bold text-2xl">{filteredPlayers.length}</span>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Player Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="C">Center</SelectItem>
                  <SelectItem value="LW">Left Wing</SelectItem>
                  <SelectItem value="RW">Right Wing</SelectItem>
                  <SelectItem value="D">Defense</SelectItem>
                  <SelectItem value="G">Goalie</SelectItem>
                </SelectContent>
              </Select>
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="NHL Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="EDM">Edmonton</SelectItem>
                  <SelectItem value="COL">Colorado</SelectItem>
                  <SelectItem value="TOR">Toronto</SelectItem>
                  <SelectItem value="PIT">Pittsburgh</SelectItem>
                  <SelectItem value="NYR">NY Rangers</SelectItem>
                  <SelectItem value="WPG">Winnipeg</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setPositionFilter("all")
                  setTeamFilter("all")
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Players Table */}
        <Card>
          <CardHeader>
            <CardTitle>Available Players</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>NHL Team</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Last Season Points</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={player.headshot || "/placeholder.svg"} alt={player.name} />
                          <AvatarFallback>
                            {player.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{player.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{player.position}</Badge>
                    </TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell>{formatSalary(player.salary)}</TableCell>
                    <TableCell>{player.points}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => draftPlayer(player.id)}
                        disabled={!draftState.isMyTurn || !canAffordPlayer(player.salary)}
                        size="sm"
                        className={canAffordPlayer(player.salary) ? "" : "opacity-50"}
                      >
                        {!canAffordPlayer(player.salary) ? "Can't Afford" : "Draft"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
