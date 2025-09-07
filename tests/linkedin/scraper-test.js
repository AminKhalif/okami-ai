/**
 * @fileoverview Test script for LinkedIn scraper functionality
 */

const testUrl = 'https://www.linkedin.com/in/seid-adem-682a3b17a/';

/**
 * Extracts LinkedIn username (linkId) from a LinkedIn profile URL
 * @param linkedinUrl - Full LinkedIn profile URL
 * @returns The LinkedIn username/ID extracted from URL
 */
function extractLinkId(linkedinUrl) {
  const match = linkedinUrl.match(/\/in\/([^\/\?]+)/);
  return match ? match[1] : null;
}

console.log('Testing LinkedIn URL:', testUrl);
console.log('Extracted linkId:', extractLinkId(testUrl));

/**
 * Test ScrapingDog API call with the provided LinkedIn URL
 */
async function testScrapingDog() {
  const apiKey = '';
  const linkId = extractLinkId(testUrl);
  
  const params = new URLSearchParams({
    api_key: apiKey,
    type: 'profile',
    linkId: linkId,
    premium: 'true'
  });

  try {
    const response = await fetch(`https://api.scrapingdog.com/linkedin/?${params}`);
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));
    } else {
      console.log('Error response:', await response.text());
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
}

testScrapingDog();