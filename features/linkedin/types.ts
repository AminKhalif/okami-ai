/**
 * @fileoverview Type definitions for LinkedIn profile data and API responses
 */

/**
 * Work experience entry from a LinkedIn profile
 */
interface LinkedInExperience {
  title: string;
  company: string;
  duration: string;
  description?: string;
  location?: string;
  companyUrl?: string;
}

/**
 * Education entry from a LinkedIn profile
 */
interface LinkedInEducation {
  school: string;
  degree: string;
  fieldOfStudy?: string;
  duration: string;
}

/**
 * Standardized LinkedIn profile data structure
 */
interface LinkedInProfile {
  name: string;
  headline: string;
  location: string;
  about: string;
  experience: LinkedInExperience[];
  education: LinkedInEducation[];
  skills: string[];
  connections?: string;
  followers?: string;
  profileUrl: string;
  profilePhoto?: string;
}

/**
 * Work experience entry from ScrapingDog API response
 */
interface ScrapingDogExperience {
  position: string;
  company_name: string;
  company_url?: string;
  location?: string;
  summary?: string;
  starts_at: string;
  ends_at: string;
  duration: string;
}

/**
 * Education entry from ScrapingDog API response
 */
interface ScrapingDogEducation {
  school?: string;
  degree?: string;
  field_of_study?: string;
  starts_at?: string;
  ends_at?: string;
}

/**
 * Raw response structure from ScrapingDog LinkedIn API
 */
interface ScrapingDogLinkedInResponse {
  fullName: string;
  first_name: string;
  last_name: string;
  public_identifier: string;
  background_cover_image_url: string;
  profile_photo: string;
  headline: string;
  location: string;
  followers: string;
  connections: string;
  about: string;
  experience: ScrapingDogExperience[];
  education: ScrapingDogEducation[];
}

export type {
  LinkedInProfile,
  LinkedInExperience,
  LinkedInEducation,
  ScrapingDogLinkedInResponse,
  ScrapingDogExperience,
  ScrapingDogEducation
};