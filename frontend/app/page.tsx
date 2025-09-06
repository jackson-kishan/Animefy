"use client"

import BannerSlider from "@/components/banner-slider"
import AnimeGrid from "@/components/anime-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <BannerSlider />
      <AnimeGrid />
    </div>
  )
}
