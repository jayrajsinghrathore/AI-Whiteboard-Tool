"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Brush } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function NewWhiteboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.push("/auth/login")
      return
    }

    // Generate a unique ID for the new whiteboard
    const whiteboardId = `wb_${Math.random().toString(36).substring(2, 11)}`

    // Redirect to the new whiteboard, with template if specified
    if (templateId) {
      router.push(`/whiteboard?template=${templateId}`)
    } else {
      router.push(`/whiteboard`)
    }
  }, [user, isLoading, router, templateId])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Brush className="h-10 w-10 animate-pulse text-primary" />
        <p>Creating your whiteboard...</p>
      </div>
    </div>
  )
}

