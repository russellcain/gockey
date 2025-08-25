"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react"
import Link from "next/link"

// Mock standings data
const mockStandings = [
  {
    id: 1,
    teamName: "Ice Kings",
    owner: "Alex Johnson",
    totalPoints: 1847,
    totalSalary: 87500000,
    wins: 15,
    losses: 3,
    rank: 1,
    lastWeekRank: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    teamName: "Puck Dynasty",
    owner: "Sarah Chen",
    totalPoints: 1823,
    totalSalary: 86200000,
    wins: 14,
    losses: 4,
    rank: 2,
    lastWeekRank: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    teamName: "Goal Diggers",
    owner: "Mike Rodriguez",
    totalPoints: 1789,
    totalSalary: 85800000,
    wins: 13,
    losses: 5,
    rank: 3,
    lastWeekRank: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    teamName: "Stick Handlers",
    owner: "Emma Wilson",
    totalPoints: 1756,
    totalSalary: 87100000,
    wins: 12,
    losses: 6,
    rank: 4,
    lastWeekRank: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    teamName: "Rink Rats",
    owner: "David Kim",
    totalPoints: 1734,
    totalSalary: 84900000,
    wins: 11,
    losses: 7,
    rank: 5,
    lastWeekRank: 4,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    teamName: "Power Play",
    owner: "Lisa Thompson",
    totalPoints: 1698,
    totalSalary: 86700000,
    wins: 10,
    losses: 8,
    rank: 6,
    lastWeekRank: 6,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    teamName: "Hat Tricks",
    owner: "James Brown",
    totalPoints: 1667,
    totalSalary: 85300000,
    wins: 9,
    losses: 9,
    rank: 7,
    lastWeekRank: 7,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    teamName: "Bench Warmers",
    owner: "Rachel Davis",
    totalPoints: 1634,
    totalSalary: 83400000,
    wins: 8,
    losses: 10,
    rank: 8,
    lastWeekRank: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function StandingsPage() {
  const formatSalary = (salary: number) => {
    return `$${(salary / 1000000).toFixed(1)}M`
  }

  const getRankChange = (currentRank: number, lastWeekRank: number) => {
    const change = lastWeekRank - currentRank
    if (change > 0) {
      return { icon: TrendingUp, color: "text-green-600", text: `+${change}` }
    } else if (change < 0) {
      return { icon: TrendingDown, color: "text-red-600", text: `${change}` }
    } else {
      return { icon: Minus, color: "text-gray-400", text: "0" }
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500 text-white">1st</Badge>
    if (rank === 2) return <Badge className="bg-gray-400 text-white">2nd</Badge>
    if (rank === 3) return <Badge className="bg-amber-600 text-white">3rd</Badge>
    return <Badge variant="outline">{rank}th</Badge>
  }

  const topTeam = mockStandings[0]
  const averagePoints = Math.round(
    mockStandings.reduce((sum, team) => sum + team.totalPoints, 0) / mockStandings.length,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">League Standings</h1>
            <p className="text-gray-600">Current season rankings</p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>

        {/* League Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-yellow-600" />
                League Leader
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={topTeam.avatar || "/placeholder.svg"} alt={topTeam.owner} />
                  <AvatarFallback>
                    {topTeam.owner
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-sm">{topTeam.teamName}</p>
                  <p className="text-xs text-gray-600">{topTeam.totalPoints} pts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Points</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="font-bold text-2xl">{averagePoints}</span>
              <p className="text-xs text-gray-500 mt-1">League average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Games Played</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="font-bold text-2xl">18</span>
              <p className="text-xs text-gray-500 mt-1">of 82 games</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Playoff Spots</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="font-bold text-2xl">4</span>
              <p className="text-xs text-gray-500 mt-1">Top 4 teams</p>
            </CardContent>
          </Card>
        </div>

        {/* Standings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Team Standings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Record</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStandings.map((team) => {
                  const rankChange = getRankChange(team.rank, team.lastWeekRank)
                  const RankIcon = rankChange.icon

                  return (
                    <TableRow key={team.id} className={team.rank <= 4 ? "bg-green-50 border-green-200" : ""}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getRankBadge(team.rank)}
                          {team.rank <= 4 && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Playoff
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={team.avatar || "/placeholder.svg"} alt={team.owner} />
                            <AvatarFallback>
                              {team.owner
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <Link href={`/roster/${team.id}`} className="font-medium hover:text-blue-600 hover:underline">
                            {team.teamName}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>{team.owner}</TableCell>
                      <TableCell>
                        <span className="font-bold text-lg">{team.totalPoints}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {team.wins}-{team.losses}
                        </span>
                      </TableCell>
                      <TableCell>{formatSalary(team.totalSalary)}</TableCell>
                      <TableCell>
                        <div className={`flex items-center space-x-1 ${rankChange.color}`}>
                          <RankIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">{rankChange.text}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Playoff Picture */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
              Playoff Picture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-600 mb-3">In Playoff Position</h3>
                <div className="space-y-2">
                  {mockStandings.slice(0, 4).map((team, index) => (
                    <div key={team.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm">{index + 1}.</span>
                        <span className="font-medium">{team.teamName}</span>
                      </div>
                      <span className="text-sm font-bold">{team.totalPoints} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-red-600 mb-3">Outside Playoff Position</h3>
                <div className="space-y-2">
                  {mockStandings.slice(4).map((team, index) => (
                    <div key={team.id} className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm">{index + 5}.</span>
                        <span className="font-medium">{team.teamName}</span>
                      </div>
                      <span className="text-sm font-bold">{team.totalPoints} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
