"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Zap, Palette, BookOpen, Star, Moon, Sun } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { scrapeLinkedInProfileAction } from "@/features/linkedin/actions"
import { generateStoryOutlineAction, generatePanelScriptsAction, generateMangaPanelImagesAction } from "@/features/story-generator/actions"

const processingSteps = [
  { id: "analysis", title: "Profile Analysis", desc: "Analyzing your professional journey", icon: Zap, duration: 2000 },
  { id: "story", title: "Story Crafting", desc: "Creating your Hero's Journey", icon: BookOpen, duration: 3000 },
  {
    id: "images",
    title: "Anime Art Generation",
    desc: "Producing beautiful manga panels",
    icon: Palette,
    duration: 4000,
  },
  { id: "assembly", title: "Final Assembly", desc: "Completing your epic story", icon: Sparkles, duration: 1000 },
]

const funFacts = [
  "The Hero's Journey structure was first described by Joseph Campbell and appears in countless anime stories.",
  "Studio Ghibli films masterfully use the Hero's Journey structure, just like your career progression.",
  "Manga panels traditionally read right-to-left in Japan, creating unique storytelling rhythms.",
  "Professional growth often mirrors the character development arcs found in epic anime series.",
  "Your career milestones become the perfect foundation for compelling narrative adventures.",
]

export default function ProcessPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentFact, setCurrentFact] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const linkedinUrl = searchParams.get("url")

  useEffect(() => {
    if (!linkedinUrl) {
      router.push('/')
      return
    }

    // Start fact rotation
    const factTimer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length)
    }, 3000)

    // Start actual processing pipeline
    runProcessingPipeline(linkedinUrl)

    return () => {
      clearInterval(factTimer)
    }
  }, [router, linkedinUrl])

  const runProcessingPipeline = async (url: string) => {
    try {
      // Step 1: Profile Analysis
      setCurrentStep(1)
      setProgress(25)

      const scrapeResult = await scrapeLinkedInProfileAction(url)
      if (!scrapeResult.success || !scrapeResult.data) {
        throw new Error(scrapeResult.error || 'Failed to scrape LinkedIn profile')
      }

      // Step 2: Story Crafting  
      setCurrentStep(2)
      setProgress(50)

      const storyOutlineResult = await generateStoryOutlineAction({ 
        panelCount: 8, 
        profileData: scrapeResult.data 
      })
      
      if (!storyOutlineResult.success || !storyOutlineResult.data) {
        throw new Error(storyOutlineResult.error || 'Failed to generate story outline')
      }

      const panelScriptsResult = await generatePanelScriptsAction({ 
        storyOutline: storyOutlineResult.data, 
        profileData: scrapeResult.data 
      })
      
      if (!panelScriptsResult.success || !panelScriptsResult.data) {
        throw new Error(panelScriptsResult.error || 'Failed to generate panel scripts')
      }

      // Step 3: Art Generation
      setCurrentStep(3)
      setProgress(75)

      const imageGenerationResult = await generateMangaPanelImagesAction({ 
        panelScripts: panelScriptsResult.data, 
        profileData: scrapeResult.data 
      })
      
      if (!imageGenerationResult.success || !imageGenerationResult.data) {
        throw new Error(imageGenerationResult.error || 'Failed to generate manga images')
      }

      // Step 4: Final Assembly
      setCurrentStep(4)
      setProgress(100)

      // Brief pause for final assembly
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Redirect to results with panel scripts
      router.push(`/results?panelScripts=${encodeURIComponent(JSON.stringify(panelScriptsResult.data))}`)

    } catch (error) {
      console.error('Processing pipeline error:', error)
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
      
      // Redirect back to home after error
      setTimeout(() => router.push('/'), 3000)
    }
  }

  return (
    <div className="min-h-screen mystical-gradient overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-gentle-float">
          <Star className="w-5 h-5 text-accent/30" />
        </div>
        <div className="absolute top-40 right-20 animate-gentle-float" style={{ animationDelay: "1s" }}>
          <Moon className="w-6 h-6 text-primary/20" />
        </div>
        <div className="absolute bottom-40 left-20 animate-gentle-float" style={{ animationDelay: "2s" }}>
          <Sparkles className="w-4 h-4 text-accent/40" />
        </div>
        <div className="absolute top-60 right-10 animate-gentle-float" style={{ animationDelay: "0.5s" }}>
          <Sun className="w-5 h-5 text-primary/25" />
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="okami-card w-full max-w-3xl p-8 animate-fade-in-up">
          <div className="text-center">
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <div className="absolute inset-2 rounded-full bg-primary/10 flex items-center justify-center animate-shimmer">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 animate-gentle-float">
                  <div className="w-4 h-4 bg-accent rounded-full"></div>
                </div>
                <div
                  className="absolute top-1/2 -right-2 transform -translate-y-1/2 animate-gentle-float"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
              </div>

              <Badge variant="secondary" className="mb-4 text-lg px-4 py-2 bg-accent text-accent-foreground">
                <Sparkles className="w-5 h-5 mr-2" />
                Okami AI at Work
              </Badge>

              <h1
                className="text-4xl font-bold mb-4 text-balance text-card-foreground"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Crafting Your Epic Story
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Our AI is transforming your professional journey into a captivating anime adventure
              </p>
            </div>

            <div className="mb-8">
              <div className="okami-card p-4 mb-4">
                <Progress value={progress} className="h-4 mb-2" />
                <p className="text-muted-foreground">
                  {progress < 100
                    ? `${Math.round(progress)}% complete - Creating your masterpiece...`
                    : "Story complete! Preparing final presentation..."}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {processingSteps.map((step, index) => {
                const Icon = step.icon
                const isComplete = index < currentStep
                const isActive = index === currentStep - 1

                return (
                  <div
                    key={step.id}
                    className={`okami-card p-4 transition-all duration-500 ${isActive ? "scale-105" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isComplete
                            ? "bg-primary text-primary-foreground"
                            : isActive
                              ? "bg-accent text-accent-foreground animate-shimmer"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-left flex-1">
                        <p
                          className="font-bold text-lg text-card-foreground"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {step.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                        <p className="text-xs font-medium mt-1">
                          {isComplete ? (
                            <span className="text-primary">Complete</span>
                          ) : isActive ? (
                            <span className="text-accent">In progress...</span>
                          ) : (
                            <span className="text-muted-foreground">Waiting...</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="okami-card p-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <h3 className="font-bold text-xl mb-3 text-card-foreground" style={{ fontFamily: "var(--font-manrope)" }}>
                Did You Know?
              </h3>
              <p className="text-muted-foreground leading-relaxed">{funFacts[currentFact]}</p>
            </div>

            {linkedinUrl && (
              <div className="mt-6 text-sm text-muted-foreground">
                <p>Transforming: {decodeURIComponent(linkedinUrl)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
