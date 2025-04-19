"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { templates } from "./tools"

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void
  onClose: () => void
}

export function TemplateSelector({ onSelect, onClose }: TemplateSelectorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-background shadow-lg">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold">Choose a Template</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[60vh] p-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
                onClick={() => onSelect(template.id)}
              >
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={template.thumbnail || "/placeholder.svg"}
                    alt={template.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.category}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end gap-2 border-t p-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

