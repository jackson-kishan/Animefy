"use client"

import { useState } from "react"
import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { bookmarkStorage, formatTimestamp } from "@/lib/videojs-config"

interface BookmarkExportProps {
  animeId: number
  episode: number
  animeTitle: string
}

export default function BookmarkExport({ animeId, episode, animeTitle }: BookmarkExportProps) {
  const [isExporting, setIsExporting] = useState(false)

  const exportBookmarks = () => {
    setIsExporting(true)
    const bookmarks = bookmarkStorage.getBookmarksForEpisode(animeId, episode)

    const exportData = {
      anime: animeTitle,
      episode: episode,
      exportDate: new Date().toISOString(),
      bookmarks: bookmarks.map((bookmark) => ({
        timestamp: bookmark.timestamp,
        formattedTime: formatTimestamp(bookmark.timestamp),
        title: bookmark.title,
        description: bookmark.description,
        createdAt: bookmark.createdAt,
      })),
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${animeTitle.replace(/[^a-z0-9]/gi, "_")}_Episode_${episode}_Bookmarks.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setTimeout(() => setIsExporting(false), 1000)
  }

  const exportAsText = () => {
    const bookmarks = bookmarkStorage.getBookmarksForEpisode(animeId, episode)

    let textContent = `${animeTitle} - Episode ${episode} Bookmarks\n`
    textContent += `Exported on: ${new Date().toLocaleDateString()}\n\n`

    bookmarks.forEach((bookmark, index) => {
      textContent += `${index + 1}. ${bookmark.title}\n`
      textContent += `   Time: ${formatTimestamp(bookmark.timestamp)}\n`
      if (bookmark.description) {
        textContent += `   Description: ${bookmark.description}\n`
      }
      textContent += `   Created: ${new Date(bookmark.createdAt).toLocaleDateString()}\n\n`
    })

    const dataBlob = new Blob([textContent], { type: "text/plain" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${animeTitle.replace(/[^a-z0-9]/gi, "_")}_Episode_${episode}_Bookmarks.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const bookmarkCount = bookmarkStorage.getBookmarksForEpisode(animeId, episode).length

  if (bookmarkCount === 0) return null

  return (
    <div className="flex space-x-2 mt-4">
      <Button
        onClick={exportBookmarks}
        disabled={isExporting}
        size="sm"
        variant="outline"
        className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
      >
        <Download className="w-4 h-4 mr-1" />
        {isExporting ? "Exporting..." : "Export JSON"}
      </Button>
      <Button
        onClick={exportAsText}
        size="sm"
        variant="outline"
        className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
      >
        <FileText className="w-4 h-4 mr-1" />
        Export TXT
      </Button>
    </div>
  )
}
