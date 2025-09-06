import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import BookmarkExport from "@/components/bookmark-export"

interface BookmarkManagerProps {
  animeId: string
  episode: string
  animeTitle: string
  bookmarks: any[]
}

const BookmarkManager: React.FC<BookmarkManagerProps> = ({ animeId, episode, animeTitle, bookmarks }) => {
  return (
    <Card>
      <CardContent>
        {/* Display bookmarks here */}
        {bookmarks.length > 0 && (
          <>
            <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-700">
              {bookmarks.length} bookmark{bookmarks.length !== 1 ? "s" : ""} saved
            </div>
            <BookmarkExport animeId={animeId} episode={episode} animeTitle={animeTitle} />
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default BookmarkManager
