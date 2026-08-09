import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://foreverfutbolmuseum.com";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/scented-flowers`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/living-legends`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/fallen-stars`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/women-make-the-world-go-round`, changeFrequency: "monthly", priority: 0.9 },
  ];
}
