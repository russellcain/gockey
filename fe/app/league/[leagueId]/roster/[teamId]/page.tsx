"use client"

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LeagueTeamRosterPage() {
  const params = useParams()
  const router = useRouter()
  const leagueId = params.leagueId as string
  const teamId = params.teamId as string

  useEffect(() => {
    // Redirect to the original roster page with league context
    router.push(`/roster/${teamId}?league=${leagueId}`)
  }, [leagueId, teamId, router])

  return <div>Redirecting to roster...</div>
}
