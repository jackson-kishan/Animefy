"use client"

import { useEffect, useRef } from "react"
import videojs from "video.js"
import "video.js/dist/video-js.css"

interface VideoPlayerProps {
  videoUrl: string
  title: string
  episode: number
}

export default function VideoPlayer({ videoUrl, title, episode }: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be attached to an element
      const videoElement = document.createElement("video-js")

      videoElement.classList.add("vjs-default-skin")
      videoRef.current!.appendChild(videoElement)

      const player = (playerRef.current = videojs(
        videoElement,
        {
          autoplay: false,
          controls: true,
          responsive: true,
          fluid: true,
          preload: "auto",
          poster: "/placeholder.svg?height=720&width=1280&text=Loading...",
          playbackRates: [0.5, 1, 1.25, 1.5, 2],
          sources: [
            {
              src: videoUrl,
              type: "video/mp4",
            },
          ],
          // Quality selector plugin options
          plugins: {
            qualitySelector: {
              default: "auto",
            },
          },
        },
        () => {
          videojs.log("Player is ready")
        },
      ))

      // Custom styling and controls
      player.ready(() => {
        // Add custom overlay with anime info
        const overlay = player.createModal("", {
          content: `
            <div class="vjs-overlay-content">
              <h3>${title}</h3>
              <p>Episode ${episode}</p>
            </div>
          `,
          temporary: false,
          uncloseable: false,
        })

        // Auto-hide overlay after 3 seconds
        setTimeout(() => {
          overlay.close()
        }, 3000)
      })
    }

    // Dispose the Video.js player when the functional component unmounts
    return () => {
      const player = playerRef.current
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [videoUrl, title, episode])

  return (
    <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
      <div data-vjs-player>
        <div ref={videoRef} className="video-js-container" />
      </div>

      {/* Custom anime info overlay */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 z-10 pointer-events-none">
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-gray-300 text-sm">Episode {episode}</p>
      </div>
    </div>
  )
}
