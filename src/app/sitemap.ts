import type { MetadataRoute } from "next";
import { siteUrl } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }, { url: `${siteUrl}/projects/fashiontech` }];
}
