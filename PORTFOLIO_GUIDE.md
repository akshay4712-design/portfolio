# Portfolio Management Guide
**Mangesh Shinde — mangeshux.in**

---

## Quick Links

| What | URL |
|------|-----|
| Portfolio (live) | https://www.mangeshux.in |
| Sanity Studio (blog CMS) | https://www.mangeshux.in/studio |
| GitHub Repository | https://github.com/akshay4712-design/portfolio |
| Vercel Dashboard | https://vercel.com/akshay4712-7934s-projects/portfolio |
| Google Analytics | https://analytics.google.com (Property: G-FPZ7MBT2ZS) |
| Google Search Console | https://search.google.com/search-console |
| Sanity Project Dashboard | https://www.sanity.io/manage/project/phzu770t |

---

## 1. Add / Edit / Remove a Blog Post

All blog content is managed through **Sanity Studio** — no code changes needed.

1. Go to https://www.mangeshux.in/studio
2. Log in with your Sanity account
3. Click **Post** in the left sidebar

**To add a post:**
- Click **+ New document**
- Fill in: Title, Slug (auto-generated), Excerpt, Published At, Cover Image, Tags, Content
- Click **Publish**

**To edit a post:**
- Click the post → make changes → click **Publish**

**To remove a post:**
- Click the post → click the three-dot menu (⋮) → **Delete**

> Changes are live immediately after publishing. No deployment needed.

---

## 2. Change Password for Protected Case Studies

The password is set as an environment variable in Vercel.

**Current default password:** `Design@mangeshux`

**To change it:**

1. Go to https://vercel.com/akshay4712-7934s-projects/portfolio/settings/environment-variables
2. Find `CASE_STUDY_PASSWORD` (if not set, the default above is used)
3. Click **Edit** → enter the new password → **Save**
4. Go to **Deployments** → click **Redeploy** on the latest production deployment

**Or via terminal (from any machine with Vercel CLI):**
```bash
npx vercel env add CASE_STUDY_PASSWORD
# Enter your new password when prompted
npx vercel --prod
```

Protected case studies: **Provus CPQ** and **PSA**

---

## 3. Check Analytics

1. Go to https://analytics.google.com
2. Select the **mangeshux.in** property
3. Key reports:
   - **Realtime** — who's on the site right now
   - **Reports → Acquisition** — how visitors find you (Google, LinkedIn, direct)
   - **Reports → Engagement → Pages** — which pages/case studies get most views

**Measurement ID:** `G-FPZ7MBT2ZS`

---

## 4. Update Portfolio Content (Case Studies, Bio, Skills)

All static content lives in one file in the GitHub repo:

```
src/data/portfolio.ts
```

**To edit from another machine:**

Option A — Edit directly on GitHub:
1. Go to https://github.com/akshay4712-design/portfolio
2. Navigate to `src/data/portfolio.ts`
3. Click the pencil icon (Edit)
4. Make your changes → **Commit changes**
5. Vercel will auto-deploy within ~1 minute

Option B — Clone and run locally:
```bash
git clone https://github.com/akshay4712-design/portfolio.git
cd portfolio
npm install
npm run dev       # → http://localhost:3000
```
Edit `src/data/portfolio.ts`, then:
```bash
git add src/data/portfolio.ts
git commit -m "Update content"
git push
```
Vercel auto-deploys on every push to `main`.

---

## 5. Custom Domain / Vercel Settings

**Current domain:** `mangeshux.in` (registered at GoDaddy)

**DNS records set at GoDaddy:**
| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

**To add a new domain or change domain:**
1. Go to https://vercel.com/akshay4712-7934s-projects/portfolio/settings/domains
2. Add the new domain and follow Vercel's DNS instructions

**To deploy manually from terminal:**
```bash
npx vercel --prod
```

---

## 6. Google Search Console

Use this to monitor Google indexing and search performance.

1. Go to https://search.google.com/search-console
2. Select property: `https://www.mangeshux.in`
3. Key sections:
   - **Performance** — search queries people use to find you
   - **URL Inspection** — check if a specific page is indexed
   - **Sitemaps** — sitemap is already submitted at `https://www.mangeshux.in/sitemap.xml`

**To request Google to re-index a page after updates:**
- Go to URL Inspection → enter the URL → **Request Indexing**

---

## 7. Environment Variables Reference

These are set in Vercel and never committed to GitHub.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Production URL (`https://www.mangeshux.in`) |
| `CASE_STUDY_PASSWORD` | Password for Provus CPQ & PSA (default: `Design@mangeshux`) |
| `RESEND_API_KEY` | Email service for contact form |
| `CONTACT_EMAIL` | Email address that receives contact form submissions |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `phzu770t` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

---

## 8. Tech Stack Reference

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | Sanity (project ID: `phzu770t`) |
| Deployment | Vercel |
| Analytics | Google Analytics 4 |
| Domain | GoDaddy → mangeshux.in |
| Repo | GitHub → akshay4712-design/portfolio |

---

*Last updated: April 2026*
