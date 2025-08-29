/**
 * @fileoverview Results page displaying the generated anime story
 */

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MangaPanel } from "@/components/story/manga-panel"
import { Download, Share2, RefreshCw, Heart } from "lucide-react"

interface StoryPageProps {
  params: {
    id: string
  }
}

/**
 * Results page component that displays the generated manga story
 */
function StoryPage({ params }: StoryPageProps) {
  // Mock data - in real implementation, this would fetch from API
  const storyData = {
    id: params.id,
    title: "The Epic Journey of Sarah Chen",
    subtitle: "From Junior Developer to Tech Lead",
    panels: [
      {
        id: 1,
        title: "The Ordinary World",
        caption:
          "Sarah worked quietly at her desk, debugging code and dreaming of bigger challenges. Little did she know, her greatest adventure was about to begin...",
        imageUrl: "/anime-girl-programmer-at-desk-with-multiple-monito.png",
      },
      {
        id: 2,
        title: "The Call to Adventure",
        caption:
          "A mysterious email arrived - a startup needed a lead developer for their revolutionary AI project. The salary was tempting, but the risk was enormous!",
        imageUrl: "/anime-character-looking-at-glowing-email-notificat.png",
      },
      {
        id: 3,
        title: "Trials and Tribulations",
        caption:
          "The codebase was a nightmare! Legacy systems, no documentation, and impossible deadlines. Sarah faced her greatest coding challenges yet.",
        imageUrl: "/anime-programmer-surrounded-by-floating-code-symbo.png",
      },
      {
        id: 4,
        title: "The Transformation",
        caption:
          "Through countless late nights and breakthrough moments, Sarah evolved. She learned to lead, to architect, and to inspire her team.",
        imageUrl: "/anime-character-with-glowing-aura-presenting-to-te.png",
      },
      {
        id: 5,
        title: "Victory and Mastery",
        caption:
          "The product launched successfully! Sarah had become the tech lead she always dreamed of being, ready for whatever challenges lay ahead.",
        imageUrl: "/anime-character-celebrating-with-team-as-rockets-l.png",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">
                <Heart className="w-3 h-3 mr-1" />
                Your Anime Story
              </Badge>
              <h1 className="text-2xl font-bold text-balance">{storyData.title}</h1>
              <p className="text-muted-foreground">{storyData.subtitle}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Story Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              Your Professional Hero's Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Every great story follows the Hero's Journey, and your career is no exception! Watch as your professional
              experiences transform into an epic anime adventure, complete with challenges, growth, and ultimate
              triumph.
            </p>
          </CardContent>
        </Card>

        {/* Manga Panels Grid */}
        <div className="grid gap-8 md:gap-12">
          {storyData.panels.map((panel, index) => (
            <div
              key={panel.id}
              className={`${index % 2 === 1 ? "md:flex-row-reverse" : ""} md:flex md:items-center md:gap-8`}
            >
              <div className="md:flex-1">
                <MangaPanel
                  imageUrl={panel.imageUrl}
                  caption={panel.caption}
                  panelNumber={panel.id}
                  title={panel.title}
                  isHighlight={index === 2} // Highlight the climax panel
                />
              </div>

              {/* Panel connector for desktop */}
              {index < storyData.panels.length - 1 && (
                <div className="hidden md:block w-8 flex-shrink-0">
                  <div className="w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                  <div className="w-2 h-2 bg-primary rounded-full mx-auto -mt-1"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-12 text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Love Your Story?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Share your epic professional journey with the world! Download your manga story or share it on social media
              to inspire others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                <Download className="w-4 h-4 mr-2" />
                Download Full Story
              </Button>
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share on LinkedIn
              </Button>
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                <RefreshCw className="w-4 h-4 mr-2" />
                Create Another Story
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Your professional journey deserves an epic story ✨</p>
        </div>
      </footer>
    </div>
  )
}

export default StoryPage
