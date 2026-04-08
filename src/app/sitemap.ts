import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allPostsQuery, type SanityPost } from "@/sanity/lib/queries";
import { portfolioData } from "@/data/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.mangeshux.in";

  const posts = await client.fetch<SanityPost[]>(allPostsQuery);
  const blogUrls = posts
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${base}/blogs/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const workUrls = portfolioData.caseStudies
    .filter((s) => !s.isPasswordProtected)
    .map((s) => ({
      url: `${base}/work/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...workUrls,
    ...blogUrls,
  ];
}
