"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Brush,
  Clock,
  Grid2X2,
  LogOut,
  Plus,
  Settings,
  Star,
  LayoutTemplateIcon as Template,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"

// Mock data for whiteboards
const mockWhiteboards = [
  {
    id: "wb1",
    title: "Project Brainstorm",
    lastEdited: "2 hours ago",
    thumbnail: "/placeholder.svg?height=200&width=300",
    collaborators: 3,
    isStarred: true,
  },
  {
    id: "wb2",
    title: "Weekly Team Meeting",
    lastEdited: "Yesterday",
    thumbnail: "/placeholder.svg?height=200&width=300",
    collaborators: 5,
    isStarred: false,
  },
  {
    id: "wb3",
    title: "Product Roadmap",
    lastEdited: "3 days ago",
    thumbnail: "/placeholder.svg?height=200&width=300",
    collaborators: 2,
    isStarred: true,
  },
  {
    id: "wb4",
    title: "UI Design Concepts",
    lastEdited: "1 week ago",
    thumbnail: "/placeholder.svg?height=200&width=300",
    collaborators: 1,
    isStarred: false,
  },
]

// Mock data for templates
const mockTemplates = [
  {
    id: "t1",
    title: "Brainstorming",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Planning",
  },
  {
    id: "t2",
    title: "Kanban Board",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Project Management",
  },
  {
    id: "t3",
    title: "Mind Map",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Ideation",
  },
  {
    id: "t4",
    title: "Weekly Planner",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Organization",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const { user, signOut, isLoading } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [whiteboards, setWhiteboards] = useState(mockWhiteboards)
  const [templates, setTemplates] = useState(mockTemplates)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // Filter whiteboards based on search query
    if (e.target.value) {
      setWhiteboards(mockWhiteboards.filter((wb) => wb.title.toLowerCase().includes(e.target.value.toLowerCase())))
    } else {
      setWhiteboards(mockWhiteboards)
    }
  }

  const toggleStar = (id: string) => {
    setWhiteboards(whiteboards.map((wb) => (wb.id === id ? { ...wb, isStarred: !wb.isStarred } : wb)))
  }

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Brush className="h-10 w-10 animate-pulse text-primary" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Link href="/" className="flex items-center gap-2">
              <Brush className="h-5 w-5 text-primary" />
              <span>CollabCanvas</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="relative w-full max-w-sm">
              <Input
                type="search"
                placeholder="Search whiteboards..."
                className="w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex w-full cursor-pointer items-center">
                    <Grid2X2 className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex w-full cursor-pointer items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
            <Link href="/whiteboard/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> New Whiteboard
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="recent" className="mb-8">
            <TabsList>
              <TabsTrigger value="recent">
                <Clock className="mr-2 h-4 w-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="starred">
                <Star className="mr-2 h-4 w-4" />
                Starred
              </TabsTrigger>
              <TabsTrigger value="templates">
                <Template className="mr-2 h-4 w-4" />
                Templates
              </TabsTrigger>
            </TabsList>
            <TabsContent value="recent" className="mt-6">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {whiteboards.map((whiteboard) => (
                  <motion.div key={whiteboard.id} variants={item}>
                    <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                      <div className="absolute right-2 top-2 z-10">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur"
                          onClick={() => toggleStar(whiteboard.id)}
                        >
                          <Star
                            className={`h-4 w-4 ${whiteboard.isStarred ? "fill-yellow-400 text-yellow-400" : ""}`}
                          />
                        </Button>
                      </div>
                      <Link href={`/whiteboard/${whiteboard.id}`}>
                        <div className="aspect-video w-full overflow-hidden bg-muted">
                          <img
                            src={whiteboard.thumbnail || "/placeholder.svg"}
                            alt={whiteboard.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{whiteboard.title}</h3>
                          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                            <span>Edited {whiteboard.lastEdited}</span>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{whiteboard.collaborators}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="starred" className="mt-6">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {whiteboards
                  .filter((wb) => wb.isStarred)
                  .map((whiteboard) => (
                    <motion.div key={whiteboard.id} variants={item}>
                      <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                        <div className="absolute right-2 top-2 z-10">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur"
                            onClick={() => toggleStar(whiteboard.id)}
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </Button>
                        </div>
                        <Link href={`/whiteboard/${whiteboard.id}`}>
                          <div className="aspect-video w-full overflow-hidden bg-muted">
                            <img
                              src={whiteboard.thumbnail || "/placeholder.svg"}
                              alt={whiteboard.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium">{whiteboard.title}</h3>
                            <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                              <span>Edited {whiteboard.lastEdited}</span>
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{whiteboard.collaborators}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="templates" className="mt-6">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {templates.map((template) => (
                  <motion.div key={template.id} variants={item}>
                    <div className="group overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                      <Link href={`/whiteboard/new?template=${template.id}`}>
                        <div className="aspect-video w-full overflow-hidden bg-muted">
                          <img
                            src={template.thumbnail || "/placeholder.svg"}
                            alt={template.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{template.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{template.category}</p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>

          <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">Recent Collaborations</h2>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                {whiteboards.slice(0, 3).map((whiteboard) => (
                  <div key={whiteboard.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 overflow-hidden rounded-md bg-muted">
                        <img
                          src={whiteboard.thumbnail || "/placeholder.svg"}
                          alt={whiteboard.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{whiteboard.title}</h3>
                        <p className="text-sm text-muted-foreground">Last edited {whiteboard.lastEdited}</p>
                      </div>
                    </div>
                    <Link href={`/whiteboard/${whiteboard.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Continue <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

