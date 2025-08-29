/**
 * @fileoverview Manga panel component for displaying individual story segments
 */

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface MangaPanelProps {
  /** URL of the generated anime-style image */
  imageUrl: string
  /** Story caption for this panel */
  caption: string
  /** Panel number in the sequence */
  panelNumber: number
  /** Title of this story segment */
  title: string
  /** Whether this panel should have emphasis styling */
  isHighlight?: boolean
}

/**
 * Displays a single manga panel with image and caption in comic book style
 */
function MangaPanel({ imageUrl, caption, panelNumber, title, isHighlight = false }: MangaPanelProps) {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isHighlight ? "ring-2 ring-primary shadow-lg" : ""
      }`}
    >
      <div className="relative">
        {/* Panel Number Badge */}
        <Badge variant={isHighlight ? "default" : "secondary"} className="absolute top-3 left-3 z-10 font-bold">
          Panel {panelNumber}
        </Badge>

        {/* Manga Image */}
        <div className="relative aspect-[4/3] bg-muted">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={`Manga panel ${panelNumber}: ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Comic-style border effect */}
          <div className="absolute inset-0 border-4 border-foreground/10 rounded-lg"></div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Panel Title */}
        <h3 className="font-bold text-lg mb-2 text-balance">{title}</h3>

        {/* Story Caption */}
        <div className="relative">
          {/* Speech bubble styling */}
          <div className="bg-card border-2 border-foreground/20 rounded-lg p-3 relative">
            <p className="text-sm leading-relaxed text-pretty">{caption}</p>

            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 left-4 w-4 h-4 bg-card border-r-2 border-b-2 border-foreground/20 transform rotate-45"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { MangaPanel }
