"use client"

import Link from "next/link"
import { Play, Lock } from "lucide-react"

interface EpisodeListProps {
  currentEpisode: number
  totalEpisodes: number
  animeId: number
}

export default function EpisodeList({ currentEpisode, totalEpisodes, animeId }: EpisodeListProps) {
  const episodes = Array.from({ length: Math.min(totalEpisodes, 20) }, (_, i) => i + 1)

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Episodes</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {episodes.map((episodeNum) => (
          <div
            key={episodeNum}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
              episodeNum === currentEpisode
                ? "bg-purple-600 text-white"
                : episodeNum <= currentEpisode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-700/50 text-gray-500"
            }`}
          >
            <div className="flex items-center space-x-3">
              {episodeNum <= currentEpisode ? <Play className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span className="font-medium">Episode {episodeNum}</span>
            </div>
            {episodeNum <= currentEpisode && (
              <Link href={`/watch/${animeId}?episode=${episodeNum}`}>
                <button className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors duration-200">
                  Watch
                </button>
              </Link>
            )}
          </div>
        ))}
        {totalEpisodes > 20 && (
          <div className="text-center py-4">
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">Load More Episodes</button>
          </div>
        )}
      </div>
    </div>
  )
}
