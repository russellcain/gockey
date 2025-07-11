"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Palette } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock team logos - in production, these would be actual logo files
const teamLogos = [
  { id: 1, name: "Lightning", icon: "⚡", color: "bg-blue-500" },
  { id: 2, name: "Flames", icon: "🔥", color: "bg-red-500" },
  { id: 3, name: "Sharks", icon: "🦈", color: "bg-teal-500" },
  { id: 4, name: "Eagles", icon: "🦅", color: "bg-amber-500" },
  { id: 5, name: "Wolves", icon: "🐺", color: "bg-gray-600" },
  { id: 6, name: "Bears", icon: "🐻", color: "bg-amber-700" },
  { id: 7, name: "Tigers", icon: "🐅", color: "bg-orange-500" },
  { id: 8, name: "Dragons", icon: "🐉", color: "bg-green-600" },
  { id: 9, name: "Phoenix", icon: "🔥", color: "bg-red-600" },
  { id: 10, name: "Knights", icon: "⚔️", color: "bg-slate-700" },
  { id: 11, name: "Stallions", icon: "🐎", color: "bg-amber-600" },
  { id: 12, name: "Panthers", icon: "🐆", color: "bg-purple-600" },
  { id: 13, name: "Hawks", icon: "🦅", color: "bg-red-700" },
  { id: 14, name: "Cobras", icon: "🐍", color: "bg-green-700" },
  { id: 15, name: "Bulldogs", icon: "🐕", color: "bg-blue-700" },
]

export default function TeamSettingsPage() {
  const params = useParams()
  const leagueId = params.leagueId as string
  const [user, setUser] = useState(null)
  const [teamName, setTeamName] = useState("")
  const [selectedLogo, setSelectedLogo] = useState(1)
  const [originalTeamName, setOriginalTeamName] = useState("")
  const [originalLogo, setOriginalLogo] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // Mock existing team names in the league (to check for duplicates)
  const existingTeamNames = [
    "Puck Dynasty",
    "Goal Diggers",
    "Stick Handlers",
    "Rink Rats",
    "Power Play",
    "Hat Tricks",
    "Bench Warmers",
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Load current team settings (mock data)
      const currentTeamName = "Ice Kings"
      const currentLogo = 1

      setTeamName(currentTeamName)
      setSelectedLogo(currentLogo)
      setOriginalTeamName(currentTeamName)
      setOriginalLogo(currentLogo)
    }
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // Validate team name
    if (teamName.trim().length < 3) {
      setError("Team name must be at least 3 characters long")
      setIsLoading(false)
      return
    }

    // Check for duplicate team names (excluding current name)
    if (teamName !== originalTeamName && existingTeamNames.includes(teamName)) {
      setError("This team name is already taken in this league")
      setIsLoading(false)
      return
    }

    try {
      // Replace with actual API call to your Go backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local storage (replace with proper API integration)
      if (user) {
        const updatedUser = { ...user, teamName: teamName }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser(updatedUser)
      }

      setOriginalTeamName(teamName)
      setOriginalLogo(selectedLogo)
      setSuccess("Team settings updated successfully!")
    } catch (err) {
      setError("Failed to update team settings. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const hasChanges = teamName !== originalTeamName || selectedLogo !== originalLogo

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href={`/league/${leagueId}`}>
            <Button variant="outline" size="sm" className="mr-4 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to League
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Settings</h1>
            <p className="text-gray-600">Customize your team name and logo</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Team Customization
              </CardTitle>
              <CardDescription>
                Update your team name and select a logo. Changes can be made at any time during the season.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                {/* Team Name Section */}
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter your team name"
                    maxLength={30}
                    required
                  />
                  <p className="text-sm text-gray-500">Choose a unique name for your team (3-30 characters)</p>
                </div>

                {/* Current Team Preview */}
                <div className="space-y-2">
                  <Label>Current Team</Label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div
                      className={`w-12 h-12 rounded-full ${teamLogos.find((logo) => logo.id === selectedLogo)?.color} flex items-center justify-center text-white text-xl`}
                    >
                      {teamLogos.find((logo) => logo.id === selectedLogo)?.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{teamName || "Enter team name"}</p>
                      <p className="text-sm text-gray-600">
                        {teamLogos.find((logo) => logo.id === selectedLogo)?.name} Logo
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logo Selection */}
                <div className="space-y-3">
                  <Label>Team Logo</Label>
                  <div className="grid grid-cols-5 gap-3">
                    {teamLogos.map((logo) => (
                      <button
                        key={logo.id}
                        type="button"
                        onClick={() => setSelectedLogo(logo.id)}
                        className={`relative p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedLogo === logo.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full ${logo.color} flex items-center justify-center text-white text-xl mx-auto mb-1`}
                        >
                          {logo.icon}
                        </div>
                        <p className="text-xs text-center font-medium">{logo.name}</p>
                        {selectedLogo === logo.id && (
                          <div className="absolute -top-1 -right-1">
                            <Badge className="bg-blue-500 text-white text-xs px-1">✓</Badge>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-gray-500">
                    {hasChanges ? "You have unsaved changes" : "No changes to save"}
                  </div>
                  <Button type="submit" disabled={!hasChanges || isLoading} className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>

                {/* Success/Error Messages */}
                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Additional Info Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Team Settings Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">League:</span>
                  <span>Office Hockey League</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Owner:</span>
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Team ID:</span>
                  <span>#{user.teamId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last Updated:</span>
                  <span>Never</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
