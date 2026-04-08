import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { client } from "@/sanity/lib/client";
import { allPostsQuery, postBySlugQuery, type SanityPost } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { portfolioData } from "@/data/portfolio";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await client.fetch<SanityPost[]>(allPostsQuery);
  return posts.map((p: SanityPost) => ({ slug: p.slug ?? "" }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });
  if (!post) return {};
  return {
    title: `${post.title} — ${portfolioData.name}`,
    description: post.excerpt,
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: Record<string, unknown> }) => (
      <div className="relative w-full rounded-xl overflow-hidden my-8">
        <Image
          src={urlFor(value).width(900).url()}
          alt={(value.alt as string) ?? ""}
          width={900}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-lg font-semibold text-white mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-white/60 leading-relaxed my-4">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-white/20 pl-4 italic text-white/45 my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc ml-6 space-y-1 my-4 text-white/60">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal ml-6 space-y-1 my-4 text-white/60">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-white/85">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-white/8 px-1.5 py-0.5 rounded text-sm font-mono text-violet-300">{children}</code>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2 hover:text-violet-400 transition-colors">
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-28 pb-24 px-6 md:px-10">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          All Posts
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs text-white/30">
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : ""}
          </span>
          {post.readTime && (
            <>
              <span className="text-white/15">·</span>
              <span className="text-xs text-white/30 flex items-center gap-1">
                <Clock size={10} /> {post.readTime}
              </span>
            </>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-base text-white/50 leading-relaxed mb-6">{post.excerpt}</p>

        {post.coverImage && (
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-10">
            <Image
              src={urlFor(post.coverImage).width(1200).height(600).url()}
              alt={post.title ?? ""}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-12 pb-12 border-b border-white/8">
          {(post.tags ?? []).map((tag: string) => (
            <Badge key={tag} variant="muted">{tag}</Badge>
          ))}
        </div>

        {post.content ? (
          <div className="prose-custom">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>
        ) : (
          <p className="text-white/40 italic">Full article coming soon.</p>
        )}

        <div className="mt-16 pt-8 border-t border-white/8 flex items-center justify-between">
          <Link href="/blogs" className="text-sm text-white/40 hover:text-white transition-colors">
            ← All Posts
          </Link>
          <a
            href={`mailto:${portfolioData.email}?subject=Re: ${post.title}`}
            className="text-sm text-white/40 hover:text-white transition-colors"
          >
            Reply via email
          </a>
        </div>
      </div>
    </div>
  );
}
