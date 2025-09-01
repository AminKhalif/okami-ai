/**
 * @fileoverview Type definitions for LinkedIn profile data and API responses
 */

/**
 * Work experience entry from a LinkedIn profile
 */
interface LinkedInExperience {
  /** Job title or position name */
  title: string;
  /** Company or organization name */
  company: string;
  /** Duration of employment (e.g., "Jan 2020 - Present") */
  duration: string;
  /** Optional job description or summary */
  description?: string;
}

/**
 * Education entry from a LinkedIn profile
 */
interface LinkedInEducation {
  /** School or institution name */
  school: string;
  /** Degree or certification earned */
  degree: string;
  /** Field of study or major */
  fieldOfStudy?: string;
  /** Duration of education (e.g., "2018 - 2022") */
  duration: string;
}

/**
 * Standardized LinkedIn profile data structure
 */
interface LinkedInProfile {
  /** Full name of the profile owner */
  name: string;
  /** Professional headline or current position */
  headline: string;
  /** Geographic location */
  location: string;
  /** About/summary section content */
  about: string;
  /** Array of work experience entries */
  experience: LinkedInExperience[];
  /** Array of education entries */
  education: LinkedInEducation[];
  /** Array of skills (currently empty from ScrapingDog API) */
  skills: string[];
  /** Connection count string (e.g., "500+ connections") */
  connections?: string;
  /** Follower count string (e.g., "10K followers") */
  followers?: string;
  /** Original LinkedIn profile URL */
  profileUrl: string;
  /** Profile photo URL */
  profilePhoto?: string;
}

/**
 * Work experience entry from ScrapingDog API response
 */
interface ScrapingDogExperience {
  /** Job position title */
  position: string;
  /** Company name */
  company_name: string;
  /** Optional company LinkedIn URL */
  company_url?: string;
  /** Optional work location */
  location?: string;
  /** Optional job summary or description */
  summary?: string;
  /** Start date string */
  starts_at: string;
  /** End date string or "Present" */
  ends_at: string;
  /** Duration string */
  duration: string;
}

/**
 * Education entry from ScrapingDog API response
 */
interface ScrapingDogEducation {
  /** School or institution name */
  school?: string;
  /** Degree or certification */
  degree?: string;
  /** Field of study */
  field_of_study?: string;
  /** Start date */
  starts_at?: string;
  /** End date */
  ends_at?: string;
}

/**
 * Raw response structure from ScrapingDog LinkedIn API
 */
interface ScrapingDogLinkedInResponse {
  /** Full name of profile owner */
  fullName: string;
  /** First name */
  first_name: string;
  /** Last name */
  last_name: string;
  /** LinkedIn username/identifier */
  public_identifier: string;
  /** Background cover image URL */
  background_cover_image_url: string;
  /** Profile photo URL */
  profile_photo: string;
  /** Professional headline */
  headline: string;
  /** Geographic location */
  location: string;
  /** Follower count string */
  followers: string;
  /** Connection count string */
  connections: string;
  /** About section content */
  about: string;
  /** Array of work experience */
  experience: ScrapingDogExperience[];
  /** Array of education */
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