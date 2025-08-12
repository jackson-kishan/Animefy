// Bookmark types
export interface Bookmark {
  id: string
  animeId: number
  episode: number
  timestamp: number
  title: string
  description?: string
  thumbnail?: string
  createdAt: Date
}

// Bookmark storage functions
export const bookmarkStorage = {
  getBookmarks: (): Bookmark[] => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem("anime-bookmarks")
    return stored ? JSON.parse(stored) : []
  },

  saveBookmark: (bookmark: Bookmark): void => {
    if (typeof window === "undefined") return
    const bookmarks = bookmarkStorage.getBookmarks()
    const existingIndex = bookmarks.findIndex(
      (b) =>
        b.animeId === bookmark.animeId &&
        b.episode === bookmark.episode &&
        Math.abs(b.timestamp - bookmark.timestamp) < 5,
    )

    if (existingIndex >= 0) {
      bookmarks[existingIndex] = bookmark
    } else {
      bookmarks.push(bookmark)
    }

    localStorage.setItem("anime-bookmarks", JSON.stringify(bookmarks))
  },

  removeBookmark: (bookmarkId: string): void => {
    if (typeof window === "undefined") return
    const bookmarks = bookmarkStorage.getBookmarks()
    const filtered = bookmarks.filter((b) => b.id !== bookmarkId)
    localStorage.setItem("anime-bookmarks", JSON.stringify(filtered))
  },

  getBookmarksForEpisode: (animeId: number, episode: number): Bookmark[] => {
    return bookmarkStorage.getBookmarks().filter((b) => b.animeId === animeId && b.episode === episode)
  },
}

// Format timestamp to readable time
export const formatTimestamp = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`
}
