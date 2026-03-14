# Matrix360 Website - Deployment Checklist

## ✅ Pre-Deployment (Do Now)

- [ ] Have GitHub account (or create at github.com)
- [ ] Have Vercel account (free at vercel.com)
- [ ] Have domain access (matrix360consulting.matrixdirect.in)
- [ ] Vercel connected to matrix360consulting@gmail.com

---

## 🚀 Deploy to Vercel (10 minutes)

### Step 1: Push Code to GitHub (3 min)

```bash
# Inside matrix360-website directory
git init
git add .
git commit -m "Matrix360 website - initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/matrix360-website.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username

### Step 2: Import to Vercel (2 min)

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Paste: `https://github.com/YOUR_USERNAME/matrix360-website.git`
4. Click **"Import"**

### Step 3: Configure Project (2 min)

Vercel will auto-detect Next.js. You'll see:
- **Framework**: Next.js ✅
- **Root Directory**: ./ ✅
- **Build Command**: `npm run build` ✅

Just click **"Deploy"** - no changes needed!

### Step 4: Set Environment Variables (1 min)

In Vercel Dashboard → Project Settings → Environment Variables

Add:
```
NEXT_PUBLIC_API_URL = https://api.matrix360consulting.matrixdirect.in
NEXT_PUBLIC_SITE_URL = https://matrix360consulting.matrixdirect.in
```

Click **"Deploy"** button again.

### Step 5: Wait for Build (2 min)

Vercel will:
- Clone your repo
- Install dependencies
- Build Next.js site
- Deploy to global CDN
- Give you a live URL (something like `matrix360-website-xyz.vercel.app`)

---

## 🌐 Point Domain to Vercel (Next)

### Option A: Update Nameservers (Fastest)

1. **In Vercel Dashboard**
   - Go to Project Settings → Domains
   - Click **"Add Domain"**
   - Enter: `matrix360consulting.matrixdirect.in`
   - Vercel shows nameservers

2. **In Your Domain Provider** (GoDaddy, Route53, etc.)
   - Go to Domain Settings → Nameservers
   - Replace with Vercel's nameservers
   - Save

3. **Wait 24-48 hours** for DNS to propagate

### Option B: CNAME Record (Faster, if you can edit DNS)

1. **In Vercel Dashboard**
   - Project Settings → Domains
   - Add domain `matrix360consulting.matrixdirect.in`
   - It will show: `cname.vercel-dns.com`

2. **In Your DNS Provider**
   - Create CNAME record:
     ```
     Name: matrix360consulting
     Type: CNAME
     Value: cname.vercel-dns.com
     ```
   - Add verification TXT record shown in Vercel
   - Save

3. **Within 10-30 minutes**, domain will be live!

---

## ✅ Post-Deployment

- [ ] Site accessible at `matrix360consulting.matrixdirect.in` ✅
- [ ] All pages loading (homepage, pricing, dashboards)
- [ ] Forms submitting (they'll log to console for now)
- [ ] Mobile responsive on phone
- [ ] Share link with director/team

---

## 🔗 Next: Connect to Backend

Once deployed, update forms to send data to your API:

**File**: `app/enterprise-trial/page.tsx` (line ~46)

Replace:
```typescript
console.log('Form submitted:', formData)
```

With:
```typescript
const res = await fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
const data = await res.json()
```

Then create backend route at `app/api/leads/route.ts`

---

## 📲 Troubleshooting

### Site won't load after deploy
- Check Vercel build logs (Deployments tab)
- Verify no TypeScript errors: `npm run build` locally
- Clear cache: Hard refresh (Cmd+Shift+R on Mac)

### Domain not pointing correctly
- DNS propagation takes 24-48 hours
- Check with: `nslookup matrix360consulting.matrixdirect.in`
- Or visit: https://dnschecker.org

### Forms not working yet (Expected)
- Forms currently log to browser console
- Backend API integration comes next
- Check browser console (F12) to see form data

---

## 📞 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Project**: https://vercel.com/YOUR_USERNAME/matrix360-website
- **Build Status**: Vercel Dashboard → Deployments tab
- **Domain Settings**: Vercel Dashboard → Settings → Domains

---

## ⏱️ Timeline

| Step | Time | Status |
|------|------|--------|
| Push to GitHub | 3 min | Now |
| Import to Vercel | 2 min | Now |
| Configure | 2 min | Now |
| Build & Deploy | 2-3 min | Auto |
| **LIVE on vercel.app** | **9 min** | ✅ |
| DNS propagation | 24-48h | Parallel |
| **LIVE on your domain** | **24-48h** | ✅ |

---

## 🎉 Success Criteria

You'll know deployment succeeded when:
1. ✅ Vercel shows "READY" status (green checkmark)
2. ✅ Site loads at `vercel.app` domain
3. ✅ All pages render (click through homepage, dashboards, forms)
4. ✅ Mobile works on phone
5. ✅ Forms can submit (check browser console)

---

## 📞 Support

**If anything breaks:**
1. Check Vercel build logs
2. Run `npm run build` locally to catch errors
3. Check environment variables are set
4. Email: ramjit@matrixdirect.in

---

**Ready? Let's go!** 🚀

Start with Step 1 above. Should be live within 15 minutes.
