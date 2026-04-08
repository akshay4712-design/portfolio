import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allPostsQuery, type SanityPost } from "@/sanity/lib/queries";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/sections/BlogCard";

export default async function Blogs() {
  const posts = await client.fetch<SanityPost[]>(allPostsQuery, {}, { next: { revalidate: 60 } });
  const preview = posts.slice(0, 3);

  return (
    <section id="blogs" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <SectionHeading
        label="Blog"
        title="Writing & Thinking"
        subtitle="Thoughts on UX, product design, and the craft of building useful things."
      />

      {preview.length === 0 ? (
        <p className="text-white/30 text-sm text-center py-12">
          No posts yet.{" "}
          <Link href="/studio" className="underline hover:text-white transition-colors">
            Add your first post in Studio →
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {preview.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}

      {posts.length > 3 && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            Read all posts
            <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </section>
  );
}
