/**
 * @fileoverview Test script for generating a manga panel from a LinkedIn profile.
 */

import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as dotenv from "dotenv";
import { getMockLinkedInProfileAction } from "../features/linkedin/actions";
import { fetchImageAsBase64 } from "../lib/image-utils";

dotenv.config({ path: ".env.local" });

async function main() {
  // 1. Get LinkedIn profile data using the server action.
  // This will use the mock data in development mode.
  const profileResponse = await getMockLinkedInProfileAction();

  if (!profileResponse.success || !profileResponse.data) {
    console.error("Error getting LinkedIn profile data:", profileResponse.error);
    return;
  }

  const profileData = profileResponse.data;

  if (!profileData.profilePhoto) {
    console.error("No profile photo found in the LinkedIn data.");
    return;
  }

  // 2. Fetch the profile photo and convert it to base64.
  const base64Image = await fetchImageAsBase64(profileData.profilePhoto);

  // 3. Set up the Gemini API call.
  if (!process.env.GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is not defined in .env.local");
    process.exit(1);
  }
  const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

  // 4. Define the prompt for the image generation.
  const textPrompt = "Transform the person in the reference image into a black and white manga comic panel. Retain their exact face, hairstyle, and unique features so they remain instantly recognizable, but render them in authentic manga style line art. Use bold ink outlines, screentone shading, and high-contrast black/white textures. Place them sitting at a computer typing, inside a manga panel composition. The background should include the desk and glowing computer screen, drawn in manga panel style. Style should feel like seinen manga — detailed, expressive, and realistic, not cartoonish.";

  const prompt = [
    { text: textPrompt },
    {
      inlineData: {
        mimeType: "image/jpeg", // Assuming the downloaded image is a jpeg
        data: base64Image,
      },
    },
  ];

  // 5. Call the Gemini API and save the result.
  try {
    console.log("Generating manga panel...");
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image-preview",
        contents: prompt,
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          console.log(part.text);
        } else if (part.inlineData) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
          fs.writeFileSync("manga-panel.png", buffer);
          console.log("Image saved as manga-panel.png");
        }
    }
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

main();
