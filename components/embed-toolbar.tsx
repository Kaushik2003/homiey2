"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Youtube, FileText, Link2 } from "lucide-react"

interface EmbedToolbarProps {
  onEmbed: (type: "youtube" | "pdf" | "link", data: { url: string }) => void
}

export default function EmbedToolbar({ onEmbed }: EmbedToolbarProps) {
  const [activeType, setActiveType] = useState<"youtube" | "pdf" | "link" | null>(null)
  const [url, setUrl] = useState("")

  const handleEmbed = () => {
    if (activeType && url) {
      onEmbed(activeType, { url })
      setActiveType(null)
      setUrl("")
    }
  }

  return (
    <div className="mt-4 p-4 bg-zinc-700 rounded-md">
      <div className="flex space-x-2 mb-4">
        <Button
          variant={activeType === "youtube" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveType("youtube")}
        >
          <Youtube className="h-4 w-4 mr-2" />
          YouTube
        </Button>
        <Button variant={activeType === "pdf" ? "default" : "outline"} size="sm" onClick={() => setActiveType("pdf")}>
          <FileText className="h-4 w-4 mr-2" />
          PDF
        </Button>
        <Button variant={activeType === "link" ? "default" : "outline"} size="sm" onClick={() => setActiveType("link")}>
          <Link2 className="h-4 w-4 mr-2" />
          Link
        </Button>
      </div>

      {activeType && (
        <div className="flex space-x-2">
          <Input
            placeholder={`Enter ${activeType} URL...`}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-zinc-600 border-zinc-500"
          />
          <Button onClick={handleEmbed}>Embed</Button>
        </div>
      )}
    </div>
  )
}

