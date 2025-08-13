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
    // Update wrangler.jsonc
    const wranglerPath = path.join(__dirname, '..', 'wrangler.jsonc');
    let wranglerContent = fs.readFileSync(wranglerPath, 'utf8');
    wranglerContent = wranglerContent.replace(
      'YOUR_CLOUDFLARE_BEACON_TOKEN_HERE',
      token
    );
    fs.writeFileSync(wranglerPath, wranglerContent);
    console.log('✅ Updated wrangler.jsonc');

    // Update index.html
    const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    htmlContent = htmlContent.replace(
      'YOUR_CLOUDFLARE_BEACON_TOKEN_HERE',
      token
    );
    fs.writeFileSync(htmlPath, htmlContent);
    console.log('✅ Updated index.html');

    console.log('\n🎉 Analytics configuration complete!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run deploy');
    console.log('2. Visit your deployed site to generate analytics data');
    console.log('3. Check Cloudflare Dashboard > Analytics & Logs > Web Analytics');
    
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