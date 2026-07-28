import type { Tour } from "@/types/tour";

export const thalleLaPassTrek: Tour = {
  slug: "thalle-la-pass-trek",
  title: "Thalle La Pass Trek",
  tagline: "One of the shortest and most accessible high-altitude treks in Gilgit-Baltistan",
  category: "trek",
  route: ["Islamabad", "Skardu", "Khaplu", "Shigar Valley", "Thalle Lungma Valley", "Thalle La Pass", "Shigar", "Skardu", "Taxila", "Peshawar", "Swat", "Islamabad"],
  durationDays: { min: 11, max: 11 },
  style: "High-Altitude Mountain Trek",
  difficulty: "Moderate",
  bestSeason: "Mid-June–September",
  groupSize: { min: 4, max: 8 },
  summary:
    "An accessible high-altitude trek through the Thalle Lungma Valley to Thalle La Pass at 4,572m, followed by a cultural extension through Taxila, Peshawar, and Swat — adventure without extreme difficulty.",
  heroImage: {
    src: "/images/optimized/thalle-la-hero.jpg",
    alt: "Trekking the alpine trail toward Thalle La Pass",
    width: 2400,
    height: 1350,
  },
  gallery: [],
  highlights: [
    { icon: "mountain", text: "Thalle La Pass at 4,572m" },
    { icon: "footprints", text: "Short, accessible high-altitude trek through Khaplu and Shigar Valley" },
    { icon: "landmark", text: "Cultural extension through Taxila, Peshawar, and Swat" },
  ],
  itinerary: [
    { day: 1, title: "Arrival in Islamabad", activities: ["Smooth airport transfer and hotel check-in", "Half-day tour of Pakistan's capital — friendly faces, colorful markets, and a taste of its dynamic energy"], accommodation: "Hotel" },
    { day: 2, title: "Islamabad to Skardu / Chilas", activities: ["Scenic flight to Skardu, or a road adventure along the Karakoram Highway to Chilas, 10–12 hours", "Altitude: 2,250m", "Settle into the hotel and unwind before the days ahead"], accommodation: "Hotel" },
    { day: 3, title: "Explore Skardu", activities: ["Kharpocho Fort, the serene Manthal Buddha Rock, and Sadpara Lake", "Optional visits to Upper Kachura Lake or Broq, and time for last-minute shopping", "By road: continue from Chilas to Skardu, 7–8 hours, with stunning mountain views"], accommodation: "Hotel" },
    { day: 4, title: "Drive to Khasumik", activities: ["Scenic jeep drive to Khasumik, the trailhead of the trek", "Route gradually ascends through alpine terrain and green pastures toward Thalle Camp"], accommodation: "Camping" },
    { day: 5, title: "Thalle Camp to Daserpa", activities: ["A longer, more adventurous day deeper into high-altitude terrain", "Wide alpine meadows, glacial streams, and rugged mountain landscapes, crossing Thalle La Pass at 4,572m", "Steady climbs and long descents — rewarding but demanding", "5–7 hours"], accommodation: "Camping" },
    { day: 6, title: "Daserpa to Shigar", activities: ["Scenic descent through mountain trails, valleys, and villages, mostly downhill", "Trek concludes at Shigar", "Comfortable drive to Skardu"], accommodation: "Hotel" },
    { day: 7, title: "Skardu to Islamabad", activities: ["Flight from Skardu with aerial views of the Karakoram, or a scenic drive to Chilas or Naran through lush valleys, rivers, and high mountain passes", "Settle into a comfortable hotel to rest and reflect on the trek"], accommodation: "Hotel" },
    { day: 8, title: "Islamabad to Taxila and Peshawar", activities: ["Ancient ruins of Taxila, a UNESCO World Heritage site and cradle of Gandhara civilization", "Taxila Museum — priceless artifacts of Greco-Buddhist art", "Julian Monastery & Stupa — a peaceful hilltop sanctuary once inhabited by Buddhist monks"], accommodation: "Hotel" },
    { day: 9, title: "Discover the Historic Heart of Peshawar", activities: ["Peshawar Museum — Gandharan sculptures and Buddhist relics", "Mahabat Khan Mosque — 17th-century Mughal architecture", "Qissa Khawani Bazaar, the fabled 'Bazaar of Storytellers'", "Sethi House — a heritage mansion blending Mughal and Central Asian artistry", "Bala Hissar Fort, exterior view"], accommodation: "Hotel" },
    { day: 10, title: "Explore the Treasures of Swat — Return to Islamabad", activities: ["Swat Museum — Gandhara sculptures and ancient relics", "Butkara Stupa, a sacred Buddhist site dating to the 2nd century BCE", "Barikot Site, a fortified settlement with layers of Indo-Greek history", "Shingardar, Amluk Dara, and Najigram Stupas nestled in the hills"], accommodation: "Hotel" },
    { day: 11, title: "Farewell Pakistan", activities: ["Transfer to Islamabad International Airport for the departure flight"] },
  ],
  experiencesIncluded: ["Thalle La high pass trek", "Skardu heritage sites", "Gandhara civilization: Taxila, Peshawar, Swat"],
  inclusions: ["Airport transfers", "Domestic flights / road transport", "Licensed trekking guide", "Camping equipment", "Meals during trek"],
  exclusions: ["International flights", "Personal trekking gear", "Travel insurance", "Tips for staff"],
  idealFor: ["Trekkers seeking a short, scenic, and less-crowded adventure"],
  pricing: [{ label: "Standard (Group of 4–8)", pricePerPerson: 1550, currency: "USD", groupSizeRange: { min: 4, max: 8 } }],
  relatedTourSlugs: ["baldiyat-meadow-and-patundas-trek", "nomads-of-nagmah-valley-trek"],
  seo: {
    title: "Thalle La Pass Trek — 11-Day Trek & Gandhara Heritage",
    description:
      "A short, accessible high-altitude trek to Thalle La Pass at 4,572m through the Thalle Lungma Valley, paired with a cultural extension through Taxila, Peshawar, and Swat.",
    ogImage: "/images/optimized/thalle-la-hero.jpg",
    canonicalPath: "/treks/thalle-la-pass-trek",
  },
};
