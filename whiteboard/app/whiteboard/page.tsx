"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  Brush,
  Download,
  Eraser,
  Hand,
  ImageIcon,
  Pencil,
  Save,
  Share2,
  StickyNoteIcon,
  LayoutTemplateIcon as Template,
  TextIcon,
  Undo,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

import { ColorPicker } from "./color-picker"
import { StickyNote } from "./sticky-note"
import { TemplateSelector } from "./template-selector"
import { TextElement } from "./text-element"
import { brushTypes, tools } from "./tools"
import { UserList } from "./user-list"

// Generate a unique ID
const generateId = () => `id_${Math.random().toString(36).substr(2, 9)}`

export default function WhiteboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<string>("pencil")
  const [brushType, setBrushType] = useState(brushTypes[0])
  const [color, setColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState([5])
  const [opacity, setOpacity] = useState([1])
  const [users, setUsers] = useState<{ id: string; name: string; color: string }[]>([
    { id: "1", name: "You", color: "#3b82f6" },
    { id: "2", name: "Alex", color: "#ef4444" },
    { id: "3", name: "Taylor", color: "#10b981" },
  ])
  const [showUsers, setShowUsers] = useState(false)
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null)
  const [shapeStart, setShapeStart] = useState<{ x: number; y: number } | null>(null)
  const [stickyNotes, setStickyNotes] = useState<any[]>([])
  const [textElements, setTextElements] = useState<any[]>([])
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [boardTitle, setBoardTitle] = useState("Untitled Whiteboard")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  
  const toolbarRef = useRef<HTMLDivElement>(null)
  const usersRef = useRef<HTMLDivElement>(null)

  // Check authentication
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  // Initialize canvas and context
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - 64 // Adjust for header height
    const context = canvas.getContext("2d")

    if (context) {
      context.lineCap = "round"
      context.lineJoin = "round"
      context.strokeStyle = color
      context.lineWidth = brushSize[0]
      context.globalAlpha = opacity[0]
      setCtx(context)

      // Save initial canvas state
      const initialState = context.getImageData(0, 0, canvas.width, canvas.height)
      setHistory([initialState])
      setHistoryIndex(0)
    }

    // Handle window resize
    const handleResize = () => {
      if (!canvas || !context) return
      
      // Save current image data
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      
      // Resize canvas
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight - 64
      
      // Restore context properties
      context.lineCap = "round"
      context.lineJoin = "round"
      context.strokeStyle = color
      context.lineWidth = brushSize[0]
      context.globalAlpha = opacity[0]
      
      // Put the saved image data back
      context.putImageData(imageData, 0, 0)
    }

    window.addEventListener("resize", handleResize)

    // Load TensorFlow model
    // loadModel()

    // Initialize Socket.io
    // socket = io("/api/socket", {
    //   path: "/api/socket",
    //   addTrailingSlash: false,
    // })

    // socket.on("connect", () => {
    //   console.log("Connected to Socket.io server")
    // })

    // socket.on("draw", (data: any) => {
    //   if (!context) return
    //   drawRemote(context, data)
    // })

    // socket.on("sticky-note", (data: any) => {
    //   if (data.action === "add") {
    //     setStickyNotes((prev) => [...prev, data.note])
    //   } else if (data.action === "update") {
    //     setStickyNotes((prev) => prev.map((note) => (note.id === data.note.id ? data.note : note)))
    //   } else if (data.action === "delete") {
    //     setStickyNotes((prev) => prev.filter((note) => note.id !== data.noteId))
    //   }
    // })

    // socket.on("text-element", (data: any) => {
    //   if (data.action === "add") {
    //     setTextElements((prev) => [...prev, data.element])
    //   } else if (data.action === "update") {
    //     setTextElements((prev) => prev.map((element) => (element.id === data.element.id ? data.element : element)))
    //   } else if (data.action === "delete") {
    //     setTextElements((prev) => prev.filter((element) => element.id !== data.elementId))
    //   }
    // })

    // Check if template is specified
    if (templateId) {
      loadTemplate(templateId)
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      // if (socket) {
      //   socket.disconnect()
      // }
    }
  }, [])

  // Update context when color or brush size changes
  useEffect(() => {
    if (!ctx) return
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize[0]
    ctx.globalAlpha = opacity[0]
  }, [color, brushSize, opacity, ctx])

  // Update brush properties when brush type changes
  useEffect(() => {
    if (!brushType) return
    setBrushSize([brushType.strokeWidth])
    setOpacity([brushType.opacity])
  }, [brushType])

  // GSAP animations
  // useEffect(() => {
  //   if (toolbarRef.current) {
  //     gsap.from(toolbarRef.current, {
  //       x: -100,
  //       opacity: 0,
  //       duration: 0.5,
  //       ease: "power2.out",
  //     })
  //   }
  // }, [])

  // useEffect(() => {
  //   if (usersRef.current) {
  //     gsap.fromTo(
  //       usersRef.current,
  //       {
  //         x: showUsers ? 100 : 0,
  //         opacity: showUsers ? 0 : 1,
  //       },
  //       {
  //         x: showUsers ? 0 : 100,
  //         opacity: showUsers ? 1 : 0,
  //         duration: 0.3,
  //         ease: "power2.out",
  //       },
  //     )
  //   }
  // }, [showUsers])

  // Load template
  const loadTemplate = (templateId: string) => {
    console.log(`Loading template: ${templateId}`)
    
    if (templateId === "kanban") {
      // Add kanban board elements
      setStickyNotes([
        {
          id: generateId(),
          content: "To Do",
          position: { x: 100, y: 100 },
          color: "#FFEB3B",
        },
        {
          id: generateId(),
          content: "In Progress",
          position: { x: 350, y: 100 },
          color: "#FFC107",
        },
        {
          id: generateId(),
          content: "Done",
          position: { x: 600, y: 100 },
          color: "#4CAF50",
        },
      ])
      setTextElements([
        {
          id: generateId(),
          content: "Kanban Board",
          position: { x: 350, y: 50 },
          fontSize: 24,
        },
      ])
    } else if (templateId === "brainstorm") {
      // Add brainstorming elements
      setTextElements([
        {
          id: generateId(),
          content: "Main Idea",
          position: { x: 400, y: 200 },
          fontSize: 24,
        },
      ])
      setStickyNotes([
        {
          id: generateId(),
          content: "Idea 1",
          position: { x: 200, y: 300 },
          color: "#2196F3",
        },
        {
          id: generateId(),
          content: "Idea 2",
          position: { x: 450, y: 300 },
          color: "#9C27B0",
        },
        {
          id: generateId(),
          content: "Idea 3",
          position: { x: 700, y: 300 },
          color: "#F48FB1",
        },
      ])
    }
  }

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === "hand") {
      // Pan mode - not implemented in this demo
      return
    }

    if (["square", "circle", "triangle"].includes(tool)) {
      setShapeStart({ x, y })
      return
    }

    ctx.beginPath()
    ctx.moveTo(x, y)
    setLastPoint({ x, y })
    setIsDrawing(true)

    // Save current state for undo
    saveState()
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current || !lastPoint) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (["square", "circle", "triangle"].includes(tool)) {
      return // We'll draw the shape on mouse up
    }

    ctx.beginPath()
    ctx.moveTo(lastPoint.x, lastPoint.y)
    ctx.lineTo(x, y)
    ctx.stroke()

    setLastPoint({ x, y })
  }

  const endDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !canvasRef.current) return

    if (["square", "circle", "triangle"].includes(tool)) {
      if (!shapeStart) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Draw shape
      ctx.beginPath()

      if (tool === "square") {
        ctx.rect(shapeStart.x, shapeStart.y, x - shapeStart.x, y - shapeStart.y)
      } else if (tool === "circle") {
        const radiusX = Math.abs(x - shapeStart.x) / 2
        const radiusY = Math.abs(y - shapeStart.y) / 2
        const centerX = Math.min(x, shapeStart.x) + radiusX
        const centerY = Math.min(y, shapeStart.y) + radiusY

        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
      } else if (tool === "triangle") {
        ctx.moveTo(shapeStart.x, y)
        ctx.lineTo(shapeStart.x + (x - shapeStart.x) / 2, shapeStart.y)
        ctx.lineTo(x, y)
        ctx.closePath()
      }

      ctx.stroke()
      setShapeStart(null)
      
      // Save state for undo
      saveState()
    }

    setIsDrawing(false)
    setLastPoint(null)
  }

