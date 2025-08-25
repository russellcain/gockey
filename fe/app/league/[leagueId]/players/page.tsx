"use client"

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LeaguePlayersPage() {
  const params = useParams()
  const router = useRouter()
  const leagueId = params.leagueId as string

  useEffect(() => {
    // Redirect to the original players page with league context
    router.push(`/players?league=${leagueId}`)
  }, [leagueId, router])

  return <div>Redirecting to players...</div>
}
