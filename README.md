# BYTE — TMU AI Club Website

The official website for **BYTE**, a student-run, open-source AI club at Toronto Metropolitan University. *Build Your Tech Experience.*

The site showcases the club's team, events, and projects, and includes a RAG-powered chatbot that answers questions about BYTE using a small internal knowledge base.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vite + React 18 + TypeScript + Tailwind CSS (single-page app, client-side routed) |
| Chatbot API | Vercel serverless function (`frontend/api/chat.ts`) using the OpenAI SDK, with a standalone Node server for local dev |
| RAG | Custom embeddings/retrieval over a local knowledge base (no external vector DB) |
| Analytics | `@vercel/analytics` |
| Email | EmailJS (contact form, event registration) |
| Deployment | Vercel |

## Project Structure

```
BYTE_site/
├── frontend/                  # Vite + React SPA (the whole site)
│   ├── src/
│   │   ├── components/        # Navbar, Hero, Team, Events, Projects, Modals, etc.
│   │   ├── pages/              # Home, Events, Projects, ProjectDetail, Team, News, Support, CyberSummit
│   │   ├── hooks/              # useInView, useKonamiCode
│   │   ├── lib/                # api.ts (data), types.ts, emailjs.ts, formRateLimit.ts, teamData.ts
│   │   ├── App.tsx             # routes
│   │   └── main.tsx            # entry point
│   ├── chatbot/                 # RAG chatbot logic, shared by api/chat.ts and local dev server
│   │   ├── ChatWidget.tsx       # floating chat UI
│   │   ├── server.js            # standalone Node server for local dev (mirrors api/chat.ts)
│   │   ├── embeddings.js        # builds the retrieval index, does similarity search
│   │   ├── chunks.js            # splits knowledge base into retrievable chunks
│   │   ├── knowledgebase.json   # BYTE facts/FAQ used for RAG context
│   │   ├── vector-cache.json    # cached embeddings
│   │   ├── rateLimit.js         # per-IP rate limiting
│   │   └── sanitizeHistory.js   # strips/validates chat history before sending to the model
│   ├── api/
│   │   └── chat.ts              # Vercel serverless function — production chat endpoint
│   ├── public/                  # static assets, member photos, event images
│   ├── vercel.json              # SPA rewrites + API routing
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── Claude files/                 # internal docs (CLAUDE.md, content export)
└── package.json                  # root-level, holds @vercel/analytics for the monorepo
```

## Pages

- **Home** (`/`) — hero, stats ticker, team preview, upcoming events, image carousel, featured projects, CTA
- **Events** (`/events`) — full events list
- **Projects** (`/projects`) / **Project detail** (`/projects/:slug`)
- **Team** (`/team`) — full team grid with role groupings (President, VPs, Leadership, Directors, Technical, Strategic)
- **News** (`/news`)
- **Support** (`/contact`) — contact form (EmailJS)
- **Cybersecurity Summit** (`/cybersecurity`) — event-specific landing page

A floating **chat widget** is available on every page.

## Getting Started

### Prerequisites
- Node.js
- An OpenAI API key (for the chatbot)
- EmailJS credentials (for the contact/registration forms)

### Setup

```bash
cd frontend
npm install
cp .env.example .env   # fill in the values below
```

`.env` variables:

```
GOOGLE_API_KEY=
OPENAI_API_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_CONTACT_TEMPLATE_ID=
VITE_EMAILJS_SUMMIT_TEMPLATE_ID=
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=
```

### Running locally

The chatbot needs its own server locally since Vite doesn't run serverless functions — run both in separate terminals:

```bash
npm run dev      # Vite dev server (http://localhost:5173)
npm run server   # chatbot API server (http://localhost:3001), proxied from Vite under /api
```

### Build

```bash
npm run build     # tsc -b && vite build
npm run preview   # preview the production build locally
```

## Deployment

Deployed on Vercel. `frontend/api/chat.ts` runs as a serverless function in production; `vercel.json` rewrites `/api/*` to the function and everything else to `index.html` for client-side routing.

## Notes

- The chatbot answers strictly from `chatbot/knowledgebase.json` — it won't speculate beyond that context and redirects out-of-scope questions to `hello@byte-tmu.ca`.
- `frontend/api/chat.ts` (production) and `frontend/chatbot/server.js` (local dev) share the same retrieval/prompt logic and should be kept in sync if one changes.
