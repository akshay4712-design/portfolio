"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";

const NAV_LINKS = [
  { label: "Work",    sectionId: "work",    slug: "/#work" },
  { label: "About",   sectionId: "about",   slug: "/#about" },
  { label: "Blog",    sectionId: "blogs",   slug: "/blogs" },
  { label: "Contact", sectionId: "contact", slug: "/#contact" },
];

const SECTION_IDS = ["hero", "work", "about", "blogs", "contact"];

export default function Navbar() {
  const pathname  = usePathname();
  const isHome    = pathname === "/";
  const activeId  = useScrollSpy(SECTION_IDS);
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * On homepage  → use plain anchor (#work) so it smooth-scrolls without navigation.
   * On any other page → use full anchor (/#work) so it navigates home then jumps.
   * Blog link is always /blogs.
   */
  function getHref(link: (typeof NAV_LINKS)[0]) {
    if (link.slug === "/blogs") return "/blogs";
    return isHome ? `#${link.sectionId}` : link.slug;
  }

  /**
   * Active state logic:
   * - On homepage → driven by scroll spy section ID
   * - On /blogs/* → highlight "Blog"
   * - On /work/*  → highlight "Work"
   */
  function isActive(link: (typeof NAV_LINKS)[0]) {
    if (pathname.startsWith("/blogs")) return link.sectionId === "blogs";
    if (pathname.startsWith("/work"))  return link.sectionId === "work";
    return isHome && activeId === link.sectionId;
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/8"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo — always goes home */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <Logo size={28} />
          <span className="text-sm font-semibold text-white tracking-tight">
            Mangesh<span className="text-white/30">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.sectionId}>
              <Link
                href={getHref(link)}
                className={cn(
                  "text-sm transition-all duration-200 relative pb-0.5",
                  isActive(link)
                    ? "text-gradient after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-violet-400 after:to-cyan-400"
                    : "text-white/45 hover:text-white/80"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/resume"
            className="text-sm text-white/45 hover:text-white/80 transition-colors"
          >
            Resume
          </Link>
          <a
            href="mailto:hey@mangeshux.in"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm text-white/70 hover:border-white/40 hover:text-white transition-all duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Contact
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={cn("w-5 h-px bg-white transition-all duration-300", menuOpen && "rotate-45 translate-y-2")} />
          <span className={cn("w-5 h-px bg-white transition-all duration-300", menuOpen && "opacity-0")} />
          <span className={cn("w-5 h-px bg-white transition-all duration-300", menuOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/8 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.sectionId}
              href={getHref(link)}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-base transition-colors",
                isActive(link) ? "text-white" : "text-white/70 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/resume"
            onClick={() => setMenuOpen(false)}
            className="text-base text-white/70 hover:text-white transition-colors"
          >
            Resume
          </Link>
          <a
            href="mailto:hey@mangeshux.in"
            className="text-base text-white/70 hover:text-white transition-colors"
          >
            hey@mangeshux.in
          </a>
        </div>
      )}
    </header>
  );
}
