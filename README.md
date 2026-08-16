# Personal Portfolio — Adrian Salinas

Personal portfolio site built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. All content lives in one data file, so the whole site can be updated without touching component code.

Laid out as a single 660px reading column on a hatched page rail — profile header, then Professional Experience, Proof of Work, Currently Building, GitHub Contributions, Hackathons & Awards, Stack, Certifications, and Education. Dark by default with a light toggle (a circular view-transition wipe out of the toggle button). Design tokens and layout rules are in [DESIGN.md](DESIGN.md).

Two live pieces: a **RAG chatbot** grounded in the portfolio content, and a **GitHub contribution heatmap** scraped from the public profile.

## Stack

- **Next.js 16 (App Router)** + **React 18** + **TypeScript**
- **Tailwind CSS** for styling, **Framer Motion** for animation
- **Vercel AI SDK** (`ai`, `@ai-sdk/google`) powering the chatbot on Gemini
- **Recharts**, **tsparticles**, **react-parallax-tilt** for the visual layer
- **next-themes** for dark/light mode

## Project Structure

- `src/data/index.ts` — **single source of truth**: bio, experience, projects, currently-building, skills, education, certifications. Edit here to change site content.
- `src/lib/rag.ts` — builds the retrieval corpus from `portfolioData` and scores it with BM25 (plus plural stemming and a domain synonym map). No embedding service or vector store; swap `retrieve()` for vector search later without touching callers.
- `src/app/` — App Router pages plus API routes:
  - `api/chat/` — streaming chatbot: retrieves the top chunks for the question, injects them as context, and streams a Gemini reply. Answers general/off-topic questions from the model's own knowledge instead of refusing.
  - `api/contact/` — contact form handler: sends messages via [Resend](https://resend.com).
  - `api/github/` — reads the contribution calendar (no token required). Revalidates every 60s, so new pushes appear about a minute after they land.
  - `certifications/` — certifications page
- `src/components/profile/` — **the live page**: `TopBar`, `ThemeToggle`, `ProfileHeader`, `ExperienceList`, `WorkGrid`, `BuildingNow`, `GithubHeatmap`, `HackathonList`, `StackGrid`, `CredentialsList`, `EducationList`, `ConnectFooter`, plus shared `Section` / `Tag` / `PillLink` primitives
- `src/components/` — `ChatbotWidget` and `ThemeProvider`
- `src/lib/` — shared hooks and utilities
- `public/` — images, resume PDF, and static assets
- `DESIGN.md` — design system notes

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Required for the AI chatbot (`/api/chat`) |
| `RESEND_API_KEY` | Required for the contact form (`/api/contact`) |
| `CONTACT_TO_EMAIL` | Optional. Inbox for form submissions (defaults to the email in `src/data/index.ts`) |
| `CONTACT_FROM_EMAIL` | Optional. Sender address. Use `Adrian Salinas <onboarding@resend.dev>` for local dev; verify your own domain in Resend for production |
| `GITHUB_TOKEN` | Optional, and **not currently needed**. The heatmap scrapes the public profile page, which already includes private contributions because *Settings → Profile → "Include private contributions on my profile"* is enabled. Set a `read:user` token only if that setting is ever turned off — `/api/github` will then use the GraphQL API instead. |

Without `GEMINI_API_KEY` the site renders fine, but the chatbot endpoint returns a 500 with a clear message. Without `RESEND_API_KEY` the contact form shows a friendly error.

### Resend setup

1. **Quick dev test** — create a free API key at [resend.com](https://resend.com), set `RESEND_API_KEY` in `.env.local`, and keep `CONTACT_FROM_EMAIL=Adrian Salinas <onboarding@resend.dev>`. Resend only delivers to the email on your Resend account during testing.
2. **Production** — add a custom domain to Vercel, then install the integration:

   ```bash
   vercel integration add resend/resend-email -m domain=yourdomain.com -m region=us-east-1 --plan free
   ```

   Verify the domain in the Resend dashboard (DNS records), then set `CONTACT_FROM_EMAIL=Adrian Salinas <hello@yourdomain.com>` in Vercel env vars.

> **Model pinning:** the chat route pins `gemini-3.6-flash`. Google retires Gemini models aggressively — `gemini-2.0-flash` and `gemini-2.5-flash` both now return "no longer available" on this key. Check the [ListModels endpoint](https://generativelanguage.googleapis.com/v1beta/models) before changing it.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Deployment

Deployed on [Vercel](https://vercel.com). Set `GEMINI_API_KEY` in the project's environment variables before deploying.
