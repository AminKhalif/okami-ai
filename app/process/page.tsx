"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Zap, Palette, BookOpen, Star, Moon, Sun } from "lucide-react"

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
    let totalTime = 0
    const stepTimers: NodeJS.Timeout[] = []

    processingSteps.forEach((step, index) => {
      totalTime += step.duration
      const timer = setTimeout(() => {
        setCurrentStep(index + 1)
        setProgress(((index + 1) / processingSteps.length) * 100)
      }, totalTime)
      stepTimers.push(timer)
    })

    const finalTimer = setTimeout(() => {
      router.push("/results")
    }, totalTime + 1000)

    const factTimer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length)
    }, 3000)

    return () => {
      stepTimers.forEach(clearTimeout)
      clearTimeout(finalTimer)
      clearInterval(factTimer)
    }
  }, [router])

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
