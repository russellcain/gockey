"use client"

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LeagueRosterPage() {
  const params = useParams()
  const router = useRouter()
  const leagueId = params.leagueId as string

  useEffect(() => {
    // Get current user's team ID and redirect to roster page
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      router.push(`/league/${leagueId}/roster/${user.teamId}`)
    } else {
      router.push("/login")
    }
  }, [leagueId, router])

  return <div>Loading...</div>
}
