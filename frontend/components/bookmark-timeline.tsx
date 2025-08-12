"use client"

import { useState, useEffect } from "react"
import { bookmarkStorage, formatTimestamp, type Bookmark } from "@/lib/videojs-config"

interface BookmarkTimelineProps {
  animeId: number
  episode: number
  duration: number
  currentTime: number
  onJumpToTime: (timestamp: number) => void
}

export default function BookmarkTimeline({
  animeId,
  episode,
  duration,
  currentTime,
  onJumpToTime,
}: BookmarkTimelineProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [hoveredBookmark, setHoveredBookmark] = useState<Bookmark | null>(null)

  useEffect(() => {
    const episodeBookmarks = bookmarkStorage.getBookmarksForEpisode(animeId, episode)
    setBookmarks(episodeBookmarks)
  }, [animeId, episode])

  if (bookmarks.length === 0 || duration === 0) return null

  return (
    <div className="relative w-full h-2 mb-2">
      {/* Timeline background */}
      <div className="absolute inset-0 bg-gray-600 rounded-full" />

      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-full bg-purple-500 rounded-full transition-all duration-300"
        style={{ width: `${(currentTime / duration) * 100}%` }}
      />

      {/* Bookmark markers */}
      {bookmarks.map((bookmark) => {
        const position = (bookmark.timestamp / duration) * 100
        return (
          <div
            key={bookmark.id}
            className="absolute top-0 transform -translate-x-1/2 cursor-pointer group"
            style={{ left: `${position}%` }}
            onMouseEnter={() => setHoveredBookmark(bookmark)}
            onMouseLeave={() => setHoveredBookmark(null)}
            onClick={() => onJumpToTime(bookmark.timestamp)}
          >
            {/* Bookmark marker */}
            <div className="w-3 h-3 bg-yellow-400 border-2 border-white rounded-full shadow-lg transform -translate-y-0.5 group-hover:scale-125 transition-transform duration-200" />

            {/* Tooltip */}
            {hoveredBookmark?.id === bookmark.id && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10 backdrop-blur-sm">
                <div className="font-medium">{bookmark.title}</div>
                <div className="text-xs text-gray-300">{formatTimestamp(bookmark.timestamp)}</div>
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
