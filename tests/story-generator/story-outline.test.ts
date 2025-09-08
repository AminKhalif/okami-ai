/**
 * @fileoverview Test script for the story outline generator.
 */

import * as dotenv from 'dotenv';
import { generateStoryOutlineAction } from '../../features/story-generator/actions';
import { getMockLinkedInProfile } from '../../features/linkedin/service';

dotenv.config({ path: '.env.local' });

async function main() {
  console.log('Starting story outline generation test...');

  try {
    // Get mock LinkedIn profile data
    console.log('Loading mock LinkedIn profile...');
    const profileData = await getMockLinkedInProfile();
    console.log(`Profile loaded for: ${profileData.name}`);

    const panelCount = 8; // Using 8 panels for final version
    console.log(`Requesting a story outline with ${panelCount} panels...`);

    const result = await generateStoryOutlineAction({ panelCount, profileData });

    if (result.success) {
      console.log('\n--- Story Outline Generation Successful ---');
      console.log(JSON.stringify(result.data, null, 2));
      console.log(`\nSuccessfully generated an outline with ${result.data?.outline.length} panels.`);
    } else {
      console.error('\n--- Story Outline Generation Failed ---');
      console.error(result.error);
      throw new Error(`Story generation failed: ${result.error}`);
    }
  } catch (error) {
    console.error('Test failed with error:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unhandled error in main:', error);
  process.exit(1);
});
