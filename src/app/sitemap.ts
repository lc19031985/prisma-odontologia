import type { MetadataRoute } from "next";
import { clinic } from "@/config/clinic";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = clinic.siteUrl;
  return [
    {
      url: `${base}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/politica-de-privacidade/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/termos-de-uso/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
