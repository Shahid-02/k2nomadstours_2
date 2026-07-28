import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images", "placeholders");
mkdirSync(outDir, { recursive: true });

/**
 * scene: "mountain" | "desert" | "heritage" | "coastal" | "river" | "city"
 */
function svg({ width, height, from, to, accent, label, scene, id }) {
  const gradId = `g-${id}`;
  const accentId = `a-${id}`;

  let motif = "";
  if (scene === "mountain") {
    motif = `
      <path d="M0 ${height * 0.72} L${width * 0.16} ${height * 0.42} L${width * 0.28} ${height * 0.6} L${width * 0.42} ${height * 0.28} L${width * 0.58} ${height * 0.62} L${width * 0.7} ${height * 0.46} L${width * 0.86} ${height * 0.68} L${width} ${height * 0.58} L${width} ${height} L0 ${height} Z" fill="url(#${accentId})" opacity="0.55"/>
      <circle cx="${width * 0.82}" cy="${height * 0.22}" r="${height * 0.09}" fill="white" opacity="0.18"/>
    `;
  } else if (scene === "desert") {
    motif = `
      <path d="M0 ${height * 0.68} Q ${width * 0.2} ${height * 0.52} ${width * 0.4} ${height * 0.66} T ${width * 0.8} ${height * 0.6} T ${width} ${height * 0.7} L${width} ${height} L0 ${height} Z" fill="url(#${accentId})" opacity="0.5"/>
      <circle cx="${width * 0.5}" cy="${height * 0.28}" r="${height * 0.12}" fill="white" opacity="0.2"/>
    `;
  } else if (scene === "heritage") {
    motif = `
      <g opacity="0.5" fill="url(#${accentId})">
        <rect x="${width * 0.12}" y="${height * 0.45}" width="${width * 0.05}" height="${height * 0.35}"/>
        <rect x="${width * 0.22}" y="${height * 0.35}" width="${width * 0.05}" height="${height * 0.45}"/>
        <path d="M${width * 0.22} ${height * 0.35} a ${width * 0.025} ${width * 0.025} 0 0 1 ${width * 0.05} 0 Z"/>
        <rect x="${width * 0.7}" y="${height * 0.4}" width="${width * 0.16}" height="${height * 0.4}"/>
        <path d="M${width * 0.7} ${height * 0.4} q ${width * 0.08} ${-height * 0.12} ${width * 0.16} 0 Z"/>
      </g>
    `;
  } else if (scene === "coastal") {
    motif = `
      <path d="M0 ${height * 0.75} Q ${width * 0.25} ${height * 0.65} ${width * 0.5} ${height * 0.75} T ${width} ${height * 0.75} L${width} ${height} L0 ${height} Z" fill="url(#${accentId})" opacity="0.55"/>
      <path d="M0 ${height * 0.62} Q ${width * 0.25} ${height * 0.52} ${width * 0.5} ${height * 0.62} T ${width} ${height * 0.62} L${width} ${height * 0.75} L0 ${height * 0.75} Z" fill="url(#${accentId})" opacity="0.3"/>
    `;
  } else if (scene === "river") {
    motif = `
      <path d="M0 ${height * 0.6} C ${width * 0.3} ${height * 0.45}, ${width * 0.4} ${height * 0.7}, ${width * 0.65} ${height * 0.58} S ${width} ${height * 0.5}, ${width} ${height * 0.5} L${width} ${height} L0 ${height} Z" fill="url(#${accentId})" opacity="0.5"/>
    `;
  } else {
    motif = `
      <g opacity="0.45" fill="url(#${accentId})">
        <rect x="${width * 0.1}" y="${height * 0.5}" width="${width * 0.08}" height="${height * 0.3}"/>
        <rect x="${width * 0.2}" y="${height * 0.4}" width="${width * 0.08}" height="${height * 0.4}"/>
        <rect x="${width * 0.3}" y="${height * 0.55}" width="${width * 0.08}" height="${height * 0.25}"/>
        <rect x="${width * 0.75}" y="${height * 0.42}" width="${width * 0.08}" height="${height * 0.38}"/>
        <rect x="${width * 0.85}" y="${height * 0.5}" width="${width * 0.08}" height="${height * 0.3}"/>
      </g>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <linearGradient id="${accentId}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.6"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${gradId})"/>
  ${motif}
  <rect width="${width}" height="${height}" fill="black" opacity="0.08"/>
  ${
    label
      ? `<text x="${width * 0.05}" y="${height * 0.9}" font-family="Georgia, serif" font-size="${Math.round(height * 0.055)}" fill="white" opacity="0.85">${escapeXml(label)}</text>`
      : ""
  }
</svg>`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const palettes = {
  terracotta: { from: "#7a4a2b", to: "#c97a44", accent: "#e8b26a" },
  dusk: { from: "#1f2447", to: "#4a4f8c", accent: "#8f95d6" },
  sand: { from: "#c9a06a", to: "#e8cf9f", accent: "#f4e6c8" },
  slate: { from: "#3a3f4b", to: "#6c7486", accent: "#a9b2c3" },
  teal: { from: "#12363a", to: "#2f6d6f", accent: "#7fbdb8" },
  rose: { from: "#5c2a3a", to: "#a3546a", accent: "#e2a3b4" },
};

const images = [
  { id: "hero-nomadic", w: 1920, h: 1080, palette: "terracotta", scene: "desert", label: null },
  { id: "day-islamabad", w: 1200, h: 800, palette: "slate", scene: "city", label: "Islamabad" },
  { id: "day-taxila", w: 1200, h: 800, palette: "teal", scene: "heritage", label: "Taxila — Gandhara Civilization" },
  { id: "day-lahore-fort", w: 1200, h: 800, palette: "rose", scene: "heritage", label: "Lahore Fort" },
  { id: "day-harappa", w: 1200, h: 800, palette: "sand", scene: "heritage", label: "Harappa" },
  { id: "day-multan", w: 1200, h: 800, palette: "dusk", scene: "city", label: "Multan — City of Saints" },
  { id: "day-cholistan", w: 1200, h: 800, palette: "terracotta", scene: "desert", label: "Cholistan Desert" },
  { id: "day-bahawalpur", w: 1200, h: 800, palette: "sand", scene: "heritage", label: "Bahawalpur" },
  { id: "day-uch-sharif", w: 1200, h: 800, palette: "dusk", scene: "heritage", label: "Uch Sharif" },
  { id: "day-sukkur", w: 1200, h: 800, palette: "teal", scene: "river", label: "Sukkur" },
  { id: "day-mohenjodaro", w: 1200, h: 800, palette: "sand", scene: "heritage", label: "Mohenjo-Daro" },
  { id: "day-sehwan", w: 1200, h: 800, palette: "dusk", scene: "city", label: "Sehwan Sharif" },
  { id: "day-ranikot", w: 1200, h: 800, palette: "slate", scene: "heritage", label: "Ranikot Fort" },
  { id: "day-thatta", w: 1200, h: 800, palette: "teal", scene: "heritage", label: "Thatta — Makli Necropolis" },
  { id: "day-karachi", w: 1200, h: 800, palette: "rose", scene: "coastal", label: "Karachi" },
  { id: "tour-hunza", w: 1200, h: 900, palette: "teal", scene: "mountain", label: "Discover Hunza Valley" },
  { id: "tour-k2-base-camp", w: 1200, h: 900, palette: "slate", scene: "mountain", label: "K2 Base Camp Trek" },
  { id: "tour-rakaposhi", w: 1200, h: 900, palette: "dusk", scene: "mountain", label: "Rakaposhi Base Camp & Rush Lake" },
  { id: "tour-nomadic-card", w: 1200, h: 900, palette: "terracotta", scene: "desert", label: "Nomadic Experience of Pakistan" },
  { id: "tour-polo-festival", w: 1200, h: 900, palette: "rose", scene: "mountain", label: "Shandur Polo Festival" },
  { id: "tour-cycling-hunza", w: 1200, h: 900, palette: "teal", scene: "mountain", label: "Cycling the Karakoram Highway" },
  { id: "homepage-hero", w: 1920, h: 1080, palette: "slate", scene: "mountain", label: null },

  // Trek heroes
  { id: "hero-k2-base-camp-trek", w: 1920, h: 1080, palette: "slate", scene: "mountain", label: "K2 Base Camp Trek" },
  { id: "hero-rakaposhi-base-camp-and-rush-lake-trek", w: 1920, h: 1080, palette: "dusk", scene: "mountain", label: "Rakaposhi Base Camp & Rush Lake Trek" },
  { id: "hero-baldiyat-meadow-and-patundas-trek", w: 1920, h: 1080, palette: "teal", scene: "mountain", label: "Baldiyat Meadow and Patundas Trek" },
  { id: "hero-around-nanga-parbat-nomadic-trek", w: 1920, h: 1080, palette: "slate", scene: "mountain", label: "Around Nanga Parbat Nomadic Trek" },
  { id: "hero-snow-lake-trek", w: 1920, h: 1080, palette: "slate", scene: "mountain", label: "Snow Lake Trek" },
  { id: "hero-gondogoro-la-trek", w: 1920, h: 1080, palette: "dusk", scene: "mountain", label: "Gondogoro La Trek" },
  { id: "hero-fairy-meadows-and-k2-base-camp-trek", w: 1920, h: 1080, palette: "teal", scene: "mountain", label: "Fairy Meadows and K2 Base Camp Trek" },
  { id: "hero-shimshal-nomadic-passage", w: 1920, h: 1080, palette: "slate", scene: "mountain", label: "Shimshal Nomadic Passage" },
  { id: "hero-thalle-la-pass-trek", w: 1920, h: 1080, palette: "teal", scene: "mountain", label: "Thalle La Pass Trek" },
  { id: "hero-nomads-of-nagmah-valley-trek", w: 1920, h: 1080, palette: "rose", scene: "mountain", label: "Nomads of Nagmah Valley Trek" },
  { id: "hero-nomads-of-the-karakoram-trek", w: 1920, h: 1080, palette: "dusk", scene: "mountain", label: "Nomads of the Karakoram Trek" },
  { id: "hero-nomad-bike-and-trek", w: 1920, h: 1080, palette: "terracotta", scene: "mountain", label: "Nomad Bike and Trek" },

  // Tour heroes
  { id: "hero-himalaya-kingdom-nomadic-tour", w: 1920, h: 1080, palette: "rose", scene: "heritage", label: "Himalaya Kingdom – Nomadic Tour" },
  { id: "hero-kalash-nomadic-passage", w: 1920, h: 1080, palette: "teal", scene: "heritage", label: "Kalash Nomadic Passage" },
  { id: "hero-nomads-wild-frontier-overland", w: 1920, h: 1080, palette: "terracotta", scene: "desert", label: "Nomads Wild Frontier Overland" },
  { id: "hero-nomads-of-the-karakoram-spring", w: 1920, h: 1080, palette: "rose", scene: "mountain", label: "Nomads of the Karakoram Spring" },

  // Cycling heroes
  { id: "hero-nomads-cycling-expedition", w: 1920, h: 1080, palette: "teal", scene: "mountain", label: "Nomads Cycling Expedition" },
];

for (const img of images) {
  const p = palettes[img.palette];
  const content = svg({
    width: img.w,
    height: img.h,
    from: p.from,
    to: p.to,
    accent: p.accent,
    label: img.label,
    scene: img.scene,
    id: img.id,
  });
  writeFileSync(join(outDir, `${img.id}.svg`), content, "utf8");
}

console.log(`Generated ${images.length} placeholder images in ${outDir}`);
