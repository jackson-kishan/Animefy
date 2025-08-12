"use client"

import Link from "next/link"
import { Search, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AnimeStream
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
              Home
            </Link>
            <Link href="/browse" className="text-gray-300 hover:text-white transition-colors duration-200">
              Browse
            </Link>
            <Link href="/popular" className="text-gray-300 hover:text-white transition-colors duration-200">
              Popular
            </Link>
            <Link href="/genres" className="text-gray-300 hover:text-white transition-colors duration-200">
              Genres
            </Link>
          </div>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                Home
              </Link>
              <Link href="/browse" className="text-gray-300 hover:text-white transition-colors duration-200">
                Browse
              </Link>
              <Link href="/popular" className="text-gray-300 hover:text-white transition-colors duration-200">
                Popular
              </Link>
              <Link href="/genres" className="text-gray-300 hover:text-white transition-colors duration-200">
                Genres
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
