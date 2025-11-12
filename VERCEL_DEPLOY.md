# Vercel Deployment Instructions

## Quick Deploy

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Vite configuration

3. **Set Environment Variable** (IMPORTANT)
   - In Vercel dashboard, go to: Settings → Environment Variables
   - Add: `VITE_SITE_URL` = `https://your-app-name.vercel.app`
   - Click "Redeploy" after adding the variable

## That's it! Your site will be live at `https://your-app-name.vercel.app`

---

## Manual Build Test (Optional)

Test locally before deploying:
```bash
npm run build
npm run preview
```

## Troubleshooting

- **404 on routes**: Already fixed with `vercel.json` rewrites
- **Build fails**: Check that all dependencies are in `package.json`
- **Site URL error**: Make sure to set `VITE_SITE_URL` in Vercel environment variables
