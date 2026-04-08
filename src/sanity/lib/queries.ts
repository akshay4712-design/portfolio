import { defineQuery } from 'next-sanity'

export type SanityPost = {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  publishedAt: string | null;
  tags: string[] | null;
  readTime: string | null;
  coverImage: Record<string, unknown> | null;
  content?: unknown;
}

export const allPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    tags,
    readTime,
    coverImage,
  }
`)

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    tags,
    readTime,
    coverImage,
    content,
  }
`)
