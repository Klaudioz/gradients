import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// HTMLRewriter class to inject analytics token
class AnalyticsRewriter {
  constructor(token) {
    this.token = token;
  }

  element(element) {
    if (element.getAttribute('data-cf-beacon')) {
      // Replace the placeholder token with the actual token from environment variable
      const beacon = element.getAttribute('data-cf-beacon');
      const updatedBeacon = beacon.replace('YOUR_CLOUDFLARE_BEACON_TOKEN_HERE', this.token);
      element.setAttribute('data-cf-beacon', updatedBeacon);
    }
  }
}

export default {
  async fetch(request, env, ctx) {
    try {
      // Get the asset from KV storage
      const response = await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: ASSET_MANIFEST,
        }
      );

      // Only process HTML responses
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('text/html')) {
        // Get the analytics token from environment variable
        const analyticsToken = env.CLOUDFLARE_BEACON_TOKEN;
        
        if (analyticsToken && analyticsToken !== 'YOUR_CLOUDFLARE_BEACON_TOKEN_HERE') {
          // Use HTMLRewriter to inject the analytics token
          return new HTMLRewriter()
            .on('script[data-cf-beacon]', new AnalyticsRewriter(analyticsToken))
            .transform(response);
        }
      }

      return response;
    } catch (e) {
      // If asset is not found, return 404
      return new Response('Not Found', { status: 404 });
    }
  },
};