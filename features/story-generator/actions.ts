/**
 * @fileoverview Server actions for AI-powered story generation.
 */

'use server';

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';
import type { LinkedInProfile } from '../linkedin/types';
import { fetchImageAsBase64 } from '../../lib/image-utils';

// Define the schema for the story outline to ensure type-safe, structured output.
const storyOutlineSchema = z.object({
  outline: z.array(z.object({
    stage: z.string().describe('The stage of the Hero\'s Journey.'),
    plotPoint: z.string().describe('The corresponding key moment from the user\'s career.'),
  })).describe('An array representing the stages of the story outline.')
});

const panelScriptSchema = z.object({
  panels: z.array(z.object({
    panelNumber: z.number().describe('Panel number (1-8)'),
    caption: z.string().describe('Short, punchy dialogue or title for this panel (max 6 words)'),
    storyDescription: z.string().describe('Readable story description for users (1-2 sentences)'),
    imagePrompt: z.string().describe('Technical AI image generation prompt (hidden from users)'),
  })).describe('Array of manga panel scripts with captions, story descriptions, and image prompts.')
});

/**
 * Generates a hilarious chronological story outline from LinkedIn profile data
 * @param panelCount The desired number of panels in the manga story
 * @param profileData The LinkedIn profile data (can be from API or mock)
 * @returns Promise resolving to structured story outline with comedic workplace scenarios
 */
export async function generateStoryOutlineAction({ 
  panelCount, 
  profileData 
}: { 
  panelCount: number; 
  profileData: LinkedInProfile; 
}) {
  try {
    // 1. Extract personal details from the profile for better personalization
    const fullName = profileData.name || 'The Hero';
    const currentLocation = profileData.location || 'Unknown Location';
    const aboutSection = profileData.about || 'Professional';
    const currentCompany = profileData.experience?.[0]?.company || 'Their Company';
    const currentRole = profileData.experience?.[0]?.title || 'Professional';
    const education = profileData.education?.[0]?.school || '';

    // 2. Set up the Google AI provider
    const googleAI = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // 3. Generate hilarious story outline using Vercel AI SDK
    const { object: storyOutline } = await generateObject({
      model: googleAI('gemini-2.5-flash'),
      schema: storyOutlineSchema,
      prompt: `
        Create a DRAMATIC, HILARIOUS manga story about ${fullName}'s career using the HERO'S JOURNEY with real conflict and stakes!
        
        **ANALYZE THEIR ACTUAL CAREER PATH FOR DRAMA:**
        Look at their education and job progression - what's the REAL story?
        - Did they change industries? (like film student → tech writer)
        - Big company jumps? (startup → corporate giant)
        - Role evolution? (individual contributor → manager → executive)
        - Geographic moves? (small town → big city)
        - Career pivots? (completely different field)
        
        **CREATE DRAMA FROM THEIR REAL TRANSITIONS:**
        - The fear of changing industries
        - Imposter syndrome at prestigious companies  
        - Learning curves when switching roles
        - The pressure of bigger responsibilities
        - Personal growth through career challenges
        
        **REAL CONFLICT EXAMPLES:**
        - Imposter syndrome at new company
        - Surviving toxic managers or difficult coworkers  
        - Late nights fixing critical bugs
        - Fear of public speaking at conferences
        - Getting passed over for promotions
        - Burnout and questioning career choices
        
        **${fullName}'S FULL CAREER ARC:**
        Education: ${profileData.education?.map(e => `${e.school} (${e.degree})`).join(', ') || 'College'}
        Career Journey: ${profileData.experience?.slice(0,5).map(e => `${e.company} (${e.title})`).join(' → ')}
        Current Role: ${currentRole} at ${profileData.experience?.[0]?.company}
        Location: ${currentLocation}
        Background: ${aboutSection}
        
        **STORY REQUIREMENTS:**
        - Use their FULL career progression as the story arc
        - Each major job change should be a plot point (${profileData.education?.[0]?.school} → ${profileData.experience?.slice(-3).reverse().map(e => e.company).join(' → ')})
        - Show the TRANSFORMATION from student to industry expert
        - Include career pivots and growth moments
        - Make it funny but with genuine emotional stakes
        
        **MANDATORY REQUIREMENTS - DO NOT IGNORE:**
        - MUST reference their education background: ${profileData.education?.map(e => e.school).join(', ')}
        - MUST show career progression through multiple companies: ${profileData.experience?.map(e => e.company).join(' → ')}
        - MUST reference their location: ${currentLocation}
        - MUST use their about section: ${aboutSection}
        - MUST show industry changes/pivots in their career
        - MAKE IT FUNNY with workplace humor
        
        Turn ${fullName}'s COMPLETE life story into an epic quest - not just their current job!
        
        Full Profile Data: ${JSON.stringify(profileData, null, 2)}
      `,
    });

    return { success: true, data: storyOutline };
  } catch (error) {
    console.error('Error generating story outline:', error);
    return { success: false, error: 'Failed to generate story outline.' };
  }
}

/**
 * Generates manga panel scripts from story outline with captions and image prompts
 * @param storyOutline The story outline from Phase 1
 * @param profileData LinkedIn profile data for personalization
 * @returns Promise resolving to panel scripts with captions and image prompts
 */
