import type { Metadata } from "next";
import { MuseumHonoreeProfile } from "@/components/MuseumHonoreeProfile";

export const metadata: Metadata = { title: "Digital Exhibit — Fallen Stars", description: "A Season One Fallen Stars digital remembrance exhibit." };

export default function Page({ params }: { params: { slug: string } }) {
  return <MuseumHonoreeProfile museumSlug="fallen-stars" slug={params.slug} />;
}
