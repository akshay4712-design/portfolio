# Portfolio — CLAUDE.md

This repository contains the personal portfolio website for **Mangesh Shinde**, a UX / Product Designer with experience designing enterprise SaaS platforms, healthcare products, and AI-driven applications.

The goal of this project is to build a **clean, fast, and professional portfolio website** that showcases real product design work through strong case studies and thoughtful storytelling.

The site should remain simple, maintainable, and optimized for quick deployment.

---

## Project Goal

Build a clean, fast, and modern personal portfolio website for **MangeshUX** that showcases:
- Hero introduction (name, role, short intro)
- Featured case studies
- Professional background and experience
- Selected projects across enterprise, healthcare, and AI domains
- Contact information
- Blog section for writing about UX, product thinking, and design insights

--- 

## Tech Stack

| Layer        | Choice                              |
|--------------|-------------------------------------|
| Framework    | Next.js 15 (App Router)             |
| Language     | TypeScript (strict mode)            |
| Styling      | Tailwind CSS v4                     |
| Animations   | Framer Motion                       |
| Icons        | Lucide React                        |
| Fonts        | next/font (Google Fonts)            |
| Deployment   | Vercel                              |

---

## Folder Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, metadata, theme)
│   ├── page.tsx            # Home page — assembles all sections
│   └── globals.css         # Global styles & Tailwind base
│
├── components/
│   ├── layout/             # Structural components
│   │   ├── Navbar.tsx      # Sticky top nav with smooth-scroll links
│   │   └── Footer.tsx      # Footer with social links
│   │
│   ├── sections/           # Full-page sections (used in page.tsx)
│   │   ├── Hero.tsx        # Name, title, CTA buttons
│   │   ├── Work.tsx        # Case studies / project highlights
│   │   ├── About.tsx       # Short bio + background
│   │   ├── Blogs.tsx       # Latest blog posts preview
│   │   └── Contact.tsx     # Contact form / links
│   │
│   └── ui/                 # Reusable small components
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       └── SectionHeading.tsx
│
├── data/
│   └── portfolio.ts        # ← ALL personal content lives here (single source of truth)
│
├── types/
│   └── index.ts            # Shared TypeScript interfaces
│
├── hooks/
│   └── useScrollSpy.ts     # Hook for active nav link highlighting
│
├── lib/
│   └── utils.ts            # cn() helper, misc utilities
│
└── styles/
    └── animations.css      # Custom keyframe animations (if needed)
```

---

## Data Sources

The project uses two primary content sources.

### 1. Portfolio Data

Core portfolio information (name, bio, experience, projects, skills, social links) lives in:

```
src/data/portfolio.ts
```

This file acts as the **single source of truth** for static portfolio data.

Update this file when editing:
- personal information
- skills
- experience timeline
- project summaries
- social links

---

### 2. Blog Content (Sanity CMS)

Blog posts are managed using **Sanity CMS**.

Sanity allows blog content to be edited without changing the codebase.

Sanity content types should include:

- `post`
- `author`
- `category`

Typical fields for a `post` document:

- `title`
- `slug`
- `excerpt`
- `publishedAt`
- `coverImage`
- `content` (portable text)
- `tags`

Sanity project structure should live in a separate directory:

```
sanity/
```

Frontend queries should fetch blog posts from Sanity and render them inside the `/blogs` route.

Example routes:

- `/blogs` → blog list page
- `/blogs/[slug]` → individual blog article

---

## Section IDs (for smooth scroll)

| Section    | ID            |
|------------|---------------|
| Hero       | `#hero`       |
| Work       | `#work`       |
| About      | `#about`      |
| Blogs      | `#blogs`      |
| Contact    | `#contact`    |

---

## Design Principles

1. **Mobile-first** — all layouts start at mobile, scale up
2. **Performance** — use `next/image` for all images, lazy load sections
3. **Accessibility** — semantic HTML, ARIA labels on interactive elements
4. **Dark mode** — support via Tailwind `dark:` classes (default: dark)
5. **Minimal & clean** — avoid clutter; whitespace is intentional
6. **Smooth animations** — subtle fade/slide-in on scroll using Framer Motion

