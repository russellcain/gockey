"use client"

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LeagueStandingsPage() {
  const params = useParams()
  const router = useRouter()
  const leagueId = params.leagueId as string

  useEffect(() => {
    // Redirect to the original standings page with league context
    router.push(`/standings?league=${leagueId}`)
  }, [leagueId, router])

  return <div>Redirecting to standings...</div>
}
