/**
 * Serializable nav shapes.
 *
 * The header is interactive, but the tour catalogue is large. Keeping these
 * plain lets the server component do the lookup and ship ~2kB of nav data to
 * the client instead of every itinerary in the dataset.
 */
export interface NavJourney {
  label: string;
  href: string;
  duration: string;
  farPoint: string;
  difficulty: string;
  image: string;
  imageAlt: string;
}

export interface NavGroup {
  key: string;
  label: string;
  href: string;
  blurb: string;
  items: NavJourney[];
}
