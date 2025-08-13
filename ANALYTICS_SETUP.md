# Cloudflare Analytics Setup

Simple guide to add Cloudflare Web Analytics to your gradient app.

## Step 1: Get Analytics Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Analytics & Logs** → **Web Analytics**
2. Click **Add a site**
3. Enter your hostname (e.g., `gradients.klaudioz.workers.dev`)
4. Click **Done**
5. Click **Manage site** and copy your token from the JS snippet

## Step 2: Add Token to HTML

Replace `YOUR_CLOUDFLARE_BEACON_TOKEN_HERE` in `/public/index.html` (line 10) with your actual token.

## Step 3: Deploy

```bash
npm run deploy
```

## Verify Working

- Visit your site
- Check **Cloudflare Dashboard** → **Analytics & Logs** → **Web Analytics**
- Data appears within 2-5 minutes

That's it! 🎉