"use client"

import type React from "react"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StickyNoteProps {
  id: string
  initialContent?: string
  initialPosition?: { x: number; y: number }
  initialColor?: string
  onDelete: (id: string) => void
  onUpdate: (id: string, content: string, position: { x: number; y: number }, color: string) => void
}

export function StickyNote({
  id,
  initialContent = "",
  initialPosition = { x: 100, y: 100 },
  initialColor = "#FFEB3B",
  onDelete,
  onUpdate,
}: StickyNoteProps) {
  const [content, setContent] = useState(initialContent)
  const [position, setPosition] = useState(initialPosition)
  const [color, setColor] = useState(initialColor)
  const [isEditing, setIsEditing] = useState(false)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleBlur = () => {
    setIsEditing(false)
    onUpdate(id, content, position, color)
  }

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    onUpdate(id, content, position, newColor)
  }

  const colors = ["#FFEB3B", "#FFC107", "#FF9800", "#4CAF50", "#2196F3", "#9C27B0", "#F48FB1"]

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        backgroundColor: color,
        width: "200px",
        minHeight: "200px",
        borderRadius: "4px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="cursor-move p-2 text-black/70">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {colors.map((c) => (
              <button
                key={c}
                className="h-4 w-4 rounded-full border border-black/10"
                style={{ backgroundColor: c }}
                onClick={() => handleColorChange(c)}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full hover:bg-black/10"
            onClick={() => onDelete(id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="flex-1 p-2" onClick={() => setIsEditing(true)}>
        {isEditing ? (
          <textarea
            className="h-full w-full resize-none bg-transparent p-2 text-black/80 focus:outline-none"
            value={content}
            onChange={handleContentChange}
            onBlur={handleBlur}
            placeholder="Type your note here..."
          />
        ) : (
          <div className="whitespace-pre-wrap break-words p-2 text-black/80">{content || "Click to edit"}</div>
        )}
      </div>
    </div>
  )
}

