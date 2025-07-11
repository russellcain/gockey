"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import Link from "next/link"

// Mock players data - expanded list
const mockPlayers = [
  {
    id: 1,
    name: "Connor McDavid",
    position: "C",
    team: "EDM",
    salary: 12500000,
    claimed: true,
    points: 150,
    games: 82,
    goals: 64,
    assists: 89,
    headshot: "/placeholder.svg?height=40&width=40",
    claimedBy: "Ice Kings",
  },
  {
    id: 2,
    name: "Leon Draisaitl",
    position: "C",
    team: "EDM",
    salary: 8500000,
    claimed: true,
    points: 128,
    games: 80,
    goals: 52,
    assists: 76,
    headshot: "/placeholder.svg?height=40&width=40",
    claimedBy: "Ice Kings",
  },
  {
    id: 3,
    name: "Nathan MacKinnon",
    position: "C",
    team: "COL",
    salary: 12600000,
    claimed: true,
    points: 140,
    games: 71,
    goals: 51,
    assists: 89,
    headshot: "/placeholder.svg?height=40&width=40",
    claimedBy: "Puck Dynasty",
  },
  {
    id: 4,
    name: "Auston Matthews",
    position: "C",
    team: "TOR",
    salary: 13250000,
    claimed: true,
    points: 107,
    games: 74,
    goals: 69,
    assists: 38,
    headshot: "/placeholder.svg?height=40&width=40",
    claimedBy: "Goal Diggers",
  },
  {
    id: 5,
    name: "Erik Karlsson",
    position: "D",
    team: "PIT",
    salary: 11500000,
    claimed: true,
    points: 101,
    games: 82,
    goals: 25,
    assists: 76,
    headshot: "/placeholder.svg?height=40&width=40",
    claimedBy: "Stick Handlers",
  },
  {
    id: 6,
    name: "Cale Makar",
    position: "D",
    team: "COL",
    salary: 9000000,
    claimed: true,
    points: 90,
    games: 77,
    goals: 21,
    assists: 69,
    headshot: "/placeholder.svg?height=40&width=40",
    claimedBy: "Rink Rats",
  },
  {
    id: 7,
    name: "Igor Shesterkin",
    position: "G",
    team: "NYR",
    salary: 5666667,
    claimed: true,
    points: 0,
    games: 62,
    wins: 36,
    losses: 13,
    headshot: "/placeholder.svg?height=40&width=40",
    claimedBy: "Power Play",
  },
  {
    id: 8,
    name: "Connor Hellebuyck",
    position: "G",
    team: "WPG",
    salary: 6166667,
    claimed: false,
    points: 0,
    games: 64,
    wins: 37,
    losses: 25,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 9,
    name: "David Pastrnak",
    position: "RW",
    team: "BOS",
    salary: 11250000,
    claimed: false,
    points: 113,
    games: 82,
    goals: 61,
    assists: 52,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 10,
    name: "Mikko Rantanen",
    position: "RW",
    team: "COL",
    salary: 9250000,
    claimed: false,
    points: 105,
    games: 82,
    goals: 55,
    assists: 50,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 11,
    name: "Artemi Panarin",
    position: "LW",
    team: "NYR",
    salary: 11642857,
    claimed: false,
    points: 120,
    games: 82,
    goals: 49,
    assists: 71,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 12,
    name: "Johnny Gaudreau",
    position: "LW",
    team: "CBJ",
    salary: 9750000,
    claimed: false,
    points: 85,
    games: 81,
    goals: 34,
    assists: 51,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 13,
    name: "Brad Marchand",
    position: "LW",
    team: "BOS",
    salary: 6125000,
    claimed: false,
    points: 67,
    games: 82,
    goals: 21,
    assists: 46,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 14,
    name: "Sebastian Aho",
    position: "C",
    team: "CAR",
    salary: 8460250,
    claimed: false,
    points: 89,
    games: 82,
    goals: 36,
    assists: 53,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 15,
    name: "Elias Pettersson",
    position: "C",
    team: "VAN",
    salary: 7350000,
    claimed: false,
    points: 102,
    games: 80,
    goals: 39,
    assists: 63,
    headshot: "/placeholder.svg?height=40&width=40",
  },
]

export default function PlayersPage() {
  const [players] = useState(mockPlayers)
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState("all")
  const [teamFilter, setTeamFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = positionFilter === "all" || player.position === positionFilter
    const matchesTeam = teamFilter === "all" || player.team === teamFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "available" && !player.claimed) ||
      (statusFilter === "claimed" && player.claimed)

    return matchesSearch && matchesPosition && matchesTeam && matchesStatus
  })

  const formatSalary = (salary: number) => {
    return `$${(salary / 1000000).toFixed(1)}M`
  }

  const availableCount = players.filter((p) => !p.claimed).length
  const claimedCount = players.filter((p) => p.claimed).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Players</h1>
            <p className="text-gray-600">Browse and search NHL players</p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>

        {/* Player Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="font-bold text-2xl">{players.length}</span>
              <p className="text-xs text-gray-500 mt-1">NHL players</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="font-bold text-2xl text-green-600">{availableCount}</span>
              <p className="text-xs text-gray-500 mt-1">Undrafted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Claimed</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="font-bold text-2xl text-red-600">{claimedCount}</span>
              <p className="text-xs text-gray-500 mt-1">Drafted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Showing</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="font-bold text-2xl">{filteredPlayers.length}</span>
              <p className="text-xs text-gray-500 mt-1">Filtered results</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Player Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                  <SelectItem value="BOS">Boston</SelectItem>
                  <SelectItem value="CBJ">Columbus</SelectItem>
                  <SelectItem value="CAR">Carolina</SelectItem>
                  <SelectItem value="VAN">Vancouver</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Players</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="claimed">Claimed</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => {
                  setSearchTerm("")
                  setPositionFilter("all")
                  setTeamFilter("all")
                  setStatusFilter("all")
                }}
                variant="outline"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Players Table */}
        <Card>
          <CardHeader>
            <CardTitle>Player Database</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>NHL Team</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>GP</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Status</TableHead>
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
                    <TableCell>{player.games}</TableCell>
                    <TableCell className="font-bold">{player.points}</TableCell>
                    <TableCell>
                      {player.claimed ? (
                        <div className="flex flex-col">
                          <Badge variant="destructive" className="mb-1">
                            Claimed
                          </Badge>
                          <span className="text-xs text-gray-500">{player.claimedBy}</span>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Available
                        </Badge>
                      )}
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
