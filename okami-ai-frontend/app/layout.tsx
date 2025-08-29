import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Bangers } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
})

export const metadata: Metadata = {
  title: "Okami AI - Turn your LinkedIn into a manga story",
  description: "Paste your profile. Get a short, funny anime-style story about your career.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${bangers.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
