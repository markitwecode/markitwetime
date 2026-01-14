# Change: Deploy to Vercel

## Why
Running `npm run dev` every time to use the app isn't sustainable. Deploying to Vercel provides a permanent URL accessible from any device without running a local server.

## What Changes
- Initialize git repository
- Install Vercel CLI
- Deploy to Vercel (creates public URL)
- Add .gitignore for node_modules, dist, etc.

## Impact
- Affected specs: deployment (new capability)
- Affected code: .gitignore (new), no source code changes
