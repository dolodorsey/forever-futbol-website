import type { Metadata } from "next";
import { MuseumHonoreeProfile } from "@/components/MuseumHonoreeProfile";

export const metadata: Metadata = { title: "Digital Exhibit — Living Legends", description: "A Season One Living Legends digital exhibit." };

export default function Page({ params }: { params: { slug: string } }) {
  return <MuseumHonoreeProfile museumSlug="living-legends" slug={params.slug} />;
}
