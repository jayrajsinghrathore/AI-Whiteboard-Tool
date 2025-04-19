import type React from "react"
import { Circle, Eraser, Hand, Highlighter, Image, Pencil, Square, StickyNote, Triangle, Type } from "lucide-react"

export type Tool = {
  id: string
  name: string
  icon: React.ElementType
  category: "draw" | "shapes" | "tools" | "text" | "media"
}

export const tools: Tool[] = [
  // Draw tools
  {
    id: "pencil",
    name: "Pencil",
    icon: Pencil,
    category: "draw",
  },
  {
    id: "highlighter",
    name: "Highlighter",
    icon: Highlighter,
    category: "draw",
  },
  {
    id: "eraser",
    name: "Eraser",
    icon: Eraser,
    category: "draw",
  },

  // Shape tools
  {
    id: "square",
    name: "Square",
    icon: Square,
    category: "shapes",
  },
  {
    id: "circle",
    name: "Circle",
    icon: Circle,
    category: "shapes",
  },
  {
    id: "triangle",
    name: "Triangle",
    icon: Triangle,
    category: "shapes",
  },

  // Text tools
  {
    id: "text",
    name: "Text",
    icon: Type,
    category: "text",
  },
  {
    id: "sticky-note",
    name: "Sticky Note",
    icon: StickyNote,
    category: "text",
  },

  // Media tools
  {
    id: "image",
    name: "Image",
    icon: Image,
    category: "media",
  },

  // Other tools
  {
    id: "hand",
    name: "Hand (Pan)",
    icon: Hand,
    category: "tools",
  },
]

export const brushTypes = [
  {
    id: "pencil",
    name: "Pencil",
    strokeWidth: 2,
    opacity: 1,
    description: "Thin, precise lines",
  },
  {
    id: "highlighter",
    name: "Highlighter",
    strokeWidth: 15,
    opacity: 0.4,
    description: "Transparent, wide strokes",
  },
]

export const templates = [
  {
    id: "blank",
    name: "Blank Canvas",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Basic",
  },
  {
    id: "brainstorm",
    name: "Brainstorming",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Planning",
  },
  {
    id: "kanban",
    name: "Kanban Board",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Project Management",
  },
]

