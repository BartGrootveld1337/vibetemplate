# ⚡ Vibe Coding Template

A modern full-stack template with **Next.js 16** and **Supabase**, optimized for AI-assisted development.

[![CI](https://github.com/YOUR_USERNAME/vibe-coding-template/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/vibe-coding-template/actions/workflows/ci.yml)

## 🚀 Quick Start

```bash
# 1. Use this template on GitHub, then clone your repo

# 2. Run setup script
./setup.sh

# 3. Start development
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## ✨ Features

- **⚡ Next.js 16** — App Router, Server Components, Turbopack
- **🔐 Authentication** — Email/password + OAuth (Google, GitHub)
- **🗄️ Database** — PostgreSQL via Supabase with type-safe queries
- **🎨 Styling** — Tailwind CSS 4 + shadcn/ui components
- **🤖 AI-Ready** — AGENTS.md + Cursor rules for vibe-coden
- **📝 TypeScript** — Strict mode with generated database types
- **✅ Testing** — Vitest + Playwright ready
- **🚀 Deployment** — Vercel-optimized

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js pages and API routes
│   ├── components/       # React components
│   ├── lib/              # Utilities and Supabase clients
│   └── hooks/            # Custom React hooks
├── supabase/
│   └── migrations/       # Database migrations
├── AGENTS.md             # AI agent instructions
└── .cursor/rules/        # Cursor IDE rules
```

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm test` | Run tests |
| `make db-new name=xxx` | Create database migration |
| `make db-push` | Apply migrations |

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

Get these from your [Supabase Dashboard](https://supabase.com/dashboard/project/_/settings/api).

### OAuth Setup

See [docs/AUTH_SETUP.md](docs/AUTH_SETUP.md) for configuring Google, GitHub, and other OAuth providers.

## 🤖 AI-Assisted Development

This template is designed for "vibe-coden" with AI assistants:

- **AGENTS.md** — Instructions for AI coding agents (works with Claude, Cursor, Copilot, etc.)
- **.cursor/rules/** — Context-aware rules for Cursor IDE
- **Nested AGENTS.md** — Specific instructions in each directory

## 📚 Documentation

- [Auth Setup Guide](docs/AUTH_SETUP.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Architecture Overview](docs/ARCHITECTURE.md)

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com/new)
3. Add environment variables
4. Deploy!

### Other Platforms

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for other options.

## 📝 License

MIT — use this template for anything!

---

Built with ❤️ for the vibe-coden community
