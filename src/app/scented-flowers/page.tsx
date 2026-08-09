import type { Metadata } from "next";
import { ScentedFlowersFinal } from "@/components/MuseumExperienceFinal";

const socialImage = "https://wfkohcwxxsrhcxhepfql.supabase.co/storage/v1/object/public/museum-public/museums/scented-flowers/site/family_hero.webp";

export const metadata: Metadata = {
  title: "Scented Flowers — The Mother Museum",
  description: "The cultural museum house connecting Living Legends, Fallen Stars, Women Make the World Go Round and Forever Futbol through distinct immersive museum worlds and evolving annual collections.",
  keywords: ["Scented Flowers museum", "Living Legends museum", "Fallen Stars museum", "Women Make the World Go Round", "cultural museum", "touring museum"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Scented Flowers — The Mother Museum",
    description: "One cultural house. Four independent museum worlds. New annual collections built to keep discovery alive.",
    type: "website",
    images: [{ url: socialImage, width: 1600, height: 900, alt: "Scented Flowers museum family" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scented Flowers — The Mother Museum",
    description: "One cultural house. Independent museum worlds. Different every year.",
    images: [socialImage],
  },
};

export default function ScentedFlowersPage() {
  return <ScentedFlowersFinal />;
}
