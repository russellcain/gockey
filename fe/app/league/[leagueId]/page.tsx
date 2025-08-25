"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, Calendar, Target, Settings } from "lucide-react"

// Mock league data
const mockLeagueData = {
  "league-1": {
    id: "league-1",
    name: "Office Hockey League",
    description: "Annual office fantasy hockey competition",
    isOwner: true,
    userTeamId: 1,
    status: "active",
  },
  "league-2": {
    id: "league-2",
    name: "Friends & Family League",
    description: "Casual league with friends and family",
    isOwner: false,
    userTeamId: 2,
    status: "draft_scheduled",
  },
}

export default function LeaguePage() {
  const params = useParams()
  const leagueId = params.leagueId as string
  const [league, setLeague] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load league data
    const leagueData = mockLeagueData[leagueId]
    if (leagueData) {
      setLeague(leagueData)
    }
  }, [leagueId])

  if (!league || !user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{league.name}</h1>
            <p className="text-xl text-gray-600">{league.description}</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
            <Link href={`/league/${leagueId}/team-settings`}>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Team Settings
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 mx-auto text-blue-600 mb-2" />
              <CardTitle>Draft</CardTitle>
              <CardDescription>Select your players</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/league/${leagueId}/draft`}>
                <Button className="w-full">Start Draft</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 mx-auto text-green-600 mb-2" />
              <CardTitle>My Roster</CardTitle>
              <CardDescription>View your team</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/league/${leagueId}/roster`}>
                <Button variant="outline" className="w-full bg-transparent">
                  View Roster
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Trophy className="h-12 w-12 mx-auto text-yellow-600 mb-2" />
              <CardTitle>Standings</CardTitle>
              <CardDescription>League rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/league/${leagueId}/standings`}>
                <Button variant="outline" className="w-full bg-transparent">
                  View Standings
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 mx-auto text-red-600 mb-2" />
              <CardTitle>Players</CardTitle>
              <CardDescription>Browse all players</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/league/${leagueId}/players`}>
                <Button variant="outline" className="w-full bg-transparent">
                  View Players
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>League Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Draft Status</span>
                  <span className="text-sm text-green-600 font-semibold">
                    {league.status === "active" ? "Completed" : "Scheduled"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Current Pick</span>
                  <span className="text-sm">Round 3, Pick 7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Teams</span>
                  <span className="text-sm">8 / 8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Season Status</span>
                  <span className="text-sm text-blue-600 font-semibold">
                    {league.status === "active" ? "In Progress" : "Pre-Season"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Available Players</span>
                  <span className="text-sm font-semibold">847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Drafted Players</span>
                  <span className="text-sm font-semibold">153</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Avg. Team Salary</span>
                  <span className="text-sm font-semibold">$78.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Salary Cap</span>
                  <span className="text-sm font-semibold">$88M</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
