"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RosterPage() {
  const router = useRouter()

  useEffect(() => {
    // Get current user's team ID from localStorage (replace with proper auth)
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      router.push(`/roster/${user.teamId}`)
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div>Loading...</div>
    </div>
  )
}
