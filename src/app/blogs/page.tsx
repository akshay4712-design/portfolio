import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { allPostsQuery, type SanityPost } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { portfolioData } from "@/data/portfolio";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Blog — ${portfolioData.name}`,
  description: "Thoughts on UX, product design, and the craft of building useful things.",
};

export default async function BlogsPage() {
  const posts = await client.fetch<SanityPost[]>(allPostsQuery);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-28 pb-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/#blogs"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Blog</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Writing & Thinking</h1>
        <p className="text-base text-white/50 mb-16">
          Thoughts on UX, product design, and the craft of building useful things.
        </p>

        {posts.length === 0 ? (
          <p className="text-white/30 text-sm">No posts yet. Add your first post in the Sanity Studio at <Link href="/studio" className="underline hover:text-white transition-colors">/studio</Link>.</p>
        ) : (
          <div className="space-y-px">
            {posts.map((post) => (
              <Link
                key={post.slug ?? post._id}
                href={`/blogs/${post.slug ?? ""}`}
                className="group flex items-start gap-5 py-7 border-b border-white/6 hover:border-white/12 transition-all"
              >
                {/* Thumbnail */}
                {post.coverImage && (
                  <div className="relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-white/5">
                    <Image
                      src={urlFor(post.coverImage).width(200).height(200).url()}
                      alt={post.title ?? ""}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-white/30">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : ""}
                    </span>
                    {post.readTime && (
                      <>
                        <span className="text-white/15">·</span>
                        <span className="text-xs text-white/30 flex items-center gap-1">
                          <Clock size={10} />
                          {post.readTime}
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="text-base font-semibold text-white group-hover:text-white/85 transition-colors mb-1.5 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-white/40 leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(post.tags ?? []).map((tag: string) => (
                      <Badge key={tag} variant="muted">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-white/20 group-hover:text-white/60 transition-colors mt-1 shrink-0"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