// Draw data received from other users
// const drawRemote = (context: CanvasRenderingContext2D, data: any) => {
//   const originalStrokeStyle = context.strokeStyle
//   const originalLineWidth = context.lineWidth
//   const originalGlobalAlpha = context.globalAlpha

//   context.strokeStyle = data.color
//   context.lineWidth = data.size
//   context.globalAlpha = data.opacity || 1

//   context.beginPath()
//   context.moveTo(data.from.x, data.from.y)
//   context.lineTo(data.to.x, data.to.y)
//   context.stroke()

//   // Reset to original settings
//   context.strokeStyle = originalStrokeStyle
//   context.lineWidth = originalLineWidth
//   context.globalAlpha = originalGlobalAlpha
// }

// TensorFlow shape recognition
// const recognizeShape = async (start: { x: number; y: number }, end: { x: number; y: number }) => {
//   if (!model) return

//   // Extract features from the shape
//   const width = Math.abs(end.x - start.x)
//   const height = Math.abs(end.y - start.y)
//   const aspectRatio = width / height
//   const area = width * height
//   const perimeter = 2 * (width + height)
//   const diagonal = Math.sqrt(width * width + height * height)

//   // Normalize features
//   const maxDim = Math.max(canvasRef.current?.width || 1000, canvasRef.current?.height || 1000)
//   const normalizedFeatures = [
//     width / maxDim,
//     height / maxDim,
//     aspectRatio,
//     area / (maxDim * maxDim),
//     perimeter / (4 * maxDim),
//     diagonal / (Math.sqrt(2) * maxDim),
//   ]

