"use client"

import { useState } from "react"
import { Star, Play, Calendar } from "lucide-react"
import Link from "next/link"

const animeData = [
  {
    id: 1,
    title: "Attack on Titan",
    genre: "Action, Drama",
    rating: 9.0,
    year: 2013,
    episodes: 87,
    summary: "Humanity fights for survival against giant humanoid Titans in this epic dark fantasy series.",
    image: "/attack-on-titan-inspired-poster.png",
  },
  {
    id: 2,
    title: "Demon Slayer",
    genre: "Action, Supernatural",
    rating: 8.7,
    year: 2019,
    episodes: 44,
    summary: "A young boy becomes a demon slayer to save his sister and avenge his family.",
    image: "/demon-slayer-inspired-poster.png",
  },
  {
    id: 3,
    title: "Your Name",
    genre: "Romance, Drama",
    rating: 8.4,
    year: 2016,
    episodes: 1,
    summary: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
    image: "/my-name-poster.png",
  },
  {
    id: 4,
    title: "Spirited Away",
    genre: "Adventure, Family",
    rating: 9.3,
    year: 2001,
    episodes: 1,
    summary: "A young girl enters a world ruled by gods and witches where humans are changed into beasts.",
    image: "/spirited-away-poster.png",
  },
  {
    id: 5,
    title: "One Piece",
    genre: "Adventure, Comedy",
    rating: 9.1,
    year: 1999,
    episodes: 1000,
    summary: "Follow Monkey D. Luffy and his crew as they search for the ultimate treasure known as One Piece.",
    image: "/anime-pirate-poster.png",
  },
  {
    id: 6,
    title: "Naruto",
    genre: "Action, Adventure",
    rating: 8.4,
    year: 2002,
    episodes: 720,
    summary: "A young ninja seeks recognition from his peers and dreams of becoming the Hokage.",
    image: "/anime-poster.png",
  },
  {
    id: 7,
    title: "Death Note",
    genre: "Thriller, Supernatural",
    rating: 9.0,
    year: 2006,
    episodes: 37,
    summary: "A high school student discovers a supernatural notebook that kills anyone whose name is written in it.",
    image: "/death-note-poster.png",
  },
  {
    id: 8,
    title: "My Hero Academia",
    genre: "Action, School",
    rating: 8.6,
    year: 2016,
    episodes: 138,
    summary: "In a world where most people have superpowers, a powerless boy enrolls in a prestigious hero academy.",
    image: "/my-hero-academia-inspired-poster.png",
  },
]

export default function AnimeGrid() {
  const [hoveredAnime, setHoveredAnime] = useState<number | null>(null)

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Popular Anime
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {animeData.map((anime) => (
            <div
              key={anime.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredAnime(anime.id)}
              onMouseLeave={() => setHoveredAnime(null)}
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-800 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/25">
                <img
                  src={anime.image || "/placeholder.svg"}
                  alt={anime.title}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href={`/watch/${anime.id}`}>
                    <div className="bg-purple-600 hover:bg-purple-700 rounded-full p-4 transform transition-transform duration-300 hover:scale-110">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </Link>
                </div>

                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-semibold">{anime.rating}</span>
                </div>
              </div>

              {/* Hover card */}
              {hoveredAnime === anime.id && (
                <div className="absolute top-0 left-full ml-4 w-80 bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-2xl z-50 animate-in fade-in-0 slide-in-from-left-2 duration-300">
                  <h3 className="text-xl font-bold text-white mb-2">{anime.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>{anime.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{anime.year}</span>
                    </div>
                    <span>{anime.episodes} episodes</span>
                  </div>
                  <div className="text-purple-400 text-sm font-medium mb-2">{anime.genre}</div>
                  <p className="text-gray-300 text-sm leading-relaxed">{anime.summary}</p>
                  <Link href={`/watch/${anime.id}`}>
                    <div className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 flex items-center space-x-2">
                      <Play className="w-4 h-4 fill-white" />
                      <span>Watch Now</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
