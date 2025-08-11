"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const bannerData = [
  {
    id: 1,
    title: "Attack on Titan",
    description: "Humanity fights for survival against giant humanoid Titans in this epic dark fantasy series.",
    image: "/anime-banner.png",
    genre: "Action, Drama",
  },
  {
    id: 2,
    title: "Demon Slayer",
    description: "A young boy becomes a demon slayer to save his sister and avenge his family.",
    image: "/demon-slayer-banner.png",
    genre: "Action, Supernatural",
  },
  {
    id: 3,
    title: "Your Name",
    description: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
    image: "/anime-banner.png",
    genre: "Romance, Drama",
  },
  {
    id: 4,
    title: "Spirited Away",
    description: "A young girl enters a world ruled by gods and witches where humans are changed into beasts.",
    image: "/spirited-away-banner.png",
    genre: "Adventure, Family",
  },
]

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length)
  }

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {bannerData.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-full bg-cover bg-center relative" style={{ backgroundImage: `url(${banner.image})` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6 max-w-2xl">
                <div className="text-white space-y-4">
                  <div className="text-sm font-medium text-purple-400 uppercase tracking-wider">{banner.genre}</div>
                  <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    {banner.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">{banner.description}</p>
                  <div className="flex gap-4 pt-4">
                    <Link href={`/watch/${banner.id}`}>
                      <Button
                        size="lg"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        <Play className="w-5 h-5 mr-2 fill-white" />
                        Watch Now
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold bg-transparent"
                    >
                      More Info
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-purple-500 w-8" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
