"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

interface BlogCardProps {
  post: {
    slug: string | null;
    title: string | null;
    excerpt?: string | null;
    publishedAt?: string | null;
    readTime?: string | null;
    tags?: string[] | null;
  };
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link
        href={`/blogs/${post.slug ?? ""}`}
        className="group block rounded-2xl border border-white/8 bg-[#111111] p-6 hover:border-white/16 transition-all duration-300"
      >
        <p className="text-xs text-white/30 mb-4">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : ""}
        </p>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-white group-hover:text-white/85 transition-colors leading-snug">
            {post.title}
          </h3>
          <ArrowUpRight
            size={16}
            className="text-white/20 group-hover:text-white/60 transition-colors mt-0.5 shrink-0"
          />
        </div>
        <p className="text-sm text-white/45 leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
        <div className="flex flex-wrap gap-1.5">
          {(post.tags ?? []).map((tag) => (
            <Badge key={tag} variant="muted">
              {tag}
            </Badge>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
