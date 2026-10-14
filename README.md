# Personal Portfolio: Adrian Salinas

Personal portfolio built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. All content lives in one data file, so the site can be updated without touching component code.

## What it looks like

- A fixed floating sidebar with grouped navigation and live item counts (Explore, Work with me, Portfolio). On phones and tablets it becomes a slim top bar with a slide-in menu.
- A centered 640px reading column. Light by default, with a dark toggle.
- **Home:** hero, Experience, Projects, Currently building, Tools I use, Stack, GitHub heatmap.
- **Pages:** About (photo carousel), Projects, Hackathons (timeline and details), Stack, Certifications, Recommendations, Affiliations, Resources, Gear, Links, Services, and a case study per project at `/work/[slug]`.
- A Contact popup (sidebar, mobile menu, and case-study pages), a "Ships this month" widget, and Lenis smooth scrolling (off for touch devices and reduced-motion users).

## Stack

- **Next.js 16 (App Router)**, **React 18**, **TypeScript**
- **Tailwind CSS 3**, **lucide-react** icons, **Framer Motion**, **Lenis**
- **next-themes** for light and dark
- **Resend** for the contact form
- **Vercel AI SDK** (`ai`, `@ai-sdk/google`) for the chat route

## Project structure

- `src/data/index.ts`: **single source of truth** for bio, experience, projects, hackathons, stack, tools, links, services, certifications. Edit here to change content.
- `src/app/`: App Router pages and API routes.
  - `api/contact/`: contact form handler, sends through [Resend](https://resend.com).
  - `api/chat/`: streaming chat route grounded in the portfolio content (retrieval in `src/lib/rag.ts`). The widget that called it is not mounted right now; the route and retrieval code are kept.
  - `api/github/`: reads the contribution calendar. Revalidates every 60s.
  - `work/[slug]/`: case-study pages.
- `src/components/profile/`: the live page components (`Sidebar` with its mobile menu, `ProfileHeader`, `ExperienceList`, `ProjectsPreview`, `HackathonList`, `HackathonTimeline`, `GithubHeatmap`, `ContactModal`, and so on).
- `src/lib/`: shared helpers (`rag.ts`, `hackathons.ts`, `utils.ts`).
- `src/app/globals.css`: color tokens (light and dark) and the few custom animations.
- `public/`: images, logos, and the resume PDF.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

### Environment variables

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Needed for the chat route (`/api/chat`) |
| `RESEND_API_KEY` | Needed for the contact form (`/api/contact`) |
| `CONTACT_TO_EMAIL` | Optional. Inbox for submissions (defaults to the email in `src/data/index.ts`) |
| `CONTACT_FROM_EMAIL` | Optional. Sender address. `Adrian Salinas <onboarding@resend.dev>` works for testing; verify your own domain in Resend for production |
| `GITHUB_TOKEN` | Optional and not currently needed. The heatmap reads the public profile page, which includes private contributions while *Settings, Profile, "Include private contributions on my profile"* is on. |

`.env.example` lists every name. Real values go in `.env.local`, which git ignores.

### Contact form troubleshooting

When a send fails, the visitor sees "Failed to send message", and the real reason is logged on the server as a `[contact]` line (Vercel: project, Logs, filter `/api/contact`).

- `API key is invalid` (401): the `RESEND_API_KEY` set on the host is wrong. Paste the working key with no quotes or spaces, make sure it is set for **Production**, then **redeploy**. Changed environment values only apply to new deployments.
- `You can only send testing emails to your own email address` (403): `onboarding@resend.dev` only delivers to the email on your Resend account. Set `CONTACT_TO_EMAIL` to that address, or verify your own domain in Resend and set `CONTACT_FROM_EMAIL`.
- `Email service is not configured`: `RESEND_API_KEY` is missing on the host.

### Resend setup

1. **Quick test:** create a free API key at [resend.com](https://resend.com), set `RESEND_API_KEY` in `.env.local`, and keep `CONTACT_FROM_EMAIL=Adrian Salinas <onboarding@resend.dev>`.
2. **Production:** add a custom domain, verify it in the Resend dashboard (DNS records), then set `CONTACT_FROM_EMAIL=Adrian Salinas <hello@yourdomain.com>` in the host's environment variables.

> **Model pinning:** the chat route pins a specific Gemini model. Google retires models often, so check the [ListModels endpoint](https://generativelanguage.googleapis.com/v1beta/models) before changing it.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Deployment

Deployed on [Vercel](https://vercel.com). Set the environment variables above for the Production environment before deploying, and redeploy after changing them.
