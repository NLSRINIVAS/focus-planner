# 📥 Files to Download — HuggingFace Version

**All files you need for the Focus Planner app with free HuggingFace API.**

---

## 📋 Complete File List

### Configuration Files (Download As-Is)

| Download | Keep Name | Folder | Purpose |
|----------|-----------|--------|---------|
| `package-huggingface.json` | `package.json` | `/` (root) | Dependencies list |
| `next.config.js` | `next.config.js` | `/` (root) | Next.js config |
| `.gitignore` | `.gitignore` | `/` (root) | Git ignore rules |
| `.gitlab-ci.yml` | `.gitlab-ci.yml` | `/` (root) | Auto-deploy on GitLab |
| `Dockerfile` | `Dockerfile` | `/` (root) | Docker setup |

### Environment Template (Copy & Edit)

| Download | Rename To | Folder | What To Do |
|----------|-----------|--------|-----------|
| `.env.local-huggingface.example` | `.env.local` | `/` (root) | Edit & add your HF token |

### Frontend Files (Rename & Organize)

| Download | Rename To | Folder | Purpose |
|----------|-----------|--------|---------|
| `pages-index.jsx` | `index.js` | `/pages/` | Main React app |
| `pages-api-search-huggingface.js` | `search.js` | `/pages/api/` | HuggingFace AI integration |
| `pages-api-jobs.js` | `jobs.js` | `/pages/api/` | Job board links |
| `pages-api-visa-tracker.js` | `visa-tracker.js` | `/pages/api/` | Visa rules database |
| `styles-index.module.css` | `index.module.css` | `/styles/` | CSS styling |

### Documentation (Optional, For Reference)

| Download | Read | Why |
|----------|------|-----|
| `QUICKSTART-HUGGINGFACE.md` | Yes | 5-min setup guide (start here!) |
| `HUGGINGFACE-SETUP.md` | If having issues | Troubleshooting & tips |
| `README.md` | Optional | Full documentation |
| `DEPLOYMENT.md` | For deployment | Deploy to GitLab/Vercel/Docker |
| `FILES.md` | Reference | What each file does |

---

## 🎯 Step-by-Step Setup

### 1. Create Project Folder

```bash
mkdir focus-planner
cd focus-planner
```

### 2. Create Subfolders

```bash
mkdir pages pages/api styles
```

### 3. Download & Organize Files

**Root folder files:**
```bash
# Download these and save to focus-planner/
package.json               (from package-huggingface.json)
next.config.js
.gitignore
.gitlab-ci.yml
Dockerfile
.env.local                 (from .env.local-huggingface.example)
```

**pages/ folder:**
```bash
# Download pages-index.jsx and save as pages/index.js
pages/index.js
```

**pages/api/ folder:**
```bash
# Download these and save to pages/api/
pages/api/search.js                (from pages-api-search-huggingface.js)
pages/api/jobs.js
pages/api/visa-tracker.js
```

**styles/ folder:**
```bash
# Download styles-index.module.css and save as styles/index.module.css
styles/index.module.css
```

### 4. Edit `.env.local`

Open `.env.local` and add your HuggingFace API key:

```
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Get your key from: https://huggingface.co/settings/tokens

### 5. Install & Test

```bash
npm install
npm run dev

# Open http://localhost:3000
```

---

## 📂 Final Folder Structure

```
focus-planner/
├── pages/
│   ├── index.js                  ✓ (from pages-index.jsx)
│   └── api/
│       ├── search.js             ✓ (from pages-api-search-huggingface.js)
│       ├── jobs.js               ✓ (from pages-api-jobs.js)
│       └── visa-tracker.js       ✓ (from pages-api-visa-tracker.js)
│
├── styles/
│   └── index.module.css          ✓ (from styles-index.module.css)
│
├── package.json                  ✓ (from package-huggingface.json)
├── next.config.js                ✓
├── .env.local                    ✓ (from .env.local-huggingface.example)
├── .gitignore                    ✓
├── .gitlab-ci.yml                ✓
├── Dockerfile                    ✓
│
└── README.md, DEPLOYMENT.md, etc. (optional, for reference)
```

---

## 🚀 Deploy to GitLab

Once files are organized:

```bash
# Initialize Git
git init
git add .
git commit -m "Initial commit: Focus Planner with HuggingFace"
git remote add origin https://gitlab.com/your-username/focus-planner.git
git branch -M main
git push -u origin main

# Go to your GitLab project:
# Settings > CI/CD > Variables
# Add: HUGGINGFACE_API_KEY = hf_xxxxx...
# Mark as "Protected"

# Your site is live at:
# https://your-username.gitlab.io/focus-planner
```

---

## ✅ Download Checklist

**Configuration:**
- [ ] `package-huggingface.json` (rename to `package.json`)
- [ ] `next.config.js`
- [ ] `.gitignore`
- [ ] `.gitlab-ci.yml`
- [ ] `Dockerfile`
- [ ] `.env.local-huggingface.example` (rename to `.env.local`, edit with HF key)

**Pages:**
- [ ] `pages-index.jsx` (rename to `index.js`, put in `pages/`)

**API Routes:**
- [ ] `pages-api-search-huggingface.js` (rename to `search.js`, put in `pages/api/`)
- [ ] `pages-api-jobs.js` (put in `pages/api/`)
- [ ] `pages-api-visa-tracker.js` (put in `pages/api/`)

**Styles:**
- [ ] `styles-index.module.css` (rename to `index.module.css`, put in `styles/`)

**Docs (optional):**
- [ ] `QUICKSTART-HUGGINGFACE.md` (read for quick setup)
- [ ] `HUGGINGFACE-SETUP.md` (for troubleshooting)
- [ ] `README.md` (full documentation)
- [ ] `DEPLOYMENT.md` (for other deployment options)

---

## 💡 Tips

1. **Windows users:** Use forward slashes `/` in paths, or use Git Bash
2. **Mac/Linux users:** Standard terminal, all commands work as shown
3. **Rename carefully:** Don't include `.js` twice (e.g., `search.js.js`)
4. **Edit `.env.local`:** Never commit this file (it's in `.gitignore`)
5. **Test locally first:** `npm run dev` before deploying

---

## 🆘 Still Stuck?

1. **Setup help:** Read `QUICKSTART-HUGGINGFACE.md`
2. **API issues:** Read `HUGGINGFACE-SETUP.md`
3. **Deployment:** Read `DEPLOYMENT.md`
4. **General help:** Read `README.md`

---

**You're all set!** Download the files above, organize as shown, add your HF key, and you're ready to run. 🚀
