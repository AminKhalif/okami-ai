# Agent Coding Rules

## Core Principles
These rules ensure consistent, maintainable, and AI-friendly code across all development phases.

## Technology Stack Requirements
- **ALWAYS** use TypeScript + Next.js App Router + React + Tailwind + Shadcn + Radix UI
- **NEVER** use class components - functional components only
- **PREFER** server components over client components when possible
- **USE** semantic design tokens from globals.css

## File Standards
### File Headers
**REQUIRED**: Every file must start with @fileoverview
\`\`\`typescript
/**
 * @fileoverview Landing page component for LinkedIn anime generator
 */
\`\`\`

### Function Documentation
**REQUIRED**: All functions must have JSDoc/TSDoc comments
\`\`\`typescript
/**
 * Generates an anime story from LinkedIn profile data
 * @param profileData - Parsed LinkedIn profile information
 * @returns Promise resolving to generated story with panels
 */
async function generateAnimeStory(profileData: LinkedInProfile): Promise<AnimeStory> {
  // Implementation
}
\`\`\`

### File Size Limits
- **MAXIMUM** 500 lines per file
- **SPLIT** large files into smaller, focused modules
- **CO-LOCATE** related functionality

## Code Quality Standards
### Variable Naming
- **USE** descriptive names: `isLoading`, `hasError`, `userProfile`
- **AVOID** abbreviations: `usr`, `prof`, `gen`
- **PREFER** boolean prefixes: `is`, `has`, `should`, `can`

### Programming Paradigms
- **USE** functional programming patterns
- **AVOID** classes and object-oriented patterns
- **PREFER** pure functions with clear inputs/outputs
- **USE** immutable data patterns

### Data Structures
- **PREFER** maps over enums for better type safety
\`\`\`typescript
// Good
const STORY_PHASES = {
  ORDINARY_WORLD: 'ordinary_world',
  CALL_TO_ADVENTURE: 'call_to_adventure',
  TRIALS: 'trials',
  TRANSFORMATION: 'transformation',
  VICTORY: 'victory'
} as const;

// Avoid
enum StoryPhases {
  ORDINARY_WORLD = 'ordinary_world',
  CALL_TO_ADVENTURE = 'call_to_adventure'
}
\`\`\`

### Function Declarations
- **USE** `function` keyword for pure functions
- **USE** arrow functions for callbacks and short utilities
- **PREFER** named functions for better stack traces

### Error Handling
- **THROW** errors instead of silent failures
- **USE** specific error types and messages
- **IMPLEMENT** proper error boundaries in React
- **LOG** errors with context for debugging

### Code Organization
- **FOLLOW** DRY principle - Don't Repeat Yourself
- **EXTRACT** reusable logic into utility functions
- **MODULARIZE** code into focused, single-responsibility modules
- **USE** barrel exports for clean import paths

## React-Specific Rules
### Component Structure
\`\`\`typescript
/**
 * @fileoverview Manga panel component for displaying story segments
 */

import { type ReactNode } from 'react';

interface MangaPanelProps {
  imageUrl: string;
  caption: string;
  panelNumber: number;
}

/**
 * Displays a single manga panel with image and caption
 */
function MangaPanel({ imageUrl, caption, panelNumber }: MangaPanelProps): ReactNode {
  return (
    <div className="manga-panel">
      {/* Implementation */}
    </div>
  );
}

export { MangaPanel };
\`\`\`

### State Management
- **USE** React hooks for local state
- **PREFER** server state over client state when possible
- **IMPLEMENT** proper loading and error states
- **AVOID** prop drilling - use context when needed

## Import/Export Standards
- **USE** named exports over default exports
- **ORGANIZE** imports in logical groups
- **USE** type-only imports when appropriate
- **PREFER** absolute imports for better refactoring

## Performance Guidelines
- **IMPLEMENT** proper loading states
- **USE** React.memo for expensive components
- **OPTIMIZE** images with Next.js Image component
- **LAZY LOAD** non-critical components

## Accessibility Requirements
- **INCLUDE** proper ARIA labels
- **ENSURE** keyboard navigation works
- **MAINTAIN** color contrast ratios
- **TEST** with screen readers

## Testing Approach
- **WRITE** unit tests for utility functions
- **TEST** component rendering and interactions
- **MOCK** external API calls
- **VALIDATE** error handling paths

## Comment Guidelines
- **REQUIRED**: JSDoc block format (`/** */`) for all functions and interfaces
- **HELPFUL**: Brief comments explaining business logic or non-obvious decisions
- **AVOID**: Line-by-line commenting of obvious code
- **AVOID**: Restating what TypeScript types already make clear
- **AVOID**: Excessive property descriptions in interfaces unless unclear
- **BALANCE**: Make code understandable without comment clutter

These rules ensure that any AI agent working on this codebase will produce consistent, high-quality, maintainable code that follows modern React and TypeScript best practices.
