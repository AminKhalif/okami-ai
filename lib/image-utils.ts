/**
 * @fileoverview Image utility functions.
 */

/**
 * Fetches an image from a URL and returns it as a base64 encoded string.
 * @param imageUrl The URL of the image to fetch.
 * @returns A promise that resolves to the base64 encoded image data.
 * @throws An error if the image cannot be fetched or processed.
 */
async function fetchImageAsBase64(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer.toString('base64');
  } catch (error) {
    console.error('Error fetching image as base64:', error);
    throw new Error('Could not fetch or process the image.');
  }
}

export { fetchImageAsBase64 };
