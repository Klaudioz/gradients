# Cloudflare Analytics Setup

Secure guide to add Cloudflare Web Analytics to your gradient app using environment variables.

## Step 1: Get Analytics Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Analytics & Logs** → **Web Analytics**
2. Click **Add a site**
3. Enter your hostname (e.g., `gradients.klaudioz.workers.dev`)
4. Click **Done**
5. Click **Manage site** and copy your token from the JS snippet

## Step 2: Configure Token Securely

**🔒 Security Best Practice**: Never hardcode tokens in your source code!

Run the setup script to configure the token as an environment variable:

```bash
npm run setup-analytics
```

This will:
- Store the token as `CLOUDFLARE_BEACON_TOKEN` environment variable
- Use HTMLRewriter to inject the token at runtime
- Keep your source code clean and secure

## Step 3: Deploy

```bash
npm run deploy
```

## How It Works

1. **HTMLRewriter**: The Worker uses Cloudflare's HTMLRewriter to inject the analytics token at runtime
2. **Environment Variable**: Token is stored in `wrangler.jsonc` as `CLOUDFLARE_BEACON_TOKEN`
3. **Secure Injection**: Token is never exposed in source code or client-side bundles

## Alternative: Manual Configuration

For production deployments, you can also set the environment variable directly:

```bash
# Using Wrangler CLI
wrangler secret put CLOUDFLARE_BEACON_TOKEN

# Or in Cloudflare Dashboard
# Workers & Pages → Your Worker → Settings → Environment Variables
```

## Verify Working

- Visit your site
- Check **Cloudflare Dashboard** → **Analytics & Logs** → **Web Analytics**
- Data appears within 2-5 minutes

## Security Benefits

✅ **No hardcoded secrets** in source code  
✅ **Runtime injection** via HTMLRewriter  
✅ **Environment variable** management  
✅ **Safe for version control**  

That's it! 🎉🔒