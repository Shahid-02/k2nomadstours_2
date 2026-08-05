import type { SocialLink } from "@/types/tour";

export const siteConfig = {
  name: "K2 Nomads Tours",
  url: "https://k2nomadstours-five.vercel.app", // ✅ New URL
  description:
    "Nomadic, cultural, and high-altitude tours across Pakistan — from ancient civilizations and Sufi shrines to the Karakoram's highest peaks.",
  email: "k2nomadstours@gmail.com",
  whatsapp: "+92-341-777-0966",
  whatsappHref: "https://wa.me/923417770966?text=Hello%20KNT",
};

export const socialLinks: SocialLink[] = [
  { platform: "instagram", url: "https://instagram.com/k2nomadstours/" },
  { platform: "facebook", url: "https://facebook.com/k2nomadstours" },
  { platform: "linkedin", url: "https://linkedin.com/company/k2-nomads-tours" },
  { platform: "tiktok", url: "https://tiktok.com/@k2nomadstours" },
  { platform: "youtube", url: "https://youtube.com/@K2nomadstours" },
  { platform: "x", url: "https://x.com/k2nomadstours" },
];

export const navigation = {
  journeys: {
    label: "Popular Journeys",
    href: "/#popular-journeys",
  },
  treks: {
    label: "Treks",
    href: "/treks",
  },
  tours: {
    label: "Tours",
    href: "/tours",
  },
  cycling: {
    label: "Cycling",
    href: "/cycling",
  },
  vision: {
    label: "Vision & Mission",
    href: "/vision-mission",
  },
  faq: {
    label: "FAQ",
    href: "/faq",
  },
};
