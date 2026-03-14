# Matrix 360 Website - Deployment Guide

## Quick Start (30 minutes to live)

### Prerequisites
- GitHub account (optional but recommended)
- Vercel account (matrix360consulting@gmail.com)
- Domain access (matrix360consulting.matrixdirect.in)

### Step 1: Get the Code
Option A (Recommended):
```bash
# Clone this repository
git clone [REPO_URL]
cd matrix360-website
```

Option B (If no Git):
```bash
# Extract the provided ZIP file
unzip matrix360-website.zip
cd matrix360-website
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Test Locally (5 minutes)
```bash
npm run dev
# Visit http://localhost:3000 in your browser
```

### Step 4: Deploy to Vercel

#### Option A: Via Vercel CLI (Fastest)
```bash
npm install -g vercel
vercel login
# Follow prompts, use matrix360consulting@gmail.com
vercel
# Select "matrix360-website" as project name
# Follow deployment prompts
```

#### Option B: Via GitHub + Vercel Dashboard
1. Push code to GitHub:
```bash
git remote add origin [YOUR_GITHUB_REPO]
git branch -M main
git push -u origin main
```

2. Go to https://vercel.com/dashboard
3. Click "Add New..." → "Project"
4. Select GitHub repository
5. Deploy (Vercel auto-configures Next.js)

#### Option C: Via Vercel Dashboard (Manual Upload)
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Click "Upload Zip" and select the project folder
4. Name it "matrix360-website"
5. Click "Deploy"

### Step 5: Connect Your Domain

After deployment, Vercel provides a deployment URL like:
`https://matrix360-website.vercel.app`

To point your domain (matrix360consulting.matrixdirect.in):

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your domain: `matrix360consulting.matrixdirect.in`

2. **In your Domain Provider (GoDaddy, Route53, Namecheap, etc.):**
   - Go to DNS settings
   - Add CNAME record:
     - Name: `www`
     - Value: `cname.vercel-dns.com`
   
   OR add A records (if CNAME not available):
     - Name: `matrix360consulting.matrixdirect.in`
     - Value: `76.76.19.165` (Vercel IP)

3. **Wait 5-15 minutes** for DNS to propagate

4. **Verify:** Visit `matrix360consulting.matrixdirect.in` in browser

### Environment Variables (If Needed)
Create `.env.local` in project root:
```
NEXT_PUBLIC_API_URL=https://api.matrix360.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## Project Structure
```
matrix360-website/
├── src/
│   ├── pages/           # Next.js pages
│   │   ├── index.tsx   # Homepage
│   │   ├── for-enterprises.tsx
│   │   ├── for-consultants.tsx
│   │   ├── pricing.tsx
│   │   ├── enterprise-signup.tsx
│   │   ├── consultant-onboarding.tsx
│   │   ├── strategy-room.tsx
│   │   └── enterprise-dashboard.tsx
│   ├── components/      # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── lib/            # Utilities and helpers
│   └── styles/         # CSS files
├── public/             # Static assets
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS config
└── package.json        # Dependencies
```

## Key Pages

### Public Pages (No Authentication)
- `/` - Homepage
- `/for-enterprises` - Enterprise value proposition
- `/for-consultants` - Consultant value proposition
- `/pricing` - Pricing tiers and feature comparison
- `/strategy-room` - Strategy Room feature overview

### Signup/Onboarding
- `/enterprise-signup` - Enterprise trial signup (FORM)
- `/consultant-onboarding` - Consultant profile creation (FORM)

### Dashboards (Sample/Demo)
- `/enterprise-dashboard` - Sample dashboard for enterprises
- `/consultant-dashboard` - Sample dashboard for consultants

### Additional
- `/about` - About Matrix 360
- `/contact` - Contact form
- `/login` - Login page

## Customization After Launch

### Update Logo
1. Replace `src/components/Header.tsx` logo div with your actual logo
2. Add logo image to `public/` folder
3. Import and use it

### Update Content
1. Edit pages in `src/pages/`
2. Run `npm run dev` to preview
3. Deploy changes: `vercel --prod`

### Add Analytics
1. Get Google Analytics ID
2. Add to `.env.local`: `NEXT_PUBLIC_GA_ID=UA-XXXXX-X`
3. Create `src/lib/analytics.ts` and integrate

## Performance & Optimization

Current Configuration:
- Image optimization: Enabled
- ESLint: Configured
- Tailwind CSS: Minified
- Build output: Optimized for Vercel

Expected Performance:
- Lighthouse Score: 90+
- First Contentful Paint: <2s
- Largest Contentful Paint: <2.5s

## Troubleshooting

### Build fails with "module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Domain not pointing to Vercel
- Check DNS propagation: https://dnschecker.org
- Wait 5-15 minutes for DNS updates to propagate
- Verify CNAME record is correct in domain provider

### Pages not updating after deploy
```bash
vercel --prod --force
```

### Environment variables not working
- Add to `.env.local` for local testing
- Add to Vercel Project Settings for production
- Restart local dev server: `npm run dev`

## Support

For Vercel deployment issues:
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

For Next.js questions:
- Next.js Docs: https://nextjs.org/docs

---

## Timeline
- Code ready: NOW
- Vercel deployment: 10-15 minutes
- DNS propagation: 5-15 minutes
- **Total to live: 20-30 minutes**

## Next Steps After Launch
1. Set up analytics (Google Analytics, PostHog)
2. Implement real authentication (Supabase, Auth0)
3. Connect backend API
4. Add real database (PostgreSQL, Firebase)
5. Implement lead capture forms to email
6. Set up email notifications
