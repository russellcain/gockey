"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DollarSign, TrendingUp, Users, UserMinus, UserPlus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for different teams
const mockTeamRosters = {
  1: {
    teamName: "Ice Kings",
    owner: "Alex Johnson",
    isCurrentUser: true,
    forwards: [
      {
        id: 1,
        name: "Connor McDavid",
        position: "C",
        team: "EDM",
        salary: 12500000,
        games: 82,
        goals: 64,
        assists: 89,
        points: 153,
        headshot: "/placeholder.svg?height=40&width=40",
      },
      // ... more forwards
    ],
    defensemen: [
      {
        id: 13,
        name: "Erik Karlsson",
        position: "D",
        team: "PIT",
        salary: 11500000,
        games: 82,
        goals: 25,
        assists: 76,
        points: 101,
        headshot: "/placeholder.svg?height=40&width=40",
      },
      // ... more defensemen
    ],
    goalies: [
      {
        id: 19,
        name: "Igor Shesterkin",
        position: "G",
        team: "NYR",
        salary: 5666667,
        games: 62,
        wins: 36,
        losses: 13,
        saves: 1781,
        savePercentage: 0.916,
        headshot: "/placeholder.svg?height=40&width=40",
      },
      // ... more goalies
    ],
  },
  2: {
    teamName: "Puck Dynasty",
    owner: "Sarah Chen",
    isCurrentUser: false,
    forwards: [
      {
        id: 3,
        name: "Nathan MacKinnon",
        position: "C",
        team: "COL",
        salary: 12600000,
        games: 71,
        goals: 51,
        assists: 89,
        points: 140,
        headshot: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 9,
        name: "David Pastrnak",
        position: "RW",
        team: "BOS",
        salary: 11250000,
        games: 82,
        goals: 61,
        assists: 52,
        points: 113,
        headshot: "/placeholder.svg?height=40&width=40",
      },
      // ... more forwards
    ],
    defensemen: [
      {
        id: 14,
        name: "Cale Makar",
        position: "D",
        team: "COL",
        salary: 9000000,
        games: 77,
        goals: 21,
        assists: 69,
        points: 90,
        headshot: "/placeholder.svg?height=40&width=40",
      },
      // ... more defensemen
    ],
    goalies: [
      {
        id: 20,
        name: "Connor Hellebuyck",
        position: "G",
        team: "WPG",
        salary: 6166667,
        games: 64,
        wins: 37,
        losses: 25,
        saves: 1890,
        savePercentage: 0.92,
        headshot: "/placeholder.svg?height=40&width=40",
      },
      // ... more goalies
    ],
  },
}

// Mock available players for adding
const mockAvailablePlayers = [
  {
    id: 100,
    name: "Johnny Gaudreau",
    position: "LW",
    team: "CBJ",
    salary: 9750000,
    points: 85,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 101,
    name: "Brad Marchand",
    position: "LW",
    team: "BOS",
    salary: 6125000,
    points: 67,
    headshot: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 102,
    name: "Sebastian Aho",
    position: "C",
    team: "CAR",
    salary: 8460250,
    points: 89,
    headshot: "/placeholder.svg?height=40&width=40",
  },
]

