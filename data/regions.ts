/**
 * The three ranges the company actually operates in. Every journey in the
 * catalogue sits in one of them, and travelers who arrive knowing only "K2"
 * usually don't know that — so the site says it plainly on the home page.
 */
export interface Range {
  name: string;
  href: string;
  highPoint: { peak: string; metres: number };
  blurb: string;
  places: string[];
  image: { src: string; alt: string };
}

export const ranges: Range[] = [
  {
    name: "Karakoram",
    href: "/treks",
    highPoint: { peak: "K2", metres: 8611 },
    blurb:
      "The densest concentration of high peaks on earth. Four of the world's fourteen 8,000-metre mountains stand within sight of a single glacier junction.",
    places: ["Baltoro Glacier", "Concordia", "Snow Lake", "Hunza", "Shimshal"],
    image: {
      src: "/images/optimized/k2-base-camp-concordia.jpg",
      alt: "Trekkers on the Baltoro Glacier looking toward K2 from near Concordia",
    },
  },
  {
    name: "Himalaya",
    href: "/treks",
    highPoint: { peak: "Nanga Parbat", metres: 8126 },
    blurb:
      "The range's western anchor rises alone out of the Indus valley, its Rupal face the tallest continuous mountain wall on the planet.",
    places: ["Fairy Meadows", "Rupal Face", "Astore", "Rakhiot"],
    image: {
      src: "/images/optimized/nanga-parbat-rupal-face.jpg",
      alt: "The Rupal face of Nanga Parbat rising above green meadows",
    },
  },
  {
    name: "Hindukush",
    href: "/tours",
    highPoint: { peak: "Tirich Mir", metres: 7708 },
    blurb:
      "Chitral, the Kalash valleys and the high polo grounds at Shandur — the cultural heart of the journeys we run, and the least visited of the three.",
    places: ["Chitral", "Kalash Valleys", "Shandur Pass", "Chapursan"],
    image: {
      src: "/images/optimized/kalash-festival.jpg",
      alt: "Kalash women in traditional dress during a valley festival in Chitral",
    },
  },
];
