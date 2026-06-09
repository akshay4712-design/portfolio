import { PortfolioData } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — edit this file to update all portfolio content
// ─────────────────────────────────────────────────────────────────────────────

export const portfolioData: PortfolioData = {
  name: "Mangesh Shinde",
  title: "Product & UX Designer",
  tagline: "I design digital products that simplify complex workflows and feel human",
  bio: "With 3+ years of experience building B2B SaaS, healthcare, and finance applications. I specialise in translating complex workflows into intuitive, accessible experiences — across enterprise platforms, mobile apps, and AI-driven systems.",
  email: "hey@mangeshux.in",
  location: "Pune, India",
  resumeUrl: "/resume.pdf",

  social: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/mangeshux/" },
    { platform: "Medium", url: "https://medium.com/@mangeshux" },
    { platform: "Twitter", url: "https://x.com/akshay4712" },
  ],

  tools: [
    { name: "Figma", category: "design" },
    { name: "Framer", category: "design" },
    { name: "Spline", category: "design" },
    { name: "Webflow", category: "development" },
    { name: "Relume", category: "design" },
    { name: "Hotjar", category: "research" },
    { name: "Fireflies AI", category: "research" },
    { name: "Notion", category: "productivity" },
    { name: "Airtable", category: "productivity" },
    { name: "Jira", category: "productivity" },
  ],

  caseStudies: [
    // ─── Primary (featured) ───
    {
      title: "Fisor",
      slug: "fisor",
      category: "Finance App",
      description: "A privacy-first Android finance app designed and built solo in one month using AI",
      tags: ["Android", "Finance", "Privacy", "Jetpack Compose", "Solo Project"],
      color: "#0F1B2D",
      featured: true,
      role: "Product Designer & Developer",
      company: "Personal Project",
      timeline: "6 Months · 2025–2026",
      team: "Solo (Design + Development)",
      tools: ["Figma", "Jetpack Compose", "Room DB", "SQLCipher", "MVVM"],
      fullDescription: "Fisor is a personal finance Android app I designed and built end-to-end — from first wireframe to Play Store release. It helps users track daily expenses, auto-categorize spending, and understand their financial patterns, all without an internet connection or surrendering data to a server.\n\nThe goal was to build something that felt calm and trustworthy in a space full of cluttered, ad-heavy, privacy-violating alternatives. A fully documented token-based design system was built alongside — every color, spacing value, and typography style has a semantic name, with no raw hex values anywhere in the codebase.\n\n\"I want to see where my money goes — not explain myself to an app that sells my data.\" — Target user insight",
      challenge: "Most expense trackers in India are either too complex, require bank account linking, push notifications constantly, or monetize through ads. Users feel like they're giving up more than they're gaining.\n\nThree specific problems drove the design: Privacy — leading apps require bank login or collect transaction data for third-party analytics, causing users with financial anxiety to avoid them entirely. Friction — logging a transaction should take under 5 seconds, but most apps have 4–6 steps before you can save anything. Clutter — dashboards are packed with charts, predictions, and tips nobody asked for, making it hard to see what actually matters.\n\nBuilding the app solo also meant navigating hard interaction problems: swipe-to-edit and swipe-to-delete gestures were invisible with no affordance. SwipeToDismissBox was intercepting vertical scroll events, triggering the edit modal when users tried to scroll. And the category detail screen was blinking visibly on every navigation — a broken first impression for a core feature.",
      solution: "Every screen was built around a single question: does this help users understand their money faster?\n\nKey features shipped: Quick transaction entry in under 5 seconds (amount, merchant, category → Save). Auto-categorization rules — set \"Swiggy → Food\" once and every future transaction is sorted automatically. Dashboard with Day / Week / Month / Year segments and period-aware charts. Categories screen with monthly bar chart and transaction drill-down. PIN + Biometric lock with AES-256 encrypted local database (Room + SQLCipher). CSV export — your data, your format, no lock-in.\n\nDesign challenges solved: A one-time swipe hint animation on first launch (stored in SharedPreferences, never repeated) made the gesture affordance discoverable without being intrusive. A custom pointer input modifier detecting scroll direction fixed the gesture conflict — vertical movement snaps dismiss state back to Settled without consuming the scroll event. Wrapping the category data Flow in remember(catName) eliminated the recomposition blink entirely.\n\nTech stack: Jetpack Compose · MVVM + StateFlow · Room + SQLCipher · Vico charts · WorkManager · BiometricPrompt · Compose Navigation.",
      outcome: "Shipped from concept to Play Store in 6 months — designed, built, and published by one person learning Android development along the way.\n\n100% offline with zero network permission required. Zero third-party SDKs or analytics. v1.0 live on Google Play Store.\n\nKey learnings: Design systems pay for themselves — every UI change after building the token system was a single edit, not a hunt-and-replace across 20 files. Simplicity is harder than complexity — every feature cut was the right call. Building what you design changes how you design — implementing my own designs surfaced gesture conflicts and recomposition bugs invisible in Figma. Privacy is a feature, not a policy — users trust Fisor because it literally cannot collect their data.",
      heroGradient: "linear-gradient(135deg, #0F1B2D 0%, #1a2f4a 100%)",
      image: "/images/projects/fisor.png",
    },
    {
      title: "Enterprise CPQ Platform",
      slug: "enterprise-cpq",
      category: "Enterprise SaaS",
      description: "End-to-end redesign of an enterprise Configure, Price, Quote platform — simplifying complex quoting workflows for sales teams.",
      tags: ["B2B SaaS", "CPQ", "Enterprise", "Quoting"],
      color: "#0D1F0D",
      isPasswordProtected: true,
      featured: true,
      role: "Senior UX Designer",
      company: "2dot47 Consulting",
      timeline: "Jan 2024 – Present",
      team: "2 Designers, 3 FE, 4 BE, 1 PM",
      tools: ["Figma", "Hotjar", "Jira", "Notion"],
      fullDescription: "Provus CPQ is an enterprise Configure, Price, Quote platform used by large sales organisations. I led the end-to-end redesign of the quoting workflow, reducing quote generation time significantly.",
      heroGradient: "linear-gradient(135deg, #0D1F0D 0%, #1a3a1a 100%)",
      image: "/images/projects/cpq_cover_image.svg",
    },
    {
      title: "Professional Services Automation Tool",
      slug: "psa",
      category: "Enterprise SaaS",
      description: "PSA platform foundation — bringing clarity to resource planning, project tracking and billing.",
      tags: ["B2B SaaS", "PSA", "Enterprise", "Resource Planning"],
      color: "#1A0D2E",
      isPasswordProtected: true,
      featured: true,
      role: "UX Designer",
      company: "2dot47 Consulting",
      timeline: "Jun 2023 – Dec 2023",
      team: "1 Designer, 2 FE, 3 BE, 1 PM",
      tools: ["Figma", "Hotjar", "Airtable", "Jira"],
      fullDescription: "A Professional Services Automation platform that helps services organisations manage projects, resources, and billing in one place. I redesigned the core workflows to reduce cognitive load.",
      heroGradient: "linear-gradient(135deg, #1A0D2E 0%, #2d1a4a 100%)",
      image: "/images/projects/psa_cover_image.svg",
    },

    {
      title: "Aarogya Aarohan",
      slug: "ai-coe",
      category: "Healthcare · AI",
      description: "AI-powered oral cancer screening app for frontline health workers — designed to enable early detection across underserved communities in rural India.",
      tags: ["Healthcare", "Mobile", "AI", "Offline-first", "IISc", "Niti Aayog"],
      color: "#0A1F1F",
      featured: true,
      role: "Product Designer",
      company: "IISc · Niti Aayog · ICMR",
      timeline: "12 Weeks",
      team: "2 Designers, 4 Engineers, 1 Research Lead",
      tools: ["Figma", "Dropbox", "Google Docs"],
      liveUrl: "https://play.google.com/store/apps/details?id=in.ac.iisc.arogyam&hl=en_IN",
      fullDescription: "Aarogya Aarohan is an AI-powered mobile application developed under IISc's AI Centre of Excellence initiative — sponsored by Niti Aayog and ICMR — to tackle India's oral cancer crisis. India records an estimated 77,000 new cases and 52,000 deaths from oral cancer annually, with late diagnosis being the primary cause of mortality. The app puts early-detection capability directly in the hands of frontline ASHA workers operating in rural, low-connectivity environments. Field workers photograph patients' oral cavities; an AI model analyses the images and flags high-risk cases for clinical follow-up — with human expert review built in as a safety layer.",
      challenge: "India's oral cancer burden is severe and largely silent until it's too late — driven by limited rural healthcare access, low awareness, and widespread tobacco use. The core design challenge was building an app for ASHA workers using low-end personal phones (₹6,000–15,000 range) with 3–4 hours of battery life and intermittent connectivity.\n\nField research at AIIMS Delhi (Phase 1) revealed that the offline-first approach was creating confusion between synced and unsynced cases. App crashes during incoming calls or multitasking were causing data loss mid-screening. Workers needed a draft feature to safely pause and resume screenings without losing patient data. A second research phase in Krishnagiri, rural Tamil Nadu — covering the villages of Mallapadi and Kanthikuppam — uncovered navigation issues and further gaps in the information architecture that were slowing down screenings in the field.",
      solution: "Phase 1 & 2 focused on stability and trust: integrated a draft-save mechanism to preserve incomplete screenings on interruption, segregated synced and unsynced cases with a clear manual sync button, and simplified navigation to avoid complex nesting on small screens. Rapid wireframe iterations kept pace with research findings.\n\nPhase 3 was a ground-up redesign of the information architecture. I rebuilt the sitemap entirely, adding a Dashboard (screening stats and follow-up tasks), a reworked Cases screen (drafts, submitted, recent) and a new Tasks section (new, pending, completed). New features included Profile management, Notifications, and AI-assisted Follow-up Recommendations. I ran daily huddles with the IISc research team to align technical constraints with design decisions. A custom design system was developed on top of Material Design for the mobile app, with Carbon Design System maintained for the backend (aligned with the MIDAS platform).",
      outcome: "Deployed across 5 states — Karnataka, Tamil Nadu, Delhi, Assam, and Uttar Pradesh — with hundreds of active ASHA workers in Karnataka and Tamil Nadu alone. The app replaced a manual, paper-based screening process, significantly increasing throughput for oral cancer screenings in underserved communities. Research continues with primary users for ongoing iteration.",
      heroGradient: "linear-gradient(135deg, #0A1F1F 0%, #0d3030 100%)",
      image: "/images/projects/arohan.webp",
    },

    // ─── Supporting ───
    {
      title: "TheOutpost.ai",
      slug: "theoutpost-ai",
      category: "AI Tools Directory",
      description: "Added News, Events, and Newsletter features to an AI tools platform — driving daily return visits and tripling subscriber growth in 30 days.",
      tags: ["AI", "Web App", "Product Design", "Growth"],
      color: "#1F150A",
      featured: false,
      role: "Product Designer",
      company: "TheOutpost.ai",
      timeline: "6 Weeks · Jan 2026",
      team: "Solo Designer",
      tools: ["Figma", "Dropbox"],
      liveUrl: "https://theoutpost.ai/",
      fullDescription: "TheOutpost.ai is a curated directory of AI tools and news for professionals. The platform had strong content but poor retention — 24 of every 100 visitors returned, average session duration was just 34 seconds, and subscriber growth had stalled at 20 in Q1.",
      challenge: "The platform was built around AI tools — but tools are used occasionally, not daily. There was no reason for users to come back between tool searches. Session duration of 34 seconds and a 24% return rate confirmed the experience wasn't sticky enough to build an audience.",
      solution: "Prioritised a News section as the daily hook — curated AI content that gives users a reason to return every day. Added an Events section for community awareness and a Newsletter for weekly digests. Limited news items per view with dedicated imagery to reduce cognitive load, avoiding the cluttered patterns of competitor platforms. Leveraged the existing design system for speed, shipping in 6 weeks.",
      outcome: "Within 30 days of launch: 600 unique visitors, 60% increase in retention, 90 new newsletter subscribers, and session duration up from 34 seconds to 80 seconds per user.",
      heroGradient: "linear-gradient(135deg, #1F150A 0%, #3a2a12 100%)",
    },
    {
      title: "MIDAS",
      slug: "midas",
      category: "Healthcare · Research",
      description: "India's first centralised medical imaging dataset platform — designed for 6 user types to upload, annotate, and share datasets for AI model training.",
      tags: ["Healthcare", "Dataset", "IISc", "AI", "Research"],
      color: "#1A0A1F",
      featured: false,
      role: "Product Designer",
      company: "IISc · ICMR · Niti Aayog",
      timeline: "3 Months · 2023",
      team: "Small Design Team",
      tools: ["Figma", "Airtable", "Jira"],
      liveUrl: "https://www.midas.iisc.ac.in/fe/landing-page",
      fullDescription: "MIDAS (Medical Imaging Datasets) is India's first centralised platform for storing, annotating, and accessing medical imaging data — built in collaboration with IISc, ICMR, ABDM, and Niti Aayog. India's fragmented healthcare systems had no shared infrastructure for researchers to obtain quality datasets to train and validate AI models for disease detection.",
      challenge: "Six distinct user types needed to interact with the platform — End Users, Platform Admins, Hub Managers, Spoke Coordinators, Annotators, Adjudicators, and Curators — each with different access levels, tasks, and mental models. Designing a single coherent system that served all of them without overwhelming any of them was the core challenge.",
      solution: "Adopted the Carbon Design System as the base and customised it significantly for the medical context. Prioritised transparent workflows and single-click access for non-technical users. Used precise medical terminology in UX writing for the clinical audience. Designed key screens: dashboards per role, data upload interfaces, batch review tools, team management panels, and integrated the Annotator v7 Darwin annotation tool. Moved from mid-fidelity to high-fidelity after stakeholder alignment.",
      outcome: "Platform delivered ahead of schedule. Live at midas.iisc.ac.in. Recognised by AIIMS Delhi, ICMR, and IISc, presented at the G20 Summit, and approved by Niti Aayog.",
      heroGradient: "linear-gradient(135deg, #1A0A1F 0%, #2d1a3a 100%)",
    },
    {
      title: "Silvergenie",
      slug: "silvergenie",
      category: "Elder Care",
      description: "Mobile app for an elder care platform serving seniors whose children live abroad — consolidated services, plans, and caregiver bookings into one accessible interface.",
      tags: ["Healthcare", "Mobile", "Accessibility", "Elder Care"],
      color: "#1F0D0D",
      featured: false,
      role: "Product Designer",
      company: "Triveous",
      timeline: "Mar 2024 – May 2024",
      team: "1 FE (Intern), 1 FS, 2 PD, 1 PM",
      tools: ["Figma", "Dropbox"],
      liveUrl: "https://play.google.com/store/search?q=Silvergenie&c=apps&hl=en_IN",
      fullDescription: "Silvergenie provides elder care services for seniors in India whose children live abroad. The platform offers a range of services — medical assistance, daily care, emergency support, and companionship — all coordinated remotely by family members. I was responsible for designing the mobile app, integrating all their services including plans and pricing into a single user-friendly interface.",
      challenge: "The core tension was designing for two very different users simultaneously: elderly parents who needed simplicity, large touch targets, and minimal cognitive load — and their adult children abroad who needed visibility, control, and confidence that their parents were being cared for. Consolidating multiple service categories, pricing plans, and booking flows without overwhelming either audience was the central design challenge.",
      solution: "Designed a clean, high-contrast mobile UI with large touch targets and simplified navigation for elderly users. Consolidated all service categories, care plans, and pricing into a structured, browsable interface. Built clear booking flows for caregiver scheduling and service requests. Ensured the family-facing experience surfaced status and activity clearly without requiring constant calls.",
      outcome: "App live on Google Play Store with active users across India. Full service suite — plans, bookings, caregiver coordination — accessible from a single interface.",
      heroGradient: "linear-gradient(135deg, #1F0D0D 0%, #3a1a1a 100%)",
    },
    {
      title: "MLS Verifier",
      slug: "mls-verifier",
      category: "B2B · Startup",
      description: "End-to-end website design and no-code deployment for a background verification startup — from IA to live site, without a developer.",
      tags: ["B2B", "Verification", "SME", "Framer", "Solo"],
      color: "#0D0D1F",
      featured: false,
      role: "Product Designer",
      company: "MLS Verify",
      timeline: "9 Months · 2023",
      team: "Solo Designer",
      tools: ["Figma", "Framer", "Dropbox"],
      liveUrl: "https://www.mlsverifier.com/",
      fullDescription: "MLS Verify is a background verification startup targeting small and medium enterprises. As the sole designer, I was responsible for the entire product — information architecture, wireframing, UI design, and final deployment — without any developer support.",
      challenge: "A new startup with no online presence needed a website that clearly communicated their services, built trust with HR buyers, and established their position in a competitive verification market. The founding team had no in-house developers, so the final output needed to be deployable without writing code.",
      solution: "Narrowed the service offering to three focused verticals — employee verification, banking/finance, and vendor onboarding — to avoid a broad, unconvincing pitch. Designed the full information architecture and tested wireframes with HR professionals and business owners. Built the UI design system including colour palette, illustrations, and branding. Selected Framer for deployment due to its Figma-like interface, and launched the site independently.",
      outcome: "Full website live at mlsverifier.com — designed and deployed solo. Helped position the company clearly in the SME verification market and influenced strategic decisions about target audience.",
      heroGradient: "linear-gradient(135deg, #0D0D1F 0%, #1a1a3a 100%)",
    },
  ],

  blog: [
    {
      title: "My Journey with FOMO: A Designer's Perspective",
      excerpt: "Exploring how the fear of missing out shapes design decisions, feature bloat, and the products we build.",
      content: `## The Fear That Drives Bad Design

Every designer has felt it — the nagging sense that you're missing out on the latest tool, framework, or trend. But FOMO doesn't just affect our personal choices; it quietly shapes the products we design.

## How FOMO Sneaks Into Products

When we're afraid of missing out on user needs, we add features "just in case." When we're afraid of missing the design trend, we follow it blindly. The result is products that try to do everything and end up doing nothing well.

## A Better Approach

The best products I've worked on came from a place of deep focus — understanding what users actually need, not what we fear they might need.

**Ask yourself:**
- Is this feature solving a real problem?
- Are we adding this because users need it, or because competitors have it?
- What happens if we don't build this?

## Closing Thought

FOMO is a signal, not a directive. Use it to stay curious and informed, but don't let it drive your design decisions. The best design comes from clarity, not fear.`,
      publishedAt: "Aug 18, 2024",
      readTime: "4 min read",
      tags: ["UX", "Psychology", "Product Thinking"],
      slug: "my-journey-with-fomo",
    },
    {
      title: "Insights from My User Research Journey",
      excerpt: "Key learnings from conducting user research across enterprise and consumer products — what works, what doesn't.",
      content: `## Starting With Why

User research isn't about validating what you already believe. It's about being genuinely surprised — and letting that surprise change your direction.

## What I've Learned

After conducting research across B2B SaaS platforms, healthcare apps, and consumer products, here are my key learnings:

### 1. Context Matters More Than You Think
The same user behaves completely differently in different environments. A field health worker using an app in a clinic is a different user than one in a rural village with poor connectivity.

### 2. What People Say vs. What They Do
Users will tell you they want feature X. Watch them use the product and they'll never touch it. Behavioural observation beats interviews alone.

### 3. The 5-User Rule Still Holds
You rarely need 20 interviews to find patterns. Five thoughtful sessions with the right users will surface 80% of your core insights.

## Tools I Rely On
- **Hotjar** for behavioural analytics
- **Fireflies AI** for interview transcription
- **Notion** for synthesis and affinity mapping

## Final Thought

Research is only as good as the decisions it informs. Document your insights, share them with your team, and — most importantly — act on them.`,
      publishedAt: "Mar 29, 2024",
      readTime: "5 min read",
      tags: ["User Research", "UX", "Process"],
      slug: "user-research-journey",
    },
    {
      title: "Mastering Information Architecture",
      excerpt: "A practical guide to structuring information for clarity and usability — from card sorting to site maps.",
      content: `## What Is Information Architecture?

Information Architecture (IA) is the practice of organising, structuring, and labelling content in a way that makes it easy for people to find what they need. It's the invisible skeleton of every good product.

## Why IA Gets Neglected

Most teams jump straight to wireframes and visuals. IA work — card sorting, tree testing, site mapping — feels slow and unsexy. But skipping it costs you later.

## My IA Process

### Step 1: Content Inventory
List everything that needs to live in the product. Be exhaustive.

### Step 2: Card Sorting
Give users (digital or physical) cards with content labels. Ask them to group related items. Their mental models will surprise you.

### Step 3: Tree Testing
Build a simple text-based prototype of your proposed structure. Ask users to find specific items. Where they get lost is where your IA breaks.

### Step 4: Site Map
Document the final structure as a site map before you start designing screens.

## Key Principles
- **Principle of objects** — Treat content as living things with their own behaviours
- **Principle of choices** — Keep choices limited and meaningful
- **Principle of disclosure** — Show just enough, not everything at once

## Closing

Great IA is invisible. Users never notice it — they just feel like the product makes sense. That's the goal.`,
      publishedAt: "Jan 12, 2024",
      readTime: "6 min read",
      tags: ["IA", "UX", "Structure"],
      slug: "mastering-information-architecture",
    },
  ],

  certifications: [
    { title: "Practical Accessibility for Designers", issuer: "LinkedIn Learning", date: "Oct 2024" },
    { title: "Interaction Design: Flow", issuer: "LinkedIn Learning", date: "Apr 2023" },
    { title: "UX Foundations: Storytelling", issuer: "LinkedIn Learning", date: "Apr 2023" },
    { title: "Google UX Design Professional Certificate", issuer: "Coursera / Google", date: "Jul 2022" },
  ],
};
