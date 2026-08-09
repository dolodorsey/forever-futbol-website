import type { Metadata } from "next";
import { WomenMuseumView } from "@/components/MuseumViews";

const socialImage = "https://wfkohcwxxsrhcxhepfql.supabase.co/storage/v1/object/public/museum-public/museums/women-make-the-world-go-round/site/women_hero.webp";

export const metadata: Metadata = {
  title: "Women Make the World Go Round — Vision. Strength. Impact.",
  description: "An immersive annual museum of women’s history, leadership, achievement and cultural influence, with a flagship focus on Black women and urban culture. A different collection is revealed each year.",
  keywords: ["Women Make the World Go Round", "Scented Flowers", "women's history museum", "Black women museum", "cultural museum", "immersive museum"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Women Make the World Go Round",
    description: "Her story. Our world. A different annual collection of women, industries, eras and impact — discovered inside.",
    type: "website",
    images: [{ url: socialImage, width: 1600, height: 900, alt: "Women Make the World Go Round museum experience" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Women Make the World Go Round",
    description: "Vision. Strength. Impact. Different every year. Revealed inside.",
    images: [socialImage],
  },
};

export default function WomenMuseumPage() {
  return <WomenMuseumView />;
}
