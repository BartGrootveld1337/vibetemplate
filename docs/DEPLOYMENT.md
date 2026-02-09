# Deployment Guide

This guide covers deploying your application to various platforms.

## Vercel (Recommended)

Vercel is the creator of Next.js and provides the best deployment experience.

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Configure Environment Variables**
   Add these in Vercel's project settings:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-key
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click Deploy
   - Vercel builds and deploys automatically

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable
5. Update Supabase redirect URLs

## Netlify

### Steps

1. Push to GitHub/GitLab
2. Import in [Netlify](https://app.netlify.com/start)
3. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `.next`
4. Add environment variables
5. Deploy

Note: You may need `@netlify/plugin-nextjs` for full Next.js support.

## Railway

### Steps

1. Create account at [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Add environment variables
4. Railway auto-detects and deploys

## Self-Hosted (Docker)

### Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
docker build -t my-app .
docker run -p 3000:3000 --env-file .env.local my-app
```

## Database Migrations

Before deploying to production:

1. **Apply migrations**
   ```bash
   make db-push
   # or
   supabase db push
   ```

2. **Verify**
   ```bash
   make db-status
   ```

## Post-Deployment Checklist

- [ ] Environment variables set correctly
- [ ] Supabase redirect URLs updated for production domain
- [ ] OAuth providers configured for production URLs
- [ ] Database migrations applied
- [ ] SSL/HTTPS configured
- [ ] Error monitoring set up (optional: Sentry)
- [ ] Analytics configured (optional: Vercel Analytics, PostHog)

## Environment-Specific Configuration

### Development
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Preview/Staging
```env
NEXT_PUBLIC_APP_URL=https://staging.your-domain.com
```

### Production
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Monitoring

### Vercel Analytics

1. Enable in Vercel project settings
2. Add to layout:
   ```tsx
   import { Analytics } from '@vercel/analytics/react'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     )
   }
   ```

### Error Tracking (Sentry)

1. Install: `pnpm add @sentry/nextjs`
2. Run: `pnpm sentry-init`
3. Configure as prompted
