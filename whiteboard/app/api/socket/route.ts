import { Server } from "socket.io"

// This is a simplified version of a Socket.io server for Next.js
// In a real app, you would use a more robust setup with proper error handling

export function GET(req: Request) {
  // Get the socket.io server instance
  const io = new Server({
    path: "/api/socket",
    addTrailingSlash: false,
    cors: {
      origin: "*",
    },
  })

  // Handle socket connections
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id)

    // Handle drawing events
    socket.on("draw", (data) => {
      // Broadcast to all other clients
      socket.broadcast.emit("draw", data)
    })

    // Handle shape events
    socket.on("shape", (data) => {
      // Broadcast to all other clients
      socket.broadcast.emit("shape", data)
    })

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id)
    })
  })

  // Return a response to keep the connection alive
  return new Response("Socket.io server running", {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}

