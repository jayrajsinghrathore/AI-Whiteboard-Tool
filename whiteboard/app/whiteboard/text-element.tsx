"use client"

import type React from "react"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TextElementProps {
  id: string
  initialContent?: string
  initialPosition?: { x: number; y: number }
  initialFontSize?: number
  onDelete: (id: string) => void
  onUpdate: (id: string, content: string, position: { x: number; y: number }, fontSize: number) => void
}

export function TextElement({
  id,
  initialContent = "",
  initialPosition = { x: 100, y: 100 },
  initialFontSize = 16,
  onDelete,
  onUpdate,
}: TextElementProps) {
  const [content, setContent] = useState(initialContent)
  const [position, setPosition] = useState(initialPosition)
  const [fontSize, setFontSize] = useState(initialFontSize)
  const [isEditing, setIsEditing] = useState(false)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleBlur = () => {
    setIsEditing(false)
    onUpdate(id, content, position, fontSize)
  }

  const handleFontSizeChange = (delta: number) => {
    const newSize = Math.max(8, Math.min(72, fontSize + delta))
    setFontSize(newSize)
    onUpdate(id, content, position, newSize)
  }

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        minWidth: "100px",
      }}
    >
      {isEditing ? (
        <div className="flex flex-col">
          <div className="mb-1 flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleFontSizeChange(-2)}>
              -
            </Button>
            <span className="text-xs">{fontSize}px</span>
            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleFontSizeChange(2)}>
              +
            </Button>
            <Button variant="outline" size="icon" className="h-6 w-6 ml-auto" onClick={() => onDelete(id)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          <textarea
            className="min-h-[50px] w-full resize-none rounded border border-input bg-background p-2 focus:outline-none"
            value={content}
            onChange={handleContentChange}
            onBlur={handleBlur}
            style={{ fontSize: `${fontSize}px` }}
          />
        </div>
      ) : (
        <div
          className="cursor-move whitespace-pre-wrap break-words p-1 hover:ring-1 hover:ring-primary/20"
          style={{ fontSize: `${fontSize}px` }}
          onClick={() => setIsEditing(true)}
        >
          {content || "Click to edit text"}
        </div>
      )}
    </div>
  )
}

