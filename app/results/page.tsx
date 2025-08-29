"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, RefreshCw, Heart, Star } from "lucide-react"
import { useState } from "react"

// Mock story data - in real app this would come from AI generation
const mockStory = {
  title: "The Legend of the Code Warrior",
  character: "Alex the Developer",
  panels: [
    {
      title: "The Ordinary World",
      text: "In a bustling city, Alex worked as a junior developer, dreaming of greater adventures in the tech realm...",
      image: "/anime-character-at-computer-in-office.png",
    },
    {
      title: "The Call to Adventure",
      text: "A mysterious startup appeared, seeking a hero to build revolutionary software that could change the world!",
      image: "/anime-character-receiving-glowing-message.png",
    },
    {
      title: "Meeting the Mentor",
      text: "The wise Senior Architect appeared, sharing ancient knowledge of clean code and system design...",
      image: "/wise-anime-mentor-teaching-young-developer.png",
    },
    {
      title: "The Ordeal",
      text: "Facing the dreaded Production Bug Dragon, Alex must use all their skills to save the system!",
      image: "/anime-hero-fighting-digital-dragon-monster.png",
    },
    {
      title: "The Reward",
      text: "Victorious! Alex emerges as a Senior Developer, ready to mentor the next generation of code warriors!",
      image: "/triumphant-anime-hero-with-glowing-sword.png",
    },
  ],
}

export default function ResultsPage() {
  const [likedPanels, setLikedPanels] = useState<number[]>([])

  const toggleLike = (index: number) => {
    setLikedPanels((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="min-h-screen mystical-gradient">
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-gentle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <span className="text-lg opacity-20 text-accent">
              {["✨", "⭐", "🌟", "💫", "🏆", "👑", "⚡", "🌸"][i]}
            </span>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2 bg-accent text-accent-foreground">
            <Star className="w-5 h-5 mr-2" />
            Your Epic Story is Complete
          </Badge>

          <h1 className="text-5xl font-bold mb-4 text-card-foreground" style={{ fontFamily: "var(--font-manrope)" }}>
            {mockStory.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            Starring: <span className="text-primary font-semibold">{mockStory.character}</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button size="lg" className="px-6 py-3 accent-gradient hover:scale-105 transition-all duration-300">
              <Download className="w-5 h-5 mr-2" />
              Download Story
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-6 py-3 hover:scale-105 transition-all duration-300 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Epic Story
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-6 py-3 hover:scale-105 transition-all duration-300 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Generate Another
            </Button>
          </div>
        </div>

        <div className="space-y-12">
          {mockStory.panels.map((panel, index) => (
            <div
              key={index}
              className="okami-card p-6 animate-fade-in-up hover:scale-[1.01] transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="okami-card overflow-hidden">
                    <img
                      src={panel.image || "/placeholder.svg"}
                      alt={panel.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="space-y-4">
                    <Badge variant="outline" className="border-primary text-primary">
                      Chapter {index + 1}
                    </Badge>
                    <h3
                      className="text-2xl font-bold text-card-foreground"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {panel.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">{panel.text}</p>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(index)}
                      className={`transition-all duration-300 ${
                        likedPanels.includes(index)
                          ? "text-red-500 hover:text-red-600"
                          : "text-muted-foreground hover:text-red-500"
                      }`}
                    >
                      <Heart className={`w-5 h-5 mr-2 ${likedPanels.includes(index) ? "fill-current" : ""}`} />
                      {likedPanels.includes(index) ? "Loved!" : "Love this panel"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 okami-card p-8 animate-fade-in-up" style={{ animationDelay: "1s" }}>
          <h2 className="text-3xl font-bold mb-4 text-card-foreground" style={{ fontFamily: "var(--font-manrope)" }}>
            Ready for Another Adventure?
          </h2>
          <p className="text-muted-foreground mb-6">
            Transform another LinkedIn profile or share this epic story with the world
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="accent-gradient" onClick={() => (window.location.href = "/")}>
              Create Another Story
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Share This Masterpiece
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
