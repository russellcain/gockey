"use client"

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LeagueDraftPage() {
  const params = useParams()
  const router = useRouter()
  const leagueId = params.leagueId as string

  useEffect(() => {
    // Redirect to the original draft page with league context
    router.push(`/draft?league=${leagueId}`)
  }, [leagueId, router])

  return <div>Redirecting to draft...</div>
}
