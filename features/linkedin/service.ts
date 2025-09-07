/**
 * @fileoverview LinkedIn profile scraping service using ScrapingDog API
 */

import * as fs from 'fs';
import * as path from 'path';
import { LinkedInProfile, ScrapingDogLinkedInResponse } from './types';

/**
 * Extracts LinkedIn username (linkId) from a LinkedIn profile URL
 * @param linkedinUrl - Full LinkedIn profile URL
 * @returns The LinkedIn username/ID extracted from URL
 * @throws Error if URL is invalid or linkId cannot be extracted
 */
function extractLinkId(linkedinUrl: string): string {
  if (!isValidLinkedInUrl(linkedinUrl)) {
    throw new Error('Invalid LinkedIn URL provided');
  }

  const match = linkedinUrl.match(/\/in\/([^\/\?]+)/);
  if (!match) {
    throw new Error('Could not extract LinkedIn ID from URL');
  }

  return match[1];
}

/**
 * Validates if a URL is a proper LinkedIn profile URL
 * @param url - URL to validate
 * @returns True if URL is a valid LinkedIn profile URL
 */
function isValidLinkedInUrl(url: string): boolean {
  const linkedinPattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?(\?.*)?$/;
  return linkedinPattern.test(url);
}

/**
 * Transforms ScrapingDog API response to standardized LinkedIn profile format
 * @param data - Raw response data from ScrapingDog API
 * @param originalUrl - Original LinkedIn URL for reference
 * @returns Standardized LinkedIn profile object
 */
function transformToLinkedInProfile(data: ScrapingDogLinkedInResponse, originalUrl: string): LinkedInProfile {
  return {
    name: data.fullName || '',
    headline: data.headline || '',
    location: data.location || '',
    about: data.about || '',
    experience: (data.experience || []).map(exp => ({
      title: exp.position || '',
      company: exp.company_name || '',
      duration: exp.duration || `${exp.starts_at || ''} - ${exp.ends_at || ''}`.trim(),
      description: exp.summary || undefined,
      location: exp.location || undefined,
      companyUrl: exp.company_url || undefined,
    })),
    education: (data.education || []).map(edu => ({
      school: edu.school || '',
      degree: edu.degree || '',
      fieldOfStudy: edu.field_of_study || undefined,
      duration: `${edu.starts_at || ''} - ${edu.ends_at || ''}`.trim() || '',
    })),
    skills: [],
    connections: data.connections || undefined,
    followers: data.followers || undefined,
    profileUrl: originalUrl,
    profilePhoto: data.profile_photo || undefined,
  };
}

/**
 * Scrapes LinkedIn profile data using ScrapingDog API
 * @param linkedinUrl - Full LinkedIn profile URL to scrape
 * @param apiKey - ScrapingDog API key for authentication
 * @returns Promise resolving to standardized LinkedIn profile data
 * @throws Error if API request fails or returns invalid data
 */
async function scrapeProfileWithApi(linkedinUrl: string, apiKey: string): Promise<LinkedInProfile> {
  const linkId = extractLinkId(linkedinUrl);
  const baseUrl = 'https://api.scrapingdog.com/linkedin/';
  
  const params = new URLSearchParams({
    api_key: apiKey,
    type: 'profile',
    linkId: linkId,
  });

  try {
    const response = await fetch(`${baseUrl}?${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`ScrapingDog API error: ${response.status} ${response.statusText}`);
    }

    const data: ScrapingDogLinkedInResponse[] = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error('No profile data returned from ScrapingDog API');
    }

    return transformToLinkedInProfile(data[0], linkedinUrl);
  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    throw error;
  }
}

/**
 * Main function to scrape LinkedIn profile using environment API key
 * @param url - LinkedIn profile URL to scrape
 * @returns Promise resolving to LinkedIn profile data
 * @throws Error if API key is missing or scraping fails
 */
async function scrapeLinkedInProfile(url: string): Promise<LinkedInProfile> {
  const apiKey = process.env.SCRAPINGDOG_API_KEY;
  
  if (!apiKey) {
    throw new Error('SCRAPINGDOG_API_KEY environment variable is not set');
  }

  return await scrapeProfileWithApi(url, apiKey);
}

/**
 * Development-only mock function to get LinkedIn profile data from a local JSON file.
 * This avoids using ScrapingDog API credits during development.
 * @returns Promise resolving to mock LinkedIn profile data.
 * @throws Error if the mock file cannot be read or parsed.
 */
async function getMockLinkedInProfile(): Promise<LinkedInProfile> {
  try {
    // Construct the absolute path to the mock JSON file
    const mockFilePath = path.join(process.cwd(), 'tests', 'mock-data', 'linkedin-profile.json');
    const mockFileContent = fs.readFileSync(mockFilePath, 'utf-8');

    const jsonData: ScrapingDogLinkedInResponse[] = JSON.parse(mockFileContent);

    if (!jsonData || jsonData.length === 0) {
      throw new Error('No profile data found in mock file.');
    }

    // The original URL is not available in the mock data, so we use a placeholder
    const originalUrl = 'https://www.linkedin.com/in/mock-profile/';
    return transformToLinkedInProfile(jsonData[0], originalUrl);
  } catch (error) {
    console.error('Error getting mock LinkedIn profile:', error);
    throw error;
  }
}

export { 
  scrapeLinkedInProfile,
  getMockLinkedInProfile,
  extractLinkId,
  isValidLinkedInUrl,
  transformToLinkedInProfile 
};