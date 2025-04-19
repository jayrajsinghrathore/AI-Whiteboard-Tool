"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface User {
  id: string
  name: string
  color: string
}

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Collaborators</h3>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-2">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarFallback style={{ backgroundColor: user.color }}>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white" />
            </div>
            <div className="text-sm">{user.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

