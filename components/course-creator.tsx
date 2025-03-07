"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Lightbulb, Wand2 } from "lucide-react"
import ModuleBlock from "@/components/module-block"
import EmbedToolbar from "@/components/embed-toolbar"

export type Module = {
  id: string
  title: string
  content: string
  type: "text" | "youtube" | "link" | "pdf"
  data?: {
    url?: string
  }
}

export default function CourseCreator() {
  const [courseTitle, setCourseTitle] = useState("Untitled Course")
  const [modules, setModules] = useState<Module[]>([])
  const [showNewBlock, setShowNewBlock] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [showEmbedToolbar, setShowEmbedToolbar] = useState(false)

  const addModule = (type: Module["type"] = "text", data = {}) => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: newTitle || "Untitled Module",
      content: newContent,
      type,
      data,
    }
    setModules([...modules, newModule])
    setNewTitle("")
    setNewContent("")
    setShowNewBlock(false)
    setShowEmbedToolbar(false)
  }

  const generateWithAI = () => {
    // Simulate AI generation
    setNewContent("This content was generated with AI assistance. You can now edit it or keep it as is.")
  }

  const deleteModule = (id: string) => {
    setModules(modules.filter((module) => module.id !== id))
  }

  const updateModule = (id: string, updates: Partial<Module>) => {
    setModules(modules.map((module) => (module.id === id ? { ...module, ...updates } : module)))
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Input
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
        className="text-3xl font-bold bg-transparent border-none text-center mb-8 focus-visible:ring-0 text-indigo-400"
      />

      <div className="space-y-6">
        {modules.map((module) => (
          <ModuleBlock
            key={module.id}
            module={module}
            onUpdate={(updates) => updateModule(module.id, updates)}
            onDelete={() => deleteModule(module.id)}
          />
        ))}

        {showNewBlock ? (
          <div className="bg-zinc-800 rounded-lg shadow-lg p-6 border border-zinc-700">
            <Input
              placeholder="Module Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="mb-4 bg-zinc-700 border-zinc-600"
            />
            <Textarea
              placeholder="Module Content..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="min-h-[150px] mb-4 bg-zinc-700 border-zinc-600"
            />
            <div className="flex justify-between">
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => setShowEmbedToolbar(!showEmbedToolbar)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Embed
                </Button>
                <Button variant="outline" size="sm" onClick={generateWithAI}>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Use AI
                </Button>
              </div>
              <div className="space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setShowNewBlock(false)}>
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={() => addModule()}>
                  Add
                </Button>
              </div>
            </div>

            {showEmbedToolbar && <EmbedToolbar onEmbed={(type, data) => addModule(type, data)} />}
          </div>
        ) : modules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-400">
            <div className="bg-zinc-800/50 rounded-full p-6 mb-4">
              <Lightbulb className="h-12 w-12 text-indigo-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Modules Yet</h3>
            <p className="text-zinc-500 mb-6">Modules you add will appear here</p>
            <Button onClick={() => setShowNewBlock(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setShowNewBlock(true)}
              className="border-dashed border-zinc-700 text-zinc-400"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

