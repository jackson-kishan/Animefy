"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { bookmarkStorage, type Bookmark } from "@/lib/videojs-config"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipForward, SkipBack, BookmarkIcon } from "lucide-react"
import BookmarkTimeline from "@/components/bookmark-timeline"
import { Button } from "@/components/ui/button"

interface EnhancedVideoPlayerProps {
  videoUrl: string
  title: string
  episode: number
  onNext?: () => void
  onPrevious?: () => void
}

// Quality levels for different anime sources
const qualityLevels = [
  {
    label: "1080p",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    type: "video/mp4",
  },
  {
    label: "720p",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    type: "video/mp4",
  },
  {
    label: "480p",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    type: "video/mp4",
  },
  {
    label: "360p",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    type: "video/mp4",
  },
]

export default function EnhancedVideoPlayer({
  videoUrl,
  title,
  episode,
  onNext,
  onPrevious,
}: EnhancedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedQuality, setSelectedQuality] = useState("1080p")
  const [showControls, setShowControls] = useState(true)
  const [showBookmarkForm, setShowBookmarkForm] = useState(false)
  const [bookmarkTitle, setBookmarkTitle] = useState("")
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showQualityMenu, setShowQualityMenu] = useState(false)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleDurationChange = () => setDuration(video.duration)
    const handleVolumeChange = () => {
      setVolume(video.volume)
      setIsMuted(video.muted)
    }
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleWaiting = () => setIsLoading(true)
    const handlePlaying = () => setIsLoading(false)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("durationchange", handleDurationChange)
    video.addEventListener("volumechange", handleVolumeChange)
    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("waiting", handleWaiting)
    video.addEventListener("playing", handlePlaying)

    // Auto-hide controls
    let controlsTimeout: NodeJS.Timeout
    const resetControlsTimeout = () => {
      setShowControls(true)
      clearTimeout(controlsTimeout)
      controlsTimeout = setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3000)
    }

    const handleMouseMove = () => resetControlsTimeout()
    const handleTouchStart = () => resetControlsTimeout()

    video.addEventListener("mousemove", handleMouseMove)
    video.addEventListener("touchstart", handleTouchStart)

    // Fullscreen change listener
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("durationchange", handleDurationChange)
      video.removeEventListener("volumechange", handleVolumeChange)
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("waiting", handleWaiting)
      video.removeEventListener("playing", handlePlaying)
      video.removeEventListener("mousemove", handleMouseMove)
      video.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      clearTimeout(controlsTimeout)
    }
  }, [isPlaying])

  useEffect(() => {
    if (videoRef.current) {
      const initialQuality = qualityLevels.find((q) => q.label === selectedQuality) || qualityLevels[0]
      videoRef.current.src = initialQuality.src
    }
  }, [])

  useEffect(() => {
    loadBookmarks()
  }, [episode])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleQualityChange = (quality: string) => {
    const selectedLevel = qualityLevels.find((q) => q.label === quality)
    if (selectedLevel && videoRef.current) {
      const currentTime = videoRef.current.currentTime
      const wasPlaying = !videoRef.current.paused

      videoRef.current.src = selectedLevel.src
      videoRef.current.addEventListener(
        "loadedmetadata",
        () => {
          if (videoRef.current) {
            videoRef.current.currentTime = currentTime
            if (wasPlaying) {
              videoRef.current.play()
            }
          }
        },
        { once: true },
      )

      setSelectedQuality(quality)
      setShowQualityMenu(false)
    }
  }

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate
      setPlaybackRate(rate)
      setShowSpeedMenu(false)
    }
  }

  const handleAddBookmark = (timestamp: number, title: string, description?: string) => {
    const bookmark: Bookmark = {
      id: Date.now().toString(),
      animeId: 1, // This should be passed as a prop
      episode,
      timestamp,
      title,
      description,
      createdAt: new Date(),
    }

    bookmarkStorage.saveBookmark(bookmark)
    loadBookmarks()
    setShowBookmarkForm(false)
    setBookmarkTitle("")
  }

  const loadBookmarks = () => {
    const episodeBookmarks = bookmarkStorage.getBookmarksForEpisode(1, episode) // animeId should be passed as prop
    setBookmarks(episodeBookmarks)
  }

  const handleJumpToBookmark = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const newTime = (clickX / rect.width) * duration
      videoRef.current.currentTime = newTime
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl group">
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        className="w-full aspect-video"
        poster={`/placeholder.svg?height=720&width=1280&text=${encodeURIComponent(title + " - Episode " + episode)}`}
        preload="metadata"
        playsInline
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="anime-loading">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <div className="text-white mt-2 text-sm">Loading Episode...</div>
          </div>
        </div>
      )}

      {/* Custom Overlay Controls */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
        {/* Top Info Bar */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white text-xl font-bold">{title}</h3>
              <p className="text-gray-300 text-sm">Episode {episode}</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* Quality Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  className="bg-black/50 text-white px-3 py-1 rounded border border-gray-600 text-sm hover:bg-black/70 transition-colors"
                >
                  {selectedQuality}
                </button>
                {showQualityMenu && (
                  <div className="absolute top-full right-0 mt-1 bg-black/90 rounded border border-gray-600 min-w-[80px] z-10">
                    {qualityLevels.map((quality) => (
                      <button
                        key={quality.label}
                        onClick={() => handleQualityChange(quality.label)}
                        className={`block w-full text-left px-3 py-2 text-sm hover:bg-purple-600/50 transition-colors ${
                          selectedQuality === quality.label ? "text-purple-400" : "text-white"
                        }`}
                      >
                        {quality.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Speed Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="bg-black/50 text-white px-3 py-1 rounded border border-gray-600 text-sm hover:bg-black/70 transition-colors"
                >
                  {playbackRate}x
                </button>
                {showSpeedMenu && (
                  <div className="absolute top-full right-0 mt-1 bg-black/90 rounded border border-gray-600 min-w-[60px] z-10">
                    {playbackRates.map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handlePlaybackRateChange(rate)}
                        className={`block w-full text-left px-3 py-2 text-sm hover:bg-purple-600/50 transition-colors ${
                          playbackRate === rate ? "text-purple-400" : "text-white"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="text-white hover:text-purple-400 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4 transition-all duration-300 transform hover:scale-110"
          >
            {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white" />}
          </button>
        </div>
      </div>

      {/* Bookmark Form Overlay */}
      {showBookmarkForm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-white text-lg font-bold mb-4">Add Bookmark</h3>
            <p className="text-gray-300 text-sm mb-3">Bookmark at {formatTime(currentTime)}</p>
            <input
              type="text"
              placeholder="Enter bookmark title..."
              value={bookmarkTitle}
              onChange={(e) => setBookmarkTitle(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-400 focus:outline-none mb-4"
              autoFocus
            />
            <div className="flex space-x-3">
              <Button
                onClick={() => handleAddBookmark(currentTime, bookmarkTitle)}
                disabled={!bookmarkTitle.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
              >
                Save Bookmark
              </Button>
              <Button
                onClick={() => {
                  setShowBookmarkForm(false)
                  setBookmarkTitle("")
                }}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        {/* Bookmark Timeline */}
        <BookmarkTimeline
          animeId={1} // This should be passed as a prop
          episode={episode}
          duration={duration}
          currentTime={currentTime}
          onJumpToTime={handleJumpToBookmark}
        />

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-white text-sm mb-2">
            <span>{formatTime(currentTime)}</span>
            <div className="flex-1 bg-gray-600 rounded-full h-2 relative cursor-pointer" onClick={handleSeek}>
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onPrevious && (
              <button onClick={onPrevious} className="text-white hover:text-purple-400 transition-colors">
                <SkipBack className="w-6 h-6" />
              </button>
            )}

            <button onClick={togglePlay} className="text-white hover:text-purple-400 transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            {onNext && (
              <button onClick={onNext} className="text-white hover:text-purple-400 transition-colors">
                <SkipForward className="w-6 h-6" />
              </button>
            )}

            <button
              onClick={() => {
                setShowBookmarkForm(true)
                setCurrentTime(videoRef.current?.currentTime || 0)
              }}
              className="text-white hover:text-purple-400 transition-colors"
              title="Add Bookmark"
            >
              <BookmarkIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <button onClick={toggleMute} className="text-white hover:text-purple-400 transition-colors">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">{selectedQuality}</span>
            <button onClick={toggleFullscreen} className="text-white hover:text-purple-400 transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