export async function generatePanelScriptsAction({
  storyOutline,
  profileData
}: {
  storyOutline: any;
  profileData: LinkedInProfile;
}) {
  try {
    const fullName = profileData.name || 'The Hero';
    const currentLocation = profileData.location || 'Unknown Location';
    const aboutSection = profileData.about || 'Professional';
    const currentRole = profileData.experience?.[0]?.title || 'Professional';

    const googleAI = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { object: panelScripts } = await generateObject({
      model: googleAI('gemini-2.5-flash'),
      schema: panelScriptSchema,
      prompt: `
        Create a CHRONOLOGICAL MANGA STORY about ${fullName}'s career journey with anime-style humor and drama!

        ${fullName}'s CAREER DATA:
        ${JSON.stringify(profileData, null, 2)}

        **STORY REQUIREMENTS:**
        - Follow their career timeline chronologically 
        - Each panel shows a key moment in their career progression
        - Use manga/anime style: dramatic reactions, internal thoughts, character growth
        - Make it funny with workplace humor everyone can relate to
        - Show their personality and growth through each career phase

        **MANGA STYLE ELEMENTS:**
        - Dramatic internal monologues ("This is my moment!")  
        - Over-the-top reactions to normal work situations
        - Character transformation arcs through career changes
        - Funny workplace scenarios with emotional stakes
        - Victory moments and learning experiences

        **FOR EACH PANEL:**

        **CAPTION:** Dramatic/funny internal thought (4-8 words)
        - What ${fullName} is REALLY thinking in this moment
        - Examples: "Why did I say yes to this?", "I have no idea what I'm doing", "Finally! It works!"

        **STORY_DESCRIPTION:** ONE short sentence (max 12 words)
        - Focus on the EMOTION, not job duties
        - Make it relatable to anyone who's worked
        - Connect to their specific career moment

        **IMAGE_PROMPT:** Manga scene with emotion
        - "Manga style. ${fullName} [emotional reaction in their work context]"
        - Show facial expressions, body language, setting
        - Include their actual workplace/company context

        **HERO'S JOURNEY WITH THEIR REAL CAREER:**
        
        Use their actual career data but structure it like Hero's Journey with CONFLICT and STAKES:
        
        1. **Ordinary World**: Their education/early situation (${profileData.education?.[0]?.school})
        2. **Call to Adventure**: First major career opportunity  
        3. **Refusal/Fear**: "Am I good enough for this?" moment
        4. **Mentor/Learning**: Someone or something that helped them grow
        5. **Tests & Trials**: Career challenges, failed projects, difficult bosses
        6. **Ordeal**: Major crisis - layoffs, career pivot, big failure
        7. **Reward/Growth**: Breakthrough moment, new skills gained
        8. **Return**: Current success at ${profileData.experience?.[0]?.company}
        
        Create REAL CONFLICT and STAKES using their actual companies and career transitions!
        Show struggle, growth, and triumph - not just job descriptions!
      `,
    });

    return { success: true, data: panelScripts };
  } catch (error) {
    console.error('Error generating panel scripts:', error);
    return { success: false, error: 'Failed to generate panel scripts.' };
  }
}

/**
 * Generates actual manga panel images from panel scripts using reference photo
 * @param panelScripts The panel scripts from Phase 2
 * @param profileData LinkedIn profile data containing profile photo URL
 * @returns Promise resolving to generated image file paths
 */
export async function generateMangaPanelImagesAction({
  panelScripts,
  profileData
}: {
  panelScripts: any;
  profileData: LinkedInProfile;
}) {
  try {
    if (!profileData.profilePhoto) {
      throw new Error('No profile photo found in LinkedIn data');
    }

    // 1. Get reference photo as base64
    const base64Image = await fetchImageAsBase64(profileData.profilePhoto);
    
    // 2. Set up native Google AI client for image generation
    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY!);
    
    // 3. Base manga style prompt with text integration
    const mangaStyleBase = `Transform the person in the reference image into a black and white manga comic panel. Retain their exact face, hairstyle, and unique features so they remain instantly recognizable, but render them in authentic manga style line art. Use bold ink outlines, screentone shading, and high-contrast black/white textures. Style should feel like seinen manga — detailed, expressive, and realistic, not cartoonish. Include proper manga text formatting: speech bubbles for dialogue, thought bubbles for internal thoughts, action sound effects for dynamic scenes, and overlay text for narration.`;

    const generatedImages: string[] = [];

    // 4. Generate each panel
    for (const panel of panelScripts.panels) {
      const fullPrompt = [
        { 
          text: `${mangaStyleBase}

SCENE: ${panel.imagePrompt}

IMPORTANT: Include this EXACT text in clear, readable English: "${panel.caption}"

TEXT BUBBLE REQUIREMENTS:
- Use ONE clean speech bubble only (not multiple overlapping bubbles)
- Place bubble in empty space (top corner or side) away from character's face
- Large, clear font that's easy to read
- Proper spelling with no typos
- White background with black text for maximum contrast
- DO NOT overlap bubble with character or important scene elements`
        },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image-preview",
        contents: fullPrompt,
      });

      // 5. Save generated image
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
          const filename = `manga-panel-${panel.panelNumber}.png`;
          const filepath = path.join(process.cwd(), 'public', 'generated', filename);
          
          // Create generated directory in public if it doesn't exist
          const outputDir = path.dirname(filepath);
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          fs.writeFileSync(filepath, buffer);
          generatedImages.push(filepath);
          console.log(`Generated panel ${panel.panelNumber}: ${filename}`);
        }
      }
    }

    return { success: true, data: { imagePaths: generatedImages, panelScripts } };
  } catch (error) {
    console.error('Error generating manga panel images:', error);
    return { success: false, error: 'Failed to generate manga panel images.' };
  }
}
