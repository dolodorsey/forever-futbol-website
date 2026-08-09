import type { Metadata } from "next";
import { ScentedFlowersPublic } from "@/components/MuseumPublic";
import { MuseumEnhancements } from "@/components/MuseumEnhancements";

export const metadata: Metadata = {
  title: "Scented Flowers — A House of Cultural Museums",
  description: "The parent platform for Living Legends, Fallen Stars, Women Make the World Go Round, and Forever Futbol.",
};

const familyCities = ["Miami","Orlando","Houston","Tampa","Atlanta","Memphis","Savannah","Dallas","New York","Denver","Washington, D.C.","Las Vegas","Los Angeles","Charlotte","Nashville","Birmingham"];

export default function ScentedFlowersPage() {
  return <>
    <ScentedFlowersPublic />
    <MuseumEnhancements museumSlug="scented-flowers" museumName="Scented Flowers" cities={familyCities} accent="#d3aa4a" accent2="#e5c879" />
  </>;
}
