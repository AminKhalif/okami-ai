/**
 * @fileoverview Server actions for LinkedIn profile scraping operations
 */

'use server';

import { scrapeLinkedInProfile, getMockLinkedInProfile } from './service';
import type { LinkedInProfile } from './types';

/**
 * Server action to scrape LinkedIn profile data using the live API.
 * @param linkedinUrl - LinkedIn profile URL to scrape
 * @returns Promise resolving to LinkedIn profile data or error
 */
async function scrapeLinkedInProfileAction(linkedinUrl: string): Promise<{
  success: boolean;
  data?: LinkedInProfile;
  error?: string;
}> {
  try {
    const profileData = await scrapeLinkedInProfile(linkedinUrl);
    
    return {
      success: true,
      data: profileData
    };
  } catch (error) {
    console.error('LinkedIn scraping action error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Server action to get mock LinkedIn profile data for development.
 * @returns Promise resolving to mock LinkedIn profile data or error
 */
async function getMockLinkedInProfileAction(): Promise<{
  success: boolean;
  data?: LinkedInProfile;
  error?: string;
}> {
  try {
    const profileData = await getMockLinkedInProfile();
    
    return {
      success: true,
      data: profileData
    };
  } catch (error) {
    console.error('Mock LinkedIn action error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export { scrapeLinkedInProfileAction, getMockLinkedInProfileAction };