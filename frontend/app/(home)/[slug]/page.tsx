"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, Play, Plus, Share2, ChevronRight, Heart } from "lucide-react"
import AnimeDetailsHero from "@/components/anime-details-hero"
import AnimeDetailsInfo from "@/components/anime-details-info"
import MoreSeasons from "@/components/more-seasons"
import RelatedAnime from "@/components/related-anime"
import CharactersSection from "@/components/characters-section"

const animeDatabase: Record<
  number,
  {
    id: number
    title: string
    japaneseTitle: string
    genre: string[]
    rating: number
    year: number
    episodes: number
    summary: string
    image: string
    status: string
    aired: string
    premiered: string
    duration: string
    malScore: number
    studios: string[]
    producers: string[]
    synopsis: string
    seasons: Array<{ id: number; title: string; episodes: number; image: string }>
    characters: Array<{
      id: number
      name: string
      role: string
      voiceActor: string
      voiceLanguage: string
      image: string
    }>
    related: Array<{ id: number; title: string; type: string; image: string; rating: number }>
  }
> = {
  1: {
    id: 1,
    title: "Attack on Titan",
    japaneseTitle: "進撃の巨人",
    genre: ["Action", "Adventure", "Dark Fantasy"],
    rating: 9.0,
    year: 2013,
    episodes: 87,
    image: "/attack-on-titan-inspired-poster.png",
    status: "Finished Airing",
    aired: "Apr 7, 2013 to Nov 5, 2023",
    premiered: "Spring 2013",
    duration: "24m",
    malScore: 8.53,
    studios: ["Wit Studio", "MAPPA"],
    producers: ["Funimation", "Kodansha", "Mainichi Broadcasting System"],
    summary:
      "Humanity has been devastated by the sudden appearance of Titans, gigantic humanoid creatures who consume human flesh. The story follows Eren Yeager, Mikasa Ackerman, and Armin Arlert as they seek to protect humanity and discover the truth behind the Titan threat.",
    synopsis:
      "Humanity has been devastated by the sudden appearance of Titans, gigantic humanoid creatures who consume human flesh. The largest of these creatures, the Colossus Titan, stands at a whopping sixty meters tall. In response, the survivors hide themselves in a massive walled city, protected by walls that stand taller than the Colossus Titan itself.\n\nThe story follows Eren Yeager, a young boy whose hometown is destroyed and whose mother is consumed by a Titan. Vowing that he will kill all Titans, Eren joins the Survey Corps, an elite military unit that fights Titans outside the walled cities. Aided by his childhood friends Mikasa Ackerman and Armin Arlert, Eren seeks to reclaim the world from the Titans and find out what happened to the world.",
    seasons: [
      { id: 1, title: "Season 1", episodes: 25, image: "/attack-on-titan-inspired-poster.png" },
      { id: 2, title: "Season 2", episodes: 25, image: "/attack-on-titan-inspired-poster.png" },
      { id: 3, title: "Season 3", episodes: 22, image: "/attack-on-titan-inspired-poster.png" },
      { id: 4, title: "Season 4", episodes: 16, image: "/attack-on-titan-inspired-poster.png" },
    ],
    characters: [
      {
        id: 1,
        name: "Eren Yeager",
        role: "Main",
        voiceActor: "Yuki Kaji",
        voiceLanguage: "Japanese",
        image: "/placeholder-famz6.png",
      },
      {
        id: 2,
        name: "Mikasa Ackerman",
        role: "Main",
        voiceActor: "Yui Ishikawa",
        voiceLanguage: "Japanese",
        image: "/placeholder-famz6.png",
      },
      {
        id: 3,
        name: "Armin Arlert",
        role: "Main",
        voiceActor: "Marina Inoue",
        voiceLanguage: "Japanese",
        image: "/placeholder-famz6.png",
      },
      {
        id: 4,
        name: "Levi Ackerman",
        role: "Main",
        voiceActor: "Hiroshi Kamiya",
        voiceLanguage: "Japanese",
        image: "/placeholder-famz6.png",
      },
    ],
    related: [
      {
        id: 2,
        title: "Demon Slayer",
        type: "TV",
        image: "/demon-slayer-inspired-poster.png",
        rating: 8.7,
      },
      {
        id: 3,
        title: "Jujutsu Kaisen",
        type: "TV",
        image: "/my-hero-academia-inspired-poster.png",
        rating: 8.5,
      },
      {
        id: 5,
        title: "My Hero Academia",
        type: "TV",
        image: "/my-hero-academia-inspired-poster.png",
        rating: 8.6,
      },
    ],
  },
  2: {
    id: 2,
    title: "Demon Slayer",
    japaneseTitle: "鬼滅の刃",
    genre: ["Action", "Supernatural", "Adventure"],
    rating: 8.7,
    year: 2019,
    episodes: 44,
    image: "/demon-slayer-inspired-poster.png",
    status: "Ongoing",
    aired: "Apr 6, 2019 to Present",
    premiered: "Spring 2019",
    duration: "24m",
    malScore: 8.33,
    studios: ["ufotable"],
    producers: ["Aniplex", "Shueisha", "Funimation"],
    summary:
      "Tanjiro's family is slaughtered by demons, and his younger sister Nezuko is turned into a demon herself. To save his sister and avenge his family, Tanjiro embarks on a journey to become a Demon Slayer.",
    synopsis:
      "Since ancient times, the Demon Slayer Corps has been an existence somewhere between legends and fairy tales. It stood against the demons that are always hiding in the darkness. Tanjiro Kamado is a kind-hearted boy who makes charcoal for a living. One day, his entire family is slaughtered by demons, and his younger sister Nezuko is turned into a demon herself. To save his sister and get revenge on the demons that killed his family, Tanjiro embarks on a journey to become a Demon Slayer.",
    seasons: [
      { id: 1, title: "Season 1", episodes: 26, image: "/demon-slayer-inspired-poster.png" },
      { id: 2, title: "Mugen Train Arc", episodes: 1, image: "/demon-slayer-inspired-poster.png" },
      { id: 3, title: "Season 2", episodes: 18, image: "/demon-slayer-inspired-poster.png" },
    ],
    characters: [
      {
        id: 1,
        name: "Tanjiro Kamado",
        role: "Main",
        voiceActor: "Natsuki Hanae",
        voiceLanguage: "Japanese",
        image: "/placeholder-famz6.png",
      },
      {
        id: 2,
        name: "Nezuko Kamado",
        role: "Main",
        voiceActor: "Akari Kitō",
        voiceLanguage: "Japanese",
        image: "/placeholder-famz6.png",
      },
      {
        id: 3,
        name: "Zenitsu Agatsuma",
        role: "Main",
        voiceActor: "Hiro Shimono",
        voiceLanguage: "Japanese",
        image: "/placeholder-famz6.png",
      },
      {
        id: 4,
        name: "Inosuke Hashibira",
        role: "Main",
        voiceActor: "Shunsuke Kazama",
        voiceLanguage: "Japanese",
        image: "/placeholder-famz6.png",
      },
    ],
    related: [
      {
        id: 1,
        title: "Attack on Titan",
        type: "TV",
        image: "/attack-on-titan-inspired-poster.png",
        rating: 9.0,
      },
      {
        id: 4,
        title: "Jujutsu Kaisen",
        type: "TV",
        image: "/my-hero-academia-inspired-poster.png",
        rating: 8.5,
      },
      {
        id: 8,
        title: "My Hero Academia",
        type: "TV",
        image: "/my-hero-academia-inspired-poster.png",
        rating: 8.6,
      },
    ],
  },
}

export default function AnimeDetailsPage({ params }: { params: { id: string } }) {
  const animeId = parseInt(params.id)
  const anime = animeDatabase[animeId] || animeDatabase[1]
  const [isAdded, setIsAdded] = useState(false)

  return (
    <main className="min-h-screen bg-gray-900">
      <AnimeDetailsHero anime={anime} isAdded={isAdded} setIsAdded={setIsAdded} />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimeDetailsInfo anime={anime} />
            <MoreSeasons anime={anime} />
            <CharactersSection characters={anime.characters} />
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500" />
                Anime Information
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Japanese</p>
                  <p className="text-white font-semibold">{anime.japaneseTitle}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Status</p>
                  <p className="text-white font-semibold">{anime.status}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Aired</p>
                  <p className="text-white font-semibold">{anime.aired}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Premiered</p>
                  <p className="text-white font-semibold">{anime.premiered}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Duration</p>
                  <p className="text-white font-semibold">{anime.duration}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">MAL Score</p>
                  <p className="text-white font-semibold">{anime.malScore}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Studios</p>
                  <div className="flex flex-wrap gap-2">
                    {anime.studios.map((studio) => (
                      <span key={studio} className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
                        {studio}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    {anime.genre.map((g) => (
                      <span key={g} className="bg-purple-900/50 text-purple-200 px-2 py-1 rounded-full text-xs">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Share Anime</h3>
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedAnime related={anime.related} />
    </main>
  )
}