export default function TeamRosterPage() {
  const params = useParams()
  const teamId = Number.parseInt(params.teamId as string)
  const [activeTab, setActiveTab] = useState("forwards")
  const [selectedPlayerToDrop, setSelectedPlayerToDrop] = useState<any>(null)
  const [selectedPlayerToAdd, setSelectedPlayerToAdd] = useState<any>(null)
  const [availablePlayers] = useState(mockAvailablePlayers)

  const teamData = mockTeamRosters[teamId as keyof typeof mockTeamRosters]

  if (!teamData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Team Not Found</h2>
            <p className="text-gray-600 mb-4">The requested team could not be found.</p>
            <Link href="/standings">
              <Button>Back to Standings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalSalary = [...teamData.forwards, ...teamData.defensemen, ...teamData.goalies].reduce(
    (sum, player) => sum + player.salary,
    0,
  )

  const totalPoints = [...teamData.forwards, ...teamData.defensemen].reduce(
    (sum, player) => sum + (player.points || 0),
    0,
  )

  const formatSalary = (salary: number) => {
    return `$${(salary / 1000000).toFixed(1)}M`
  }

  const handleDropPlayer = async (playerId: number) => {
    // Replace with actual API call
    console.log(`Dropping player ${playerId}`)
    setSelectedPlayerToDrop(null)
  }

  const handleAddPlayer = async (playerId: number) => {
    // Replace with actual API call
    console.log(`Adding player ${playerId}`)
    setSelectedPlayerToAdd(null)
  }

  const renderActionColumn = (player: any) => {
    if (!teamData.isCurrentUser) return null

    return (
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedPlayerToDrop(player)}
              className="text-red-600 hover:text-red-700"
            >
              <UserMinus className="h-4 w-4 mr-1" />
              Drop
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Drop Player</DialogTitle>
              <DialogDescription>
                Are you sure you want to drop {player.name} from your roster? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedPlayerToDrop(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleDropPlayer(player.id)}>
                Drop Player
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    )
  }

  const renderForwardsTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>NHL Team</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>GP</TableHead>
          <TableHead>G</TableHead>
          <TableHead>A</TableHead>
          <TableHead>PTS</TableHead>
          {teamData.isCurrentUser && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamData.forwards.map((player) => (
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
            <TableCell>{player.goals}</TableCell>
            <TableCell>{player.assists}</TableCell>
            <TableCell className="font-bold">{player.points}</TableCell>
            {renderActionColumn(player)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const renderDefensemenTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>NHL Team</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>GP</TableHead>
          <TableHead>G</TableHead>
          <TableHead>A</TableHead>
          <TableHead>PTS</TableHead>
          {teamData.isCurrentUser && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamData.defensemen.map((player) => (
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
            <TableCell>{player.goals}</TableCell>
            <TableCell>{player.assists}</TableCell>
            <TableCell className="font-bold">{player.points}</TableCell>
            {renderActionColumn(player)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const renderGoaliesTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead>NHL Team</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>GP</TableHead>
          <TableHead>W</TableHead>
          <TableHead>L</TableHead>
          <TableHead>Saves</TableHead>
          <TableHead>SV%</TableHead>
          {teamData.isCurrentUser && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamData.goalies.map((player) => (
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
            <TableCell>{player.team}</TableCell>
            <TableCell>{formatSalary(player.salary)}</TableCell>
            <TableCell>{player.games}</TableCell>
            <TableCell>{player.wins}</TableCell>
            <TableCell>{player.losses}</TableCell>
            <TableCell>{player.saves}</TableCell>
            <TableCell>{player.savePercentage?.toFixed(3)}</TableCell>
            {renderActionColumn(player)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{teamData.teamName}</h1>
            <p className="text-gray-600">
              Owned by {teamData.owner} {teamData.isCurrentUser && "(You)"}
            </p>
          </div>
          <div className="flex space-x-2">
            <Link href="/standings">
              <Button variant="outline">Back to Standings</Button>
            </Link>
            {teamData.isCurrentUser && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Player
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add Player to Roster</DialogTitle>
                    <DialogDescription>Select an available player to add to your team.</DialogDescription>
                  </DialogHeader>
                  <div className="max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Player</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>NHL Team</TableHead>
                          <TableHead>Salary</TableHead>
                          <TableHead>Points</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {availablePlayers.map((player) => (
                          <TableRow key={player.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
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
                              <Button size="sm" onClick={() => handleAddPlayer(player.id)}>
                                Add
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Team Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-bold text-2xl">{formatSalary(totalSalary)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Cap: $88.0M</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span className="font-bold text-2xl">{totalPoints}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Season total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Roster Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span className="font-bold text-2xl">
                  {teamData.forwards.length + teamData.defensemen.length + teamData.goalies.length}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {teamData.forwards.length}F, {teamData.defensemen.length}D, {teamData.goalies.length}G
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cap Space</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-bold text-2xl text-green-600">{formatSalary(88000000 - totalSalary)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Roster Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Team Roster</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="forwards">Forwards ({teamData.forwards.length})</TabsTrigger>
                <TabsTrigger value="defensemen">Defensemen ({teamData.defensemen.length})</TabsTrigger>
                <TabsTrigger value="goalies">Goalies ({teamData.goalies.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="forwards" className="mt-6">
                {renderForwardsTable()}
              </TabsContent>

              <TabsContent value="defensemen" className="mt-6">
                {renderDefensemenTable()}
              </TabsContent>

              <TabsContent value="goalies" className="mt-6">
                {renderGoaliesTable()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