//   // Make prediction
//   const inputTensor = tf.tensor2d([normalizedFeatures])
//   const prediction = model.predict(inputTensor) as tf.Tensor

//   // Get the predicted shape class
//   const predictionData = await prediction.data()
//   const predictedClass = Array.from(predictionData).indexOf(Math.max(...Array.from(predictionData)))

//   console.log("Shape recognition:", predictedClass)

//   // Cleanup tensors
//   inputTensor.dispose()
//   prediction.dispose()
// }

  // History management for undo/redo
  const saveState = () => {
    if (!ctx || !canvasRef.current) return

    const currentState = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)

    // If we're not at the end of the history, remove future states
    if (historyIndex < history.length - 1) {
      setHistory(history.slice(0, historyIndex + 1))
    }

    setHistory([...history, currentState])
    setHistoryIndex(historyIndex + 1)
  }

  const undo = () => {
    if (!ctx || !canvasRef.current || historyIndex <= 0) return

    const newIndex = historyIndex - 1
    ctx.putImageData(history[newIndex], 0, 0)
    setHistoryIndex(newIndex)
  }

  const redo = () => {
    if (!ctx || !canvasRef.current || historyIndex >= history.length - 1) return

    const newIndex = historyIndex + 1
    ctx.putImageData(history[newIndex], 0, 0)
    setHistoryIndex(newIndex)
  }

  // Save canvas as image
  const saveCanvas = () => {
    if (!canvasRef.current) return

    const link = document.createElement("a")
    link.download = `${boardTitle.replace(/\s+/g, "-").toLowerCase()}.png`
    link.href = canvasRef.current.toDataURL("image/png")
    link.click()
  }

  // Sticky note functions
  const addStickyNote = () => {
    const newNote = {
      id: generateId(),
      content: "",
      position: { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 },
      color: "#FFEB3B",
    }
    
    setStickyNotes([...stickyNotes, newNote])
  }

  const updateStickyNote = (id: string, content: string, position: { x: number; y: number }, color: string) => {
    const updatedNotes = stickyNotes.map((note) =>
      note.id === id ? { ...note, content, position, color } : note
    )
    
    setStickyNotes(updatedNotes)
  }

  const deleteStickyNote = (id: string) => {
    setStickyNotes(stickyNotes.filter((note) => note.id !== id))
  }

  // Text element functions
  const addTextElement = () => {
    const newElement = {
      id: generateId(),
      content: "",
      position: { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 },
      fontSize: 16,
    }
    
    setTextElements([...textElements, newElement])
  }

  const updateTextElement = (
    id: string,
    content: string,
    position: { x: number; y: number },
    fontSize: number
  ) => {
    const updatedElements = textElements.map((element) =>
      element.id === id ? { ...element, content, position, fontSize } : element
    )
    
    setTextElements(updatedElements)
  }

  const deleteTextElement = (id: string) => {
    setTextElements(textElements.filter((element) => element.id !== id))
  }

  // Template functions
  const handleSelectTemplate = (templateId: string) => {
    setShowTemplateSelector(false)
    loadTemplate(templateId)
  }

  if (isLoading) {
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
    <div className="flex h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b bg-background px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <ArrowLeft className="h-5 w-5" />
            <Brush className="h-5 w-5 text-primary" />
            <span>CollabCanvas</span>
          </Link>
          {isEditingTitle ? (
            <Input
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
              className="w-64"
              autoFocus
            />
          ) : (
            <h1
              className="text-lg font-medium hover:underline"
              onClick={() => setIsEditingTitle(true)}
            >
              {boardTitle}
            </h1>
          )}
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setShowTemplateSelector(true)}>
                  <Template className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Templates</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setShowUsers(!showUsers)}>
                  <Users className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show Collaborators</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={saveCanvas}>
                  <Download className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Canvas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share Canvas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button>Save</Button>
        </div>
      </header>
      <div className="relative flex-1">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
        />
        
        {/* Sticky Notes */}
        {stickyNotes.map((note) => (
          <StickyNote
            key={note.id}
            id={note.id}
            initialContent={note.content}
            initialPosition={note.position}
            initialColor={note.color}
            onDelete={deleteStickyNote}
            onUpdate={updateStickyNote}
          />
        ))}
        
        {/* Text Elements */}
        {textElements.map((element) => (
          <TextElement
            key={element.id}
            id={element.id}
            initialContent={element.content}
            initialPosition={element.position}
            initialFontSize={element.fontSize}
            onDelete={deleteTextElement}
            onUpdate={updateTextElement}
          />
        ))}
        
        {/* Template Selector */}
        {showTemplateSelector && (
          <TemplateSelector
            onSelect={handleSelectTemplate}
            onClose={() => setShowTemplateSelector(false)}
          />
        )}
        
        <div
          ref={toolbarRef}
          className="absolute left-4 top-4 flex flex-col gap-2 rounded-lg border bg-background p-2 shadow-md"
        >
          <Tabs defaultValue="draw" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="draw">Draw</TabsTrigger>
              <TabsTrigger value="shapes">Shapes</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="draw" className="flex flex-col gap-2 p-2">
              <div className="grid grid-cols-2 gap-2">
                {brushTypes.map((brushType) => (
                  <TooltipProvider key={brushType.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={tool === brushType.id ? "default" : "outline"}
                          size="sm"
                          className="h-auto py-2"
                          onClick={() => {
                            setTool(brushType.id)
                            setBrushType(brushType)
                          }}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Pencil className="h-4 w-4" />
                            <span className="text-xs">{brushType.name}</span>
                          </div>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{brushType.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={tool === "eraser" ? "default" : "outline"}
                        size="sm"
                        className="h-auto py-2"
                        onClick={() => setTool("eraser")}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Eraser className="h-4 w-4" />
                          <span className="text-xs">Eraser</span>
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Erase parts of your drawing</p>
                    </TooltipContent>
                  </TooltipProvider>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <p className="text-xs font-medium">Brush Size</p>
                <Slider value={brushSize} min={1} max={50} step={1} onValueChange={setBrushSize} />
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-medium">Opacity</p>
                <Slider value={opacity} min={0.1} max={1} step={0.1} onValueChange={setOpacity} />
              </div>
              
              <Separator />
              
              <ColorPicker color={color} onChange={setColor} />
            </TabsContent>
            
            <TabsContent value="shapes" className="grid grid-cols-3 gap-2 p-2">
              {tools
                .filter((t) => t.category === "shapes")
                .map((shapeTool) => (
                  <TooltipProvider key={shapeTool.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={tool === shapeTool.id ? "default" : "outline"}
                          size="icon"
                          onClick={() => setTool(shapeTool.id)}
                        >
                          <shapeTool.icon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{shapeTool.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
            </TabsContent>
            
            <TabsContent value="text" className="flex flex-col gap-2 p-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={addTextElement}
                    >
                      <TextIcon className="h-4 w-4" />
                      <span>Add Text</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Add text to your whiteboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={addStickyNote}
                    >
                      <StickyNoteIcon className="h-4 w-4" />
                      <span>Add Sticky Note</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Add a sticky note to your whiteboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsContent>
            
            <TabsContent value="media" className="flex flex-col gap-2 p-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <ImageIcon className="h-4 w-4" />
                      <span>Upload Image</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Add an image to your whiteboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsContent>
            
            <TabsContent value="tools" className="flex flex-col gap-2 p-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={tool === "hand" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setTool("hand")}
                    >
                      <Hand className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={undo}>
                      <Undo className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Undo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={redo}>
                      <Save className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsContent>
          </Tabs>
        </div>
        
        <div
          ref={usersRef}
          className={cn(
            "absolute right-4 top-4 w-64 rounded-lg border bg-background p-4 shadow-md transition-all",
            !showUsers && "pointer-events-none opacity-0 translate-x-4"
          )}
        >
          <UserList users={users} />
        </div>
      </div>
    </div>
  )
}