---

## Projects to Showcase

The portfolio should highlight a mix of enterprise platforms, healthcare applications, and AI products.

### Primary Case Studies

- **Fisor** — Product design project
- **Provus CPQ** — Enterprise quoting platform (password protected)
- **PSA — Professional Services Automation** platform (password protected)

### Supporting Projects

- **AI COE — Oral Cancer Screening App**
- **Silvergenie — Elder Care App**
- **Midas — Clinical Dataset Platform**
- **TheOutpost.ai — AI Tools Directory**

Confidential enterprise projects should not reveal sensitive internal information. They should display a "Password protected case study" message when necessary.

---

## Blog System

The portfolio includes a blog section powered by **Sanity CMS**.

Purpose of the blog:

- share UX case studies and lessons
- write about enterprise UX challenges
- document design system thinking
- discuss AI, healthcare, and product design topics

### Blog Pages

Two main pages should exist:

1. **Blog List Page**

Route:

```
/blogs
```

Displays:

- article title
- publication date
- short excerpt
- tags
- cover image

2. **Blog Article Page**

Route:

```
/blogs/[slug]
```

Displays full article content fetched from Sanity.

### Sanity Query Rules

Claude should use GROQ queries when fetching blog data from Sanity.

Example fields to fetch:

- title
- slug
- excerpt
- coverImage
- publishedAt
- content

### Important Rules

- Blog content must **not be hardcoded** in React components.
- All blog articles must come from **Sanity CMS**.
- Use incremental static regeneration or server components when fetching posts.

---

## Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev           # → http://localhost:3000

# Build for production
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

## Development Workflow (2-Day Plan)

### Day 1 — Foundation & Content
- [ ] Fill in `src/data/portfolio.ts` with real personal data
- [ ] Set up `layout.tsx` (fonts, metadata, dark theme)
- [ ] Build `Navbar` and `Footer`
- [ ] Build core sections: Hero, Work, About, Blogs, Contact
- [ ] Wire everything in `page.tsx`

### Day 2 — Polish & Deploy
- [ ] Add Framer Motion scroll animations
- [ ] Make fully responsive (mobile/tablet/desktop)
- [ ] Add `<meta>` SEO tags and Open Graph image
- [ ] Test in production build (`npm run build`)
- [ ] Deploy to Vercel (`vercel --prod`)

---

## Key Rules for Claude

1. **Always edit `src/data/portfolio.ts` for content changes** — never hardcode text in components
2. **Use `@/` path alias** — never use relative `../` imports
3. **Tailwind only** — no inline styles, no CSS modules (except `globals.css`)
4. **TypeScript strict** — no `any` types; use interfaces from `src/types/index.ts`
5. **`next/image`** for all `<img>` tags
6. **`next/link`** for all internal navigation
7. When adding a new section: add it to `page.tsx`, add its ID to the Navbar links, and add its data to `portfolio.ts`
8. Keep components small and focused — one responsibility per file
9. Never invent fake project details. If information about a project is missing, leave a placeholder and request clarification.

---

## Environment Variables

```bash
# .env.local (create this file — never commit it)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add email service keys here when setting up the contact form
```

---

## Deployment (Vercel)

```bash
# One-time setup
npm i -g vercel
vercel login

# Deploy
vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` to your production URL in Vercel dashboard → Settings → Environment Variables.

# IMPORTANT INSTRUCTIONS FOR CLAUDE

Before performing any coding or modification tasks, Claude MUST read this entire file.

This document defines:
- project architecture
- coding standards
- design principles
- data sources
- blog CMS structure
- portfolio content rules

Claude must follow these instructions when generating or modifying any code in this repository.

---

# Project: Mangesh Shinde Portfolio

This repository contains the personal portfolio website for **Mangesh Shinde**, a UX / Product Designer with experience designing enterprise SaaS platforms, healthcare products, finance applications, and AI‑driven systems.

The objective of this project is to build a **clean, fast, and professional portfolio website** that highlights real product design work through strong case studies.

