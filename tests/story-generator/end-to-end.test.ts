/**
 * @fileoverview End-to-end test for complete manga story generation pipeline
 */

import * as dotenv from 'dotenv';
import { generateStoryOutlineAction, generatePanelScriptsAction, generateMangaPanelImagesAction } from '../../features/story-generator/actions';
import { getMockLinkedInProfile } from '../../features/linkedin/service';

dotenv.config({ path: '.env.local' });

async function main() {
  console.log('🚀 Starting end-to-end manga story generation test...\n');

  try {
    // Phase 1: Get LinkedIn profile and generate story outline
    console.log('📋 Phase 1: Loading LinkedIn profile and generating story outline...');
    const profileData = await getMockLinkedInProfile();
    console.log(`Profile loaded for: ${profileData.name}`);

    const storyResult = await generateStoryOutlineAction({ 
      panelCount: 8, 
      profileData 
    });

    if (!storyResult.success) {
      throw new Error(`Phase 1 failed: ${storyResult.error}`);
    }

    console.log(`✅ Generated ${storyResult.data.outline.length} story panels\n`);

    // Phase 2: Generate panel scripts
    console.log('📝 Phase 2: Generating panel scripts with captions and image prompts...');
    const scriptsResult = await generatePanelScriptsAction({
      storyOutline: storyResult.data,
      profileData
    });

    if (!scriptsResult.success) {
      throw new Error(`Phase 2 failed: ${scriptsResult.error}`);
    }

    console.log(`✅ Generated ${scriptsResult.data.panels.length} panel scripts\n`);

    // Phase 3: Generate actual manga panel images
    console.log('🎨 Phase 3: Generating manga panel images with reference photo...');
    const imagesResult = await generateMangaPanelImagesAction({
      panelScripts: scriptsResult.data,
      profileData
    });

    if (!imagesResult.success) {
      throw new Error(`Phase 3 failed: ${imagesResult.error}`);
    }

    console.log(`✅ Generated ${imagesResult.data.imagePaths.length} manga panel images\n`);

    // Final result
    console.log('🎉 END-TO-END TEST COMPLETE! 🎉');
    console.log('\n--- Generated Story ---');
    storyResult.data.outline.forEach((panel: any, index: number) => {
      console.log(`Panel ${index + 1}: ${panel.stage}`);
      console.log(`Plot: ${panel.plotPoint}\n`);
    });

    console.log('--- Panel Scripts ---');
    scriptsResult.data.panels.forEach((panel: any) => {
      console.log(`Panel ${panel.panelNumber}:`);
      console.log(`Caption: "${panel.caption}"`);
      console.log(`Image: ${panel.imagePrompt}\n`);
    });

    console.log('--- Generated Images ---');
    imagesResult.data.imagePaths.forEach((path: string) => {
      console.log(`📸 ${path}`);
    });

    console.log(`\n✨ Complete manga story generated for ${profileData.name}!`);

  } catch (error) {
    console.error('❌ End-to-end test failed:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});