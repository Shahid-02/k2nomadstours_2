import type { Tour } from "@/types/tour";

export const discoverHunzaValley: Tour = {
  slug: "discover-hunza-valley",
  title: "Discover Hunza Valley",
  tagline: "The Ultimate Karakoram Adventure",
  category: "tour",
  route: ["Islamabad", "Naran / Besham", "Fairy Meadows", "Karimabad", "Ghulkin", "Passu", "Gilgit", "Islamabad"],
  durationDays: { min: 13, max: 13 },
  style: "Scenic & Cultural Trekking",
  difficulty: "Easy to Moderate",
  bestSeason: "April–October",
  groupSize: { min: 4, max: 10 },
  summary:
    "A scenic journey along the Karakoram Highway into the Hunza Valley — Fairy Meadows, historic forts, Attabad Lake, and a two-day trek to Patundas Meadow above the Batura Glacier.",
  heroImage: {
    src: "/images/optimized/passu-cones-hero.jpg",
    alt: "Passu Cones rising above the Karakoram Highway in Hunza Valley",
    width: 2400,
    height: 1594,
  },
  gallery: [
    { src: "/video/hunza-2.mp4", alt: "Hunza Valley", width: 1200, height: 900 }
  ],
  highlights: [
    { icon: "landmark", text: "Baltit Fort, Altit Fort, and Wakhi heritage" },
    { icon: "mountain", text: "Fairy Meadows, Patundas Meadow, and Passu Cones" },
    { icon: "waves", text: "Scenic drives past Attabad Lake and the Karakoram Highway" },
  ],
  itinerary: [
    { day: 1, title: "Islamabad to Naran / Besham", activities: ["First group meeting over tea/coffee", "10–14 hour drive by minibus", "Spring tours stop in Besham due to snow"] },
    { day: 2, title: "Travel to Fairy Meadows", activities: ["Early departure to Raikot Bridge", "Transfer to 4x4 jeeps for the Fairy Meadows track", "First glimpse of Nanga Parbat, weather permitting"], accommodation: "Cabins", image: { src: "/images/photos/Fairy_Meadows,_Pakistan.jpg", alt: "Fairy Meadows with Nanga Parbat towering behind the pine forests", width: 1200, height: 800 } },
    { day: 3, title: "Optional Trek to Nanga Parbat Base Camp", activities: ["Optional hike to base camp, 6–8 hours return, or explore the surrounding woods", "Evening bonfire beneath the stars"], accommodation: "Cabins", image: { src: "/images/photos/Morning_Snowfall_and_Majestic_view_of_Nanga_Parbat_from_Fairy_Meadows_Pakistan.jpg", alt: "Morning snowfall and a majestic view of Nanga Parbat from Fairy Meadows", width: 1200, height: 800 } },
    { day: 4, title: "Fairy Meadows to Hostel Nomads Aliabad", activities: ["Hike back to the jeep track, then drive the Karakoram Highway", "21 of the world's 100 highest peaks are visible from the KKH"], accommodation: "Hostel", image: { src: "/images/photos/Fairy_Meadows_1.jpg", alt: "The lush green meadows of Fairy Meadows with towering peaks behind", width: 1200, height: 800 } },
    { day: 5, title: "Karimabad Exploration", activities: ["Visit Baltit Fort and/or Altit Fort", "Free time exploring cobblestone streets, local handicrafts and cuisine"], accommodation: "Hostel", image: { src: "/images/photos/ultar-peak.jpg", alt: "Ultar Peak towering above Karimabad in the Hunza Valley", width: 1200, height: 800 } },
    { day: 6, title: "Eagle's Nest Sunrise & Drive to Ghulkin Village Homestay", activities: ["Early morning drive to Eagle's Nest for sunrise", "Drive to Ghulkin Village via Attabad Lake"], accommodation: "Village homestay", image: { src: "/images/photos/free-photo-of-lake-among-mountains-in-pakistan.jpeg", alt: "A turquoise lake surrounded by the mountains of northern Pakistan", width: 1200, height: 800 } },
    { day: 7, title: "Bridge to Bridge Hike & Ghulkin Chill Day", activities: ["Easy/moderate hike to the Passu Suspension Bridge, 2–3 hours", "Afternoon relaxation in Ghulkin"], accommodation: "Village homestay", image: { src: "/images/photos/Passu_Cones,_Karakoram_range,_Gilgit_Baltistan,_Pakistan.jpg", alt: "Passu Cones rising above the Karakoram Highway near Ghulkin", width: 1200, height: 800 } },
    { day: 8, title: "Start of the Patundas Pass Trek", activities: ["Trek begins at Borith Lake", "2–3 hours steep hiking to cross the Passu Glacier", "Camp at 3,400m"], accommodation: "Camping", image: { src: "/images/photos/passu-cones.jpg", alt: "Passu Cones and glacial river valley seen from the Patundas trailhead", width: 1200, height: 800 } },
    { day: 9, title: "Trek to Patundas Meadow", activities: ["Steep ascent of around 900m elevation gain", "Batura Glacier viewpoint at 4,300m, one of the best views in Pakistan"], accommodation: "Camping", image: { src: "/images/photos/Patundas-Pass.jpg", alt: "The Patundas Pass trail above Borit Lake with panoramic Karakoram views", width: 1200, height: 800 } },
    { day: 10, title: "Trek Back to the Jeep Track & Passu Village", activities: ["Return trek across the Passu Glacier, roughly 3 hours downhill"], accommodation: "Hotel" },
    { day: 11, title: "Rest Day & Travel to Gilgit", activities: ["Slow start with optional swim at Borith Lake", "Afternoon drive to Gilgit"], accommodation: "Hotel" },
    { day: 12, title: "Flight to Islamabad or Arrive by Road", activities: ["Morning flight from Gilgit to Islamabad, ~1 hour 10 minutes", "Final team dinner in Islamabad"], accommodation: "Hotel" },
    { day: 13, title: "Departure Day", activities: ["Hotel checkout around noon"] },
  ],
  experiencesIncluded: ["Fairy Meadows and Nanga Parbat views", "Hunza forts and heritage", "Patundas Meadow trek above the Batura Glacier"],
  inclusions: ["All ground transport", "Cultural & trekking guide", "Entrance fees", "Selected hotels, hostels & homestays", "Daily breakfast"],
  exclusions: ["International flights", "Travel insurance", "Personal expenses", "Tips"],
  idealFor: ["Adventure travelers with moderate fitness", "Trekkers new to the Karakoram", "Photography enthusiasts"],
  pricing: [{ label: "Standard (Group of 4–10)", pricePerPerson: 890, currency: "USD", groupSizeRange: { min: 4, max: 10 } }],
  relatedTourSlugs: ["nomads-of-the-karakoram-trek", "rakaposhi-base-camp-and-rush-lake-trek"],
  seo: {
    title: "Discover Hunza Valley — 13-Day Scenic & Cultural Tour",
    description:
      "Travel the Karakoram Highway into Hunza Valley: Fairy Meadows, Baltit & Altit forts, Attabad Lake, and a two-day trek to Patundas Meadow above the Batura Glacier.",
    ogImage: "/images/optimized/passu-cones-hero.jpg",
    canonicalPath: "/tours/discover-hunza-valley",
  },
};
