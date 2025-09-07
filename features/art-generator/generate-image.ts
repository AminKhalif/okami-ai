import 'dotenv/config';

/**
 * @fileoverview Generates an image using the Vercel AI SDK and Gemini.
 */

import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Main function to generate and save an image based on a text prompt.
 */
async function main() {
  console.log('Generating image for prompt: "A polar bear on a podcast"...');
  const { text, files } = await generateText({
    model: google('gemini-2.5-flash-image-preview'),
    providerOptions: {
      google: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    },
    prompt: 'A polar bear on a podcast',
  });

  console.log(`Generated text: ${text}`);

  // Filter for image files and save them
  const imageFiles = files.filter(
    (file) => file.mediaType?.startsWith('image/'),
  );

  if (imageFiles.length > 0) {
    const outputDir = 'output';
    fs.mkdirSync(outputDir, { recursive: true });

    for (const [index, file] of imageFiles.entries()) {
      const extension = file.mediaType?.split('/')[1] || 'png';
      const filename = `image-${Date.now()}-${index}.${extension}`;
      const filepath = path.join(outputDir, filename);
      await fs.promises.writeFile(filepath, file.uint8Array);
      console.log(`Saved image to ${filepath}`);
    }
  } else {
    console.log('No image was generated.');
  }
}

main().catch(console.error);