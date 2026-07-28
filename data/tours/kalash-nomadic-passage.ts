import type { Tour } from "@/types/tour";

export const kalashNomadicPassage: Tour = {
  slug: "kalash-nomadic-passage",
  title: "Kalash Nomadic Passage",
  tagline: "Pakistan's most culturally distinct and geographically diverse regions",
  category: "tour",
  route: ["Islamabad", "Peshawar", "Chitral", "Kalash Valley", "Swat", "Islamabad"],
  durationDays: { min: 10, max: 11 },
  style: "Cultural Immersion",
  difficulty: "Easy to Moderate",
  bestSeason: "April–October",
  groupSize: { min: 4, max: 10 },
  summary:
    "A journey into the Kalash Valley, home to Pakistan's most distinct indigenous culture, via the Gandhara heritage of Peshawar and the forested landscapes of Chitral and Swat.",
  heroImage: {
    src: "/images/optimized/kalash-festival.jpg",
    alt: "Kalash women in traditional dress dancing at a valley festival",
    width: 2400,
    height: 1606,
  },
  gallery: [],
  highlights: [
    { icon: "users", text: "Deep engagement with the indigenous Kalash culture" },
    { icon: "mountain", text: "Dramatic shifts in terrain — arid valleys, alpine forests, and river-fed settlements" },
    { icon: "music", text: "Possible festival participation: Joshi (spring), Uchal (summer), or Choimus (winter)" },
  ],
  itinerary: [
    { day: 1, title: "Islamabad → Peshawar", activities: ["2.5–3 hour travel", "Qissa Khwani Bazaar walk and Peshawar Museum (Gandhara heritage)", "Evening food crawl"], accommodation: "Guesthouse" },
    { day: 2, title: "Peshawar → Chitral", activities: ["10–12 hour journey via the Lowari Tunnel", "Dramatic mountain transition through river valleys and remote villages"], accommodation: "Guesthouse" },
    { day: 3, title: "Explore Chitral", activities: ["Chitral Fort, Shahi Mosque, riverside walks", "Local bazaar exploration"], accommodation: "Guesthouse" },
    { day: 4, title: "Chitral → Kalash Valley (Bumburet)", activities: ["2–3 hour transfer", "First interaction with Kalash culture", "Evening village walk"], accommodation: "Homestay" },
    { day: 5, title: "Kalash Valley (Culture Immersion)", activities: ["Visit Kalash homes, traditional music & dance", "Short hikes between villages, learning Kalash history & beliefs"], accommodation: "Homestay" },
    { day: 6, title: "Kalash → Chitral", activities: ["Morning farewell to the Kalash Valley", "Rest and leisure in Chitral"], accommodation: "Guesthouse" },
    { day: 7, title: "Chitral → Swat", activities: ["9–10 hour drive via Dir through forested landscapes and river valleys"], accommodation: "Guesthouse" },
    { day: 8, title: "Explore Swat Valley", activities: ["Malam Jabba chairlift views", "Optional Bahrain/Kalam visits", "Swat Museum"], accommodation: "Guesthouse" },
    { day: 9, title: "Swat → Islamabad", activities: ["6–7 hour scenic farewell drive"], accommodation: "Hotel" },
    { day: 10, title: "Islamabad (Rest & Reflection)", activities: ["Faisal Mosque, Lok Virsa Museum, and reflection time"], accommodation: "Hotel" },
    { day: 11, title: "Farewell Pakistan", activities: ["Airport transfer for departure"] },
  ],
  experiencesIncluded: ["Kalash indigenous culture", "Gandhara heritage in Peshawar", "Swat Valley scenery"],
  inclusions: ["Private car / coaster transport", "Guesthouses in cities", "Homestays in the Kalash Valley", "Local guide", "Daily breakfast"],
  exclusions: ["International flights", "Travel insurance", "Personal expenses", "Tips"],
  idealFor: ["Travelers seeking meaningful cultural experiences", "Those comfortable with flexibility for weather and road conditions"],
  pricing: [{ label: "Standard (Group of 4–10)", pricePerPerson: 980, currency: "USD", groupSizeRange: { min: 4, max: 10 } }],
  relatedTourSlugs: ["nomads-wild-frontier-overland", "nomadic-polo-experience"],
  seo: {
    title: "Kalash Nomadic Passage — 10-11 Day Cultural Journey",
    description:
      "Journey to the Kalash Valley, home to Pakistan's most distinct indigenous culture, via Peshawar's Gandhara heritage and the forests of Chitral and Swat.",
    ogImage: "/images/optimized/kalash-festival.jpg",
    canonicalPath: "/tours/kalash-nomadic-passage",
  },
};