The site should remain simple, maintainable, and optimized for quick deployment.

---

# Project Goal

Build a modern UX designer portfolio that includes:

- Hero introduction (name, role, short intro)
- Featured case studies
- Professional experience
- Enterprise SaaS project work
- Blog articles about UX and product thinking
- Contact information

This project is designed to be **implemented and deployed quickly**.

---

# Tech Stack

| Layer | Technology |
|------|-------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | next/font |
| CMS | Sanity |
| Deployment | Vercel |

---

# Folder Architecture

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Work.tsx
│   │   ├── About.tsx
│   │   ├── Blogs.tsx
│   │   └── Contact.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       └── SectionHeading.tsx
│
├── data/
│   └── portfolio.ts
│
├── types/
│   └── index.ts
│
├── hooks/
│   └── useScrollSpy.ts
│
├── lib/
│   └── utils.ts
│
└── styles/
    └── animations.css
```

---

# Data Sources

The project uses two content sources.

## 1. Portfolio Content

All static personal information lives in:

```
src/data/portfolio.ts
```

This file is the **single source of truth** for:

- personal information
- experience
- skills
- project summaries
- social links

Claude must update this file instead of hardcoding content inside components.

---

## 2. Blog Content (Sanity CMS)

Blog articles are managed using **Sanity CMS**.

Sanity allows content editing without modifying the codebase.

Sanity project structure:

```
sanity/
 ├ schemas/
 │   └ post.ts
 ├ sanity.config.ts
 └ sanity.client.ts
```

Blog document types should include:

- post
- author
- category

Post fields:

- title
- slug
- excerpt
- publishedAt
- coverImage
- content (Portable Text)
- tags

---

# Blog System

The portfolio includes a blog section powered by **Sanity CMS**.

## Blog Routes

```
/blogs
/blogs/[slug]
```

### Blog List Page

Displays:

- article title
- publication date
- excerpt
- tags
- cover image

### Blog Article Page

Displays full article content fetched from Sanity.

Claude must fetch blog posts using **GROQ queries**.

Example fields:

- title
- slug
- excerpt
- coverImage
- publishedAt
- content

---

# Section IDs

| Section | ID |
|-------|------|
| Hero | #hero |
| Work | #work |
| About | #about |
| Blogs | #blogs |
| Contact | #contact |

---

# Design Principles

1. Mobile‑first layouts
2. Minimal design
3. Clear typography hierarchy
4. Accessible UI
5. Fast loading
6. Subtle animations only

Whitespace should be used intentionally.

---

# Projects to Showcase

The portfolio should highlight enterprise, healthcare, AI, and product design work.

## Primary Case Studies

- Fisor
- Provus CPQ — Enterprise quoting platform (password protected)
- PSA — Professional Services Automation platform (password protected)

## Supporting Projects

- AI COE — Oral Cancer Screening App
- Silvergenie — Elder Care App
- Midas — Clinical Dataset Platform
- TheOutpost.ai — AI Tools Directory

Confidential enterprise projects must **not reveal sensitive internal information**.

Display "Password protected case study" where necessary.

---

# Development Workflow

## Day 1

- Fill `portfolio.ts`
- Build layout
- Create sections
- Assemble homepage

## Day 2

- Add animations
- Improve responsiveness
- Add SEO metadata
- Deploy to Vercel

---

# Commands

```
npm install
npm run dev
npm run build
npm run lint
npx tsc --noEmit
```

---

# Mandatory Rules

Claude must always follow these rules:

1. Always read this CLAUDE.md file before generating code
2. Never hardcode portfolio content inside components
3. Use `src/data/portfolio.ts` for portfolio data
4. Use Sanity CMS for blog content
5. Use `@/` path aliases
6. Use Tailwind only for styling
7. Use strict TypeScript
8. Use `next/image` and `next/link`
9. Never invent project details
10. Keep components small and reusable

---

# Deployment

Deployment target: **Vercel**

```
vercel --prod
```

Environment variables:

```
NEXT_PUBLIC_SITE_URL
```

Never commit `.env.local`.

---

End of CLAUDE.md