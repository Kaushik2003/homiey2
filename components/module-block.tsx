"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2, Youtube, FileText, Link2, Save, X } from "lucide-react"
import type { Module } from "@/components/course-creator"

interface ModuleBlockProps {
  module: Module
  onUpdate: (updates: Partial<Module>) => void
  onDelete: () => void
}

export default function ModuleBlock({ module, onUpdate, onDelete }: ModuleBlockProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(module.title)
  const [content, setContent] = useState(module.content)

  const handleSave = () => {
    onUpdate({ title, content })
    setIsEditing(false)
  }

  const renderModuleContent = () => {
    switch (module.type) {
      case "youtube":
        return (
          <div className="aspect-video bg-zinc-800 rounded-md flex items-center justify-center">
            <div className="text-center">
              <Youtube className="h-12 w-12 mx-auto mb-2 text-red-500" />
              <p className="text-zinc-400">YouTube Video Embedded</p>
              <p className="text-zinc-500 text-sm mt-1">{module.data?.url}</p>
            </div>
          </div>
        )
      case "pdf":
        return (
          <div className="bg-zinc-800 rounded-md p-4 flex items-center">
            <FileText className="h-8 w-8 mr-3 text-indigo-400" />
            <div>
              <p className="text-zinc-300">PDF Document</p>
              <p className="text-zinc-500 text-sm">{module.data?.url}</p>
            </div>
          </div>
        )
      case "link":
        return (
          <div className="bg-zinc-800 rounded-md p-4 flex items-center">
            <Link2 className="h-6 w-6 mr-3 text-indigo-400" />
            <div>
              <p className="text-zinc-300">External Link</p>
              <a
                href={module.data?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 text-sm hover:underline"
              >
                {module.data?.url}
              </a>
            </div>
          </div>
        )
      default:
        return (
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-300 whitespace-pre-wrap">{module.content}</p>
          </div>
        )
    }
  }

  return (
    <div className="bg-zinc-800 rounded-lg shadow-lg p-6 border border-zinc-700">
      {isEditing ? (
        <>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 font-medium text-lg bg-zinc-700 border-zinc-600"
          />
          {module.type === "text" && (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] mb-4 bg-zinc-700 border-zinc-600"
            />
          )}
          <div className="flex justify-end space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTitle(module.title)
                setContent(module.content)
                setIsEditing(false)
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg text-zinc-100">{module.title}</h3>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="h-8 w-8">
                <Edit className="h-4 w-4 text-zinc-400" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-zinc-400" />
              </Button>
            </div>
          </div>
          {renderModuleContent()}
        </>
      )}
    </div>
  )
}

