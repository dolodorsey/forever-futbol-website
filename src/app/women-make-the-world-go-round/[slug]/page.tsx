import type { Metadata } from "next";
import { MuseumHonoreeProfile } from "@/components/MuseumHonoreeProfile";

export const metadata: Metadata = { title: "Digital Exhibit — Women Make the World Go Round", description: "A Season One Women Make the World Go Round digital exhibit." };

export default function Page({ params }: { params: { slug: string } }) {
  return <MuseumHonoreeProfile museumSlug="women-make-the-world-go-round" slug={params.slug} />;
}
