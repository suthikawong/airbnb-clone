import React from 'react'
import { CircleCheck, TriangleAlert } from 'lucide-react'

interface MessageProps {
  message?: string
}

export const MessageError: React.FC<MessageProps> = ({ message }) => {
  if (!message) return null

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm">
      <TriangleAlert color="hsl(var(--destructive))" />
      <p className="text-destructive">{message}</p>
    </div>
  )
}

export const MessageSuccess: React.FC<MessageProps> = ({ message }) => {
  if (!message) return null

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-success/15 p-3 text-sm">
      <CircleCheck color="hsl(var(--success))" />
      <p className="text-success">{message}</p>
    </div>
  )
}
