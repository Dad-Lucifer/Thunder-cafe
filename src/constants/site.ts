/**
 * @fileoverview Central configuration for the Thunder Gaming Café website.
 * This file exports a single `config` object containing all site settings,
 * including metadata, navigation, contact info, and more.
 */

// --- Helper Functions ---

/**
 * Safely retrieves and validates the site URL from environment variables.
 * - In development, it falls back to localhost and warns the user.
 * - In production, it throws an error if the URL is not set or invalid,
 *   preventing runtime crashes.
 */
function getSiteUrl(): string {
  const url = import.meta.env.VITE_SITE_URL;

  if (!url) {
    if (import.meta.env.DEV) {
      console.warn(
        '⚠️ VITE_SITE_URL is not set in .env. Falling back to http://localhost:3000.'
      );
      return 'http://localhost:3000';
    }

    // In production, use window.location.origin as fallback
    if (typeof window !== 'undefined') {
      console.warn(
        '⚠️ VITE_SITE_URL not set. Using current domain as fallback.'
      );
      return window.location.origin;
    }

    // Last resort fallback
    return 'https://thunder-cafe.vercel.app';
  }

  try {
    // Validate that the URL is properly formatted
    new URL(url);
    return url;
  } catch {
    // If invalid, fallback to window.location.origin in browser
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return 'https://thunder-cafe.vercel.app';
  }
}

// --- Main Configuration Object ---

/**
 * The main configuration object for the entire application.
 * All site-related constants are organized here for easy access and management.
 */
const config = {
  // Core Site Information
  site: {
    name: 'Thunder Gaming Café',
    tagline: 'Unleash the Heist Within — Play. Connect. Win.',
    description: 'Experience premium gaming at Thunder Gaming Café. PC Gaming, PS5 Arena, Xbox Lounge, and more. Play. Connect. Win.',
    url: getSiteUrl(),
    ogImage: '/og-image.jpg', // IMPORTANT: Ensure this image exists in your /public folder
  },

  // Navigation Menu Structure
  nav: {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Games', href: '/games' },
      { name: 'About', href: '/about' },
      { name: 'Booking', href: '/booking' },
      
    ],
  },

  // Contact & Location Details
  contact: {
    address: '123 Gaming Street, Tech Hub, Bangalore, Karnataka 560001',
    phone: '+91 98765 43210',
    email: 'info@thundergamingcafe.com',
    locationHint: 'Near Metro Station',
  },

  // Operating Hours
  hours: {
    weekdays: { label: 'Monday - Thursday', hours: '12:00 PM - 12:00 AM' },
    weekend: { label: 'Friday - Saturday', hours: '12:00 PM - 2:00 AM' },
    sunday: { label: 'Sunday', hours: '12:00 PM - 10:00 PM' },
  },

  // Social Media Profiles
  // TODO: Replace '#' with your actual social media URLs
  social: {
    twitter: { name: 'Twitter', href: '#', icon: 'twitter' },
    instagram: { name: 'Instagram', href: '#', icon: 'instagram' },
    discord: { name: 'Discord', href: '#', icon: 'discord' },
  },

  // SEO & Metadata Configuration
  // This object dynamically uses values from the `site` config to ensure consistency.
  seo: {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: 'Thunder Gaming Café',
      template: `%s | Thunder Gaming Café`,
    },
    description: 'Experience premium gaming at Thunder Gaming Café. PC Gaming, PS5 Arena, Xbox Lounge, and more. Play. Connect. Win.',
    keywords: ['gaming', 'esports', 'PC gaming', 'PS5', 'Xbox', 'gaming café', 'Bangalore', 'Thunder Gaming Café'],
    authors: [{ name: 'Thunder Gaming Café' }],
    creator: 'Thunder Gaming Café',
    publisher: 'Thunder Gaming Café',
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'Thunder Gaming Café',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Thunder Gaming Café - Unleash the Heist Within',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@thundergamingcafe', // Optional: Add your Twitter handle
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  },
} as const;

// --- Exports ---

// Export the entire config object as the default export
export default config;

// For convenience, you can also export specific parts if you prefer named imports
export const { site, nav, contact, hours, social, seo } = config;