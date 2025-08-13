#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function updateAnalyticsToken(token) {
  try {
    // Update wrangler.jsonc with the token in vars
    const wranglerPath = path.join(__dirname, '..', 'wrangler.jsonc');
    let wranglerContent = fs.readFileSync(wranglerPath, 'utf8');
    
    // Parse and update the CLOUDFLARE_BEACON_TOKEN variable
    const wranglerConfig = JSON.parse(wranglerContent);
    if (!wranglerConfig.vars) {
      wranglerConfig.vars = {};
    }
    wranglerConfig.vars.CLOUDFLARE_BEACON_TOKEN = token;
    
    // Write back with proper formatting
    fs.writeFileSync(wranglerPath, JSON.stringify(wranglerConfig, null, 2));
    console.log('✅ Updated wrangler.jsonc with environment variable');

    console.log('\n🎉 Analytics configuration complete!');
    console.log('\nThe token is now stored as an environment variable and will be');
    console.log('securely injected at runtime using HTMLRewriter.');
    console.log('\nNext steps:');
    console.log('1. Run: npm run deploy');
    console.log('2. Visit your deployed site to generate analytics data');
    console.log('3. Check Cloudflare Dashboard > Analytics & Logs > Web Analytics');
    console.log('\n🔒 Security note: The token is stored as an environment variable,');
    console.log('not hardcoded in your HTML or source code.');
    
  } catch (error) {
    console.error('❌ Error updating files:', error.message);
    process.exit(1);
  }
}

function validateToken(token) {
  // Cloudflare beacon tokens are typically 32-character hex strings
  const tokenRegex = /^[a-f0-9]{32}$/i;
  return tokenRegex.test(token);
}

console.log('🔧 Cloudflare Analytics Setup');
console.log('================================\n');

rl.question('Enter your Cloudflare Web Analytics Beacon Token: ', (token) => {
  token = token.trim();
  
  if (!token) {
    console.log('❌ No token provided. Exiting.');
    rl.close();
    return;
  }
  
  if (!validateToken(token)) {
    console.log('❌ Invalid token format. Expected 32-character hex string.');
    console.log('Example: abc123def456...');
    rl.close();
    return;
  }
  
  console.log(`\n🔍 Token: ${token}`);
  
  rl.question('Confirm this token is correct? (y/N): ', (confirm) => {
    if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
      updateAnalyticsToken(token);
    } else {
      console.log('❌ Setup cancelled.');
    }
    rl.close();
  });
});

rl.on('close', () => {
  process.exit(0);
});