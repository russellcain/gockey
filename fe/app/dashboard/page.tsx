"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trophy, Users, Lock, Globe, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for leagues
const mockLeagues = {
  userLeagues: [
    {
      id: "league-1",
      name: "Office Hockey League",
      teamName: "Ice Kings",
      isOwner: true,
      status: "active",
      standings: 1,
      totalTeams: 8,
      draftDate: null,
      isPublic: false,
    },
    {
      id: "league-2",
      name: "Friends & Family League",
      teamName: "Puck Dynasty",
      isOwner: false,
      status: "draft_scheduled",
      standings: null,
      totalTeams: 6,
      draftDate: "2024-01-20T19:00:00Z",
      isPublic: true,
    },
  ],
  publicLeagues: [
    {
      id: "league-3",
      name: "Public Championship League",
      description: "Open to all players - competitive league",
      totalTeams: 12,
      currentTeams: 8,
      isPublic: true,
      requiresPassword: false,
      status: "recruiting",
    },
    {
      id: "league-4",
      name: "Elite Hockey Masters",
      description: "Invitation only - experienced players",
      totalTeams: 10,
      currentTeams: 10,
      isPublic: false,
      requiresPassword: true,
      status: "active",
    },
  ],
}

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [userLeagues, setUserLeagues] = useState(mockLeagues.userLeagues)
  const [publicLeagues, setPublicLeagues] = useState(mockLeagues.publicLeagues)
  const [showCreateLeague, setShowCreateLeague] = useState(false)
  const [showJoinLeague, setShowJoinLeague] = useState(false)
  const [selectedLeague, setSelectedLeague] = useState(null)
  const [joinPassword, setJoinPassword] = useState("")
  const router = useRouter()

  const [createLeagueForm, setCreateLeagueForm] = useState({
    name: "",
    description: "",
    maxTeams: 8,
    isPublic: true,
    password: "",
    draftDate: "",
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  const handleCreateLeague = async (e) => {
    e.preventDefault()
    // Replace with actual API call
    console.log("Creating league:", createLeagueForm)
    setShowCreateLeague(false)
    // Redirect to new league
    router.push(`/league/new-league-id`)
  }

  const handleJoinLeague = async (league) => {
    if (league.requiresPassword && !joinPassword) {
      return
    }
    // Replace with actual API call
    console.log("Joining league:", league.id, "with password:", joinPassword)
    setShowJoinLeague(false)
    setJoinPassword("")
    router.push(`/league/${league.id}`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fantasy Hockey Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.firstName}!</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/profile">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="my-leagues" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-leagues">My Leagues</TabsTrigger>
            <TabsTrigger value="join-league">Join League</TabsTrigger>
          </TabsList>

          <TabsContent value="my-leagues" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Leagues</h2>
              <Dialog open={showCreateLeague} onOpenChange={setShowCreateLeague}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create League
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New League</DialogTitle>
                    <DialogDescription>Set up your fantasy hockey league</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateLeague} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="leagueName">League Name</Label>
                      <Input
                        id="leagueName"
                        placeholder="Enter league name"
                        value={createLeagueForm.name}
                        onChange={(e) => setCreateLeagueForm({ ...createLeagueForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="League description"
                        value={createLeagueForm.description}
                        onChange={(e) => setCreateLeagueForm({ ...createLeagueForm, description: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxTeams">Max Teams</Label>
                      <Input
                        id="maxTeams"
                        type="number"
                        min="4"
                        max="16"
                        value={createLeagueForm.maxTeams}
                        onChange={(e) =>
                          setCreateLeagueForm({ ...createLeagueForm, maxTeams: Number.parseInt(e.target.value) })
                        }
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isPublic"
                        checked={createLeagueForm.isPublic}
                        onChange={(e) => setCreateLeagueForm({ ...createLeagueForm, isPublic: e.target.checked })}
                      />
                      <Label htmlFor="isPublic">Make league public</Label>
                    </div>
                    {!createLeagueForm.isPublic && (
                      <div className="space-y-2">
                        <Label htmlFor="password">League Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Set a password"
                          value={createLeagueForm.password}
                          onChange={(e) => setCreateLeagueForm({ ...createLeagueForm, password: e.target.value })}
                        />
                      </div>
                    )}
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setShowCreateLeague(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create League</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {userLeagues.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Trophy className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Leagues Yet</h3>
                  <p className="text-gray-600 mb-4">Create your first league or join an existing one to get started!</p>
                  <Button onClick={() => setShowCreateLeague(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First League
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userLeagues.map((league) => (
                  <Card key={league.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{league.name}</CardTitle>
                          <CardDescription>Team: {league.teamName}</CardDescription>
                        </div>
                        <div className="flex space-x-1">
                          {league.isOwner && <Badge variant="secondary">Owner</Badge>}
                          {league.isPublic ? (
                            <Globe className="h-4 w-4 text-green-600" />
                          ) : (
                            <Lock className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {league.status === "active" && league.standings && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Current Standing</span>
                            <Badge variant="outline">
                              {league.standings} of {league.totalTeams}
                            </Badge>
                          </div>
                        )}
                        {league.status === "draft_scheduled" && league.draftDate && (
                          <div className="space-y-1">
                            <span className="text-sm font-medium">Draft Date</span>
                            <p className="text-xs text-gray-600">{formatDate(league.draftDate)}</p>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Teams</span>
                          <span className="text-sm">{league.totalTeams} teams</span>
                        </div>
                        <Link href={`/league/${league.id}`}>
                          <Button className="w-full">Enter League</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="join-league" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Available Leagues</h2>
              <p className="text-gray-600">Join public leagues or enter a private league with a password</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicLeagues.map((league) => (
                <Card key={league.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{league.name}</CardTitle>
                        <CardDescription>{league.description}</CardDescription>
                      </div>
                      <div className="flex space-x-1">
                        {league.isPublic ? (
                          <Globe className="h-4 w-4 text-green-600" />
                        ) : (
                          <Lock className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Teams</span>
                        <span className="text-sm">
                          {league.currentTeams} / {league.totalTeams}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Status</span>
                        <Badge variant={league.status === "recruiting" ? "default" : "secondary"}>
                          {league.status === "recruiting" ? "Recruiting" : "In Progress"}
                        </Badge>
                      </div>
                      {league.status === "recruiting" ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full" onClick={() => setSelectedLeague(league)}>
                              <Users className="h-4 w-4 mr-2" />
                              Join League
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Join {league.name}</DialogTitle>
                              <DialogDescription>
                                {league.requiresPassword
                                  ? "This league requires a password to join."
                                  : "Confirm you want to join this league."}
                              </DialogDescription>
                            </DialogHeader>
                            {league.requiresPassword && (
                              <div className="space-y-2">
                                <Label htmlFor="joinPassword">League Password</Label>
                                <Input
                                  id="joinPassword"
                                  type="password"
                                  placeholder="Enter league password"
                                  value={joinPassword}
                                  onChange={(e) => setJoinPassword(e.target.value)}
                                />
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setShowJoinLeague(false)}>
                                Cancel
                              </Button>
                              <Button onClick={() => handleJoinLeague(league)}>Join League</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Link href={`/league/${league.id}`}>
                          <Button variant="outline" className="w-full bg-transparent">
                            View League
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
