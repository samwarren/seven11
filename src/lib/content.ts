import siteData from '../../content/site.json';
import eventsData from '../../content/events.json';
import storyData from '../../content/story.json';
import partyData from '../../content/party.json';
import travelData from '../../content/travel.json';
import faqData from '../../content/faq.json';
import registryData from '../../content/registry.json';
import galleryData from '../../content/gallery.json';

// Types derived from JSON
export type SiteConfig = typeof siteData;
export type EventsConfig = typeof eventsData;
export type WeddingEvent = EventsConfig['events'][number];
export type StoryConfig = typeof storyData;
export type StoryEntry = StoryConfig['entries'][number];
export type PartyConfig = typeof partyData;
export type PartyGroup = PartyConfig['groups'][number];
export type PartyMember = PartyGroup['members'][number];
export type TravelConfig = typeof travelData;
export type Hotel = TravelConfig['hotels'][number];
export type FaqConfig = typeof faqData;
export type FaqEntry = FaqConfig['entries'][number];
export type RegistryConfig = typeof registryData;
export type GalleryConfig = typeof galleryData;
export type GalleryPhoto = GalleryConfig['photos'][number];

// Content loaders
export function getSiteConfig(): SiteConfig {
  return siteData;
}

export function getEvents(): WeddingEvent[] {
  return eventsData.events;
}

export function getStory(): StoryEntry[] {
  return storyData.entries;
}

export function getParty(): PartyGroup[] {
  return partyData.groups;
}

export function getTravel(): TravelConfig {
  return travelData;
}

export function getFaq(): FaqEntry[] {
  return faqData.entries;
}

export function getRegistry(): RegistryConfig {
  return registryData;
}

export function getGallery(): GalleryPhoto[] {
  return galleryData.photos;
}
