"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

const colors = [
  "#000000", // Black
  "#ffffff", // White
  "#ef4444", // Red
  "#f97316", // Orange
  "#eab308", // Yellow
  "#10b981", // Green
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#ec4899", // Pink
]

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(color)

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium">Color</p>
      <div className="grid grid-cols-5 gap-2">
        {colors.map((c) => (
          <button
            key={c}
            className={cn(
              "h-6 w-6 rounded-full border border-gray-300",
              color === c && "ring-2 ring-primary ring-offset-2",
            )}
            style={{ backgroundColor: c }}
            onClick={() => onChange(c)}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={customColor}
          onChange={handleCustomColorChange}
          className="h-8 w-8 cursor-pointer appearance-none rounded-full border-0 bg-transparent p-0"
        />
        <span className="text-xs">{customColor}</span>
      </div>
    </div>
  )
}

