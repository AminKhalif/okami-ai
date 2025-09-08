"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast";
import { scrapeLinkedInProfileAction } from "@/features/linkedin/actions";
import { generateStoryOutlineAction, generatePanelScriptsAction, generateMangaPanelImagesAction } from "@/features/story-generator/actions";

export default function HomePage() {
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  const handleGenerate = async () => {
    if (!linkedinUrl.trim()) {
      toast({
        title: "LinkedIn URL is required",
        description: "Please enter a valid LinkedIn profile URL.",
        variant: "destructive",
      });
      return;
    }

    // Redirect to processing page with LinkedIn URL
    router.push(`/process?url=${encodeURIComponent(linkedinUrl)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl sm:text-7xl font-bold text-black mb-8 leading-tight">
            Turn your LinkedIn into a manga story
          </h1>

          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
            Paste your profile. Get a short, funny anime-style story about your career.
          </p>

          <div className="manga-card max-w-2xl mx-auto p-8 mb-20">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                className="flex-1 text-base py-4 border-2 border-black rounded-lg bg-white"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                disabled={isAnimating}
              />
              <Button
                size="lg"
                className={`px-8 py-4 text-base font-bold bg-yellow-400 hover:bg-black hover:text-yellow-400 text-black border-2 border-black rounded-lg transition-all duration-200 ${isAnimating ? "animate-wiggle" : ""}`}
                onClick={handleGenerate}
                disabled={!linkedinUrl.trim() || isAnimating}
              >
                <Zap className="w-5 h-5 mr-2" />
                {isAnimating ? "Creating..." : "Generate My Story"}
              </Button>
            </div>
          </div>

          <div className="comic-panel max-w-md mx-auto p-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl border-2 border-black">
                🦸‍♂️
              </div>
              <div className="speech-bubble mb-4">
                <p className="font-bold text-black">"From junior dev to senior engineer!"</p>
              </div>
              <p className="text-sm text-gray-500">Preview of your manga story</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "We turn your career highlights into a quick story arc",
                emoji: "📖",
              },
              {
                title: "Your journey gets drawn in manga-style frames",
                emoji: "🎨",
              },
              {
                title: "Save it or post it anywhere",
                emoji: "📱",
              },
            ].map((feature, index) => (
              <div key={index} className="manga-card p-8 text-center bg-white">
                <div className="text-4xl mb-6">{feature.emoji}</div>
                <p className="text-black font-medium leading-relaxed text-lg">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-black mb-16">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Drop your LinkedIn link", emoji: "🔗" },
              { title: "We write your journey in manga style", emoji: "✍️" },
              { title: "Panels get drawn", emoji: "🎨" },
              { title: "Read it, download it, share it", emoji: "🚀" },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-6 font-bold border-2 border-black">
                  {step.emoji}
                </div>
                <p className="text-black font-medium text-lg leading-relaxed">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <footer className="py-12 text-center">
        <p className="text-xl text-black font-medium">Ready to see your career as a manga story?</p>
      </footer>
    </div>
  )
}
