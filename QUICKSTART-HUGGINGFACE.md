# 🚀 Focus Planner — Quick Start with HuggingFace (Free, No Credit Card)

Complete, production-ready web app using **100% free HuggingFace API**.

---

## 📦 What You Got

✅ Live financial calculator (FI, runway, years to goal)
✅ FDE/agentic DevOps role insights
✅ Visa rule tracker for 8+ countries
✅ Job board search links
✅ **HuggingFace AI integration** (free, no credit card)
✅ Mobile-responsive design
✅ Ready to deploy (GitLab, Vercel, Docker, self-hosted)

---

## ⚡ 5-Minute Setup

### Step 1: Download Files (1 min)

Download these files:
- `package-huggingface.json` → rename to `package.json`
- `pages-index.jsx` → put in `pages/` folder, rename to `index.js`
- `pages-api-search-huggingface.js` → put in `pages/api/`, rename to `search.js`
- `pages-api-jobs.js` → put in `pages/api/`
- `pages-api-visa-tracker.js` → put in `pages/api/`
- `styles-index.module.css` → put in `styles/`, rename to `index.module.css`
- `next.config.js`
- `.env.local-huggingface.example` → copy to `.env.local`
- `.gitignore`
- `.gitlab-ci.yml`
- `Dockerfile`

**Folder structure:**
```
focus-planner/
├── pages/
│   ├── index.js
│   └── api/
│       ├── search.js           (from pages-api-search-huggingface.js)
│       ├── jobs.js
│       └── visa-tracker.js
├── styles/
│   └── index.module.css
├── package.json
├── next.config.js
├── .env.local                  (from .env.local-huggingface.example)
├── .gitignore
├── .gitlab-ci.yml
└── Dockerfile
```

### Step 2: Get Free HuggingFace API Key (2 min)

1. Go to https://huggingface.co
2. Click **"Sign Up"** (free, no credit card)
3. Verify email
4. Go to https://huggingface.co/settings/tokens
5. Click **"New token"**
   - Name: `focus-planner`
   - Type: **Read access**
   - Click **"Create token"**
6. **Copy the token** (starts with `hf_`)

### Step 3: Add API Key to Your App (1 min)

Edit `.env.local` (in your project root):

```
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Paste your token from Step 2.

### Step 4: Install & Test (1 min)

```bash
# In the focus-planner folder:
npm install
npm run dev

# Open http://localhost:3000 in your browser
```

Click any **"Get latest..."** button and wait 5-15 seconds for response.

### Step 5: Deploy to GitLab (Free, Auto-deploys)

```bash
# Create repo on https://gitlab.com

cd focus-planner
git init
git add .
git commit -m "Initial commit"
git remote add origin https://gitlab.com/your-username/focus-planner.git
git push -u origin main

# Go to your GitLab project → Settings → CI/CD → Variables
# Add: HUGGINGFACE_API_KEY = hf_xxxxx...
# Mark as "Protected"

# Your site is live at:
# https://your-username.gitlab.io/focus-planner
```

**Done!** Your app is live. 🎉

---

## 🔄 How It Works

**Your app → HuggingFace API → Llama-2 AI Model → Response**

- **No payment required:** 30,000 free requests/month
- **No credit card:** Completely free
- **Speed:** 5–30 seconds per response (free tier is slower)
- **Quality:** Good (Llama-2 is solid, not as good as Claude but sufficient)

---

## ⚠️ Important: Response Times

| Speed | What's Happening |
|-------|------------------|
| 5–10 sec | Model is ready, response is quick |
| 10–20 sec | Model is responding, slightly busy |
| 20–30 sec | Free tier is busy, normal for free |
| 30+ sec / Timeout | Model is overloaded, try again in 30 sec |

**This is normal.** Free tier is slower than paid APIs, but it works!

---

## 📊 Next Steps

### This week:
- [ ] Download all files
- [ ] Get HuggingFace API key
- [ ] Setup `.env.local`
- [ ] Test locally (`npm run dev`)
- [ ] Deploy to GitLab

### This month:
- [ ] Enter your financial numbers
- [ ] Research FDE roles in your target industry
- [ ] Pick a country (Germany? Japan? USA?)
- [ ] Start learning the language

### Next 6 months:
- [ ] Build 2-3 public GitHub projects (proof of skill)
- [ ] Get a cloud certification (AWS, Azure, CKA)
- [ ] Network with engineers in target country
- [ ] Apply to FDE roles abroad

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "HUGGINGFACE_API_KEY not found" | Check `.env.local` has the key, restart `npm run dev` |
| Response takes 30+ seconds | Free tier is busy, try again in 30 sec |
| "Request timeout" | Model overloaded, retry after 30 seconds |
| Empty response | Try a different question, or retry |
| "Rate limited" | You hit 30k/month limit. Wait until next month or upgrade. |

See **HUGGINGFACE-SETUP.md** for detailed troubleshooting.

---

## 🚀 Deploy Options

### GitLab Pages (Easiest, Recommended)
- Free
- Auto-deploys on every push
- No configuration needed
- Your URL: `https://your-username.gitlab.io/focus-planner`

### Vercel (Also Easy)
- Push to GitHub
- Go to https://vercel.com/new
- Connect repo, add `HUGGINGFACE_API_KEY` as env var
- Deploy
- Your URL: `https://focus-planner-xxx.vercel.app`

### Self-Hosted (Docker)
```bash
docker build -t focus-planner .
docker run -e HUGGINGFACE_API_KEY=hf_xxx -p 3000:3000 focus-planner
# Access at http://localhost:3000
```

See **DEPLOYMENT.md** for more options.

---

## 📝 File Checklist

- [x] `package.json` (updated for HuggingFace)
- [x] `pages/index.js` (main React app)
- [x] `pages/api/search.js` (HuggingFace integration)
- [x] `pages/api/jobs.js` (job board links)
- [x] `pages/api/visa-tracker.js` (visa rules)
- [x] `styles/index.module.css` (styling)
- [x] `next.config.js` (Next.js config)
- [x] `.env.local` (add your HF key here)
- [x] `.gitignore` (ignore .env.local, node_modules, etc.)
- [x] `.gitlab-ci.yml` (auto-deploy on GitLab)
- [x] `Dockerfile` (for Docker deployment)

---

## 🎯 You're Ready!

1. **Download files** (all marked "updated" below)
2. **Get HF key** (https://huggingface.co/settings/tokens)
3. **Setup .env.local** (paste your key)
4. **Run locally:** `npm install && npm run dev`
5. **Deploy:** Push to GitLab or Vercel

**Your free, live, production-ready career planner is ready to go!** 🚀

---

## 📚 Updated Files to Download

See the list below. All are ready. Download, organize, and you're done.

**Last updated:** Oct 10, 2026
