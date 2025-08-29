# Project Structure & Naming Conventions

## File Organization
\`\`\`
/app
  /page.tsx                 # Landing page
  /process/page.tsx         # Processing/loading page
  /story/[id]/page.tsx      # Results page
  /api/
    /analyze-profile/       # LinkedIn analysis endpoint
    /generate-story/        # Story generation endpoint
    /generate-images/       # Image generation endpoint
  /globals.css              # Global styles and design tokens

/components
  /ui/                      # Shadcn/ui components
  /story/                   # Story-specific components
    /manga-panel.tsx
    /story-viewer.tsx
  /forms/
    /linkedin-input.tsx
  /layout/
    /header.tsx
    /footer.tsx

/lib
  /utils.ts                 # Utility functions
  /linkedin-scraper.ts      # Profile analysis logic
  /story-generator.ts       # Hero's Journey template
  /image-generator.ts       # AI image generation

/types
  /index.ts                 # TypeScript type definitions

/_agent_docs               # Project documentation
\`\`\`

## Naming Conventions
- **Files**: kebab-case (`manga-panel.tsx`)
- **Components**: PascalCase (`MangaPanel`)
- **Functions**: camelCase (`generateStory`)
- **Constants**: UPPER_SNAKE_CASE (`HERO_JOURNEY_STEPS`)
- **Types/Interfaces**: PascalCase (`LinkedInProfile`)

## Import Organization
1. React and Next.js imports
2. Third-party libraries
3. Internal components and utilities
4. Type imports (with `type` keyword)
5. Relative imports

## Component Structure
- Keep components under 500 lines
- One component per file
- Co-locate related components in feature folders
- Use barrel exports for clean imports
