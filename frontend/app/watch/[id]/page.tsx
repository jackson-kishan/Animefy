import EnhancedVideoPlayer from "@/components/enhanced-video-player"
import EpisodeList from "@/components/episode-list"
import BookmarkManager from "@/components/bookmark-manager"
import { notFound } from "next/navigation"

const animeData = {
  1: {
    title: "Attack on Titan",
    description:
      "Humanity fights for survival against giant humanoid Titans in this epic dark fantasy series. In a world where humanity resides within enormous walled cities to protect themselves from the Titans, gigantic humanoid creatures, young Eren Yeager joins the military to fight the Titans after his hometown is invaded and his mother is eaten.",
    genre: "Action, Drama, Fantasy",
    rating: 9.0,
    year: 2013,
    currentEpisode: 1,
    totalEpisodes: 87,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  2: {
    title: "Demon Slayer",
    description:
      "A young boy becomes a demon slayer to save his sister and avenge his family. Tanjiro Kamado lives with his family in the mountains. When he returns from selling charcoal in town, he discovers that his family has been slaughtered by demons, with only his sister Nezuko surviving - but she has been transformed into a demon.",
    genre: "Action, Supernatural, Historical",
    rating: 8.7,
    year: 2019,
    currentEpisode: 1,
    totalEpisodes: 44,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
}

export default function WatchPage({ params }: { params: { id: string } }) {
  const animeId = Number.parseInt(params.id)
  const anime = animeData[animeId as keyof typeof animeData]

  if (!anime) {
    notFound()
  }

  const handleNextEpisode = () => {
    // Logic to go to next episode
    console.log("Next episode")
  }

  const handlePreviousEpisode = () => {
    // Logic to go to previous episode
    console.log("Previous episode")
  }

  const handleJumpToTime = (timestamp: number) => {
    // This will be passed to the video player to jump to specific time
    console.log("Jump to time:", timestamp)
  }

  const handleAddBookmark = (timestamp: number, title: string, description?: string) => {
    console.log("Bookmark added:", { timestamp, title, description })
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        <EnhancedVideoPlayer
          videoUrl={anime.videoUrl}
          title={anime.title}
          episode={anime.currentEpisode}
          onNext={handleNextEpisode}
          onPrevious={handlePreviousEpisode}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                {anime.title} - Episode {anime.currentEpisode}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                <span className="text-purple-400 font-medium">{anime.genre}</span>
                <span>•</span>
                <span>{anime.year}</span>
                <span>•</span>
                <span>⭐ {anime.rating}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">{anime.description}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <EpisodeList currentEpisode={anime.currentEpisode} totalEpisodes={anime.totalEpisodes} animeId={animeId} />
          </div>

          <div className="lg:col-span-1">
            <BookmarkManager
              animeId={animeId}
              episode={anime.currentEpisode}
              animeTitle={anime.title}
              onJumpToTime={handleJumpToTime}
              currentTime={0} // This should be connected to the video player's current time
              onAddBookmark={handleAddBookmark}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
