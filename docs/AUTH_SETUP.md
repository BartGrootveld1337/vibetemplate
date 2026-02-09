# Authentication Setup Guide

This guide explains how to configure authentication providers for your application.

## Email/Password Authentication

Email/password authentication works out of the box. No additional configuration needed.

## OAuth Providers

### Google

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Configure OAuth Consent Screen**
   - Navigate to APIs & Services → OAuth consent screen
   - Choose "External" user type
   - Fill in app name, support email, and developer contact
   - Add scopes: `email`, `profile`, `openid`

3. **Create OAuth Credentials**
   - Go to APIs & Services → Credentials
   - Click "Create Credentials" → "OAuth client ID"
   - Select "Web application"
   - Add authorized redirect URI:
     ```
     https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
     ```
   - Copy the Client ID and Client Secret

4. **Configure in Supabase**
   - Go to Supabase Dashboard → Authentication → Providers
   - Enable Google
   - Paste Client ID and Client Secret
   - Save

### GitHub

1. **Create a GitHub OAuth App**
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in:
     - Application name: Your app name
     - Homepage URL: `https://your-domain.com`
     - Authorization callback URL:
       ```
       https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
       ```

2. **Get Credentials**
   - Copy the Client ID
   - Generate a new Client Secret

3. **Configure in Supabase**
   - Go to Supabase Dashboard → Authentication → Providers
   - Enable GitHub
   - Paste Client ID and Client Secret
   - Save

### LinkedIn

1. **Create LinkedIn App**
   - Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
   - Create a new app
   - Add product: "Sign In with LinkedIn using OpenID Connect"

2. **Configure OAuth**
   - In Auth tab, add redirect URL:
     ```
     https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
     ```
   - Copy Client ID and Client Secret

3. **Configure in Supabase**
   - Enable LinkedIn provider
   - Paste credentials
   - Save

## URL Configuration

### Supabase Dashboard

1. Go to Authentication → URL Configuration
2. Set **Site URL**: `https://your-production-domain.com`
3. Add **Redirect URLs**:
   - `http://localhost:3000/callback` (development)
   - `https://your-domain.com/callback` (production)

### Environment Variables

Make sure `NEXT_PUBLIC_APP_URL` is set correctly:

```env
# Development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Testing Authentication

1. Start your development server: `pnpm dev`
2. Navigate to `/login`
3. Try email/password or OAuth login
4. Check the redirect to `/dashboard` after successful auth

## Troubleshooting

### "Invalid redirect URI"
- Verify the callback URL in your OAuth provider matches exactly
- Check both Supabase settings and provider settings

### "User not found after OAuth"
- Check if the `profiles` table trigger is working
- Verify RLS policies allow the insert

### "Session not persisting"
- Check middleware is properly refreshing the session
- Verify cookies are being set correctly

## Security Considerations

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client
- Always use HTTPS in production
- Enable email confirmation in production for email/password auth
- Regularly rotate OAuth client secrets
