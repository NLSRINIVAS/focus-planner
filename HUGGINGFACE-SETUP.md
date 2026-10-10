# 🤗 HuggingFace Free API Setup Guide

Use free HuggingFace Inference API instead of Anthropic Claude. **Completely free**, but with some limitations.

---

## ✅ What You Get (Free)

- **30,000 requests/month** (enough for 1,000 uses/day)
- **No credit card required**
- **Instant API key**
- **Meta Llama-2-7b-chat model** (decent quality, free)
- Everything else in the app (FI calc, job searches, visa tracker)

## ⚠️ Limitations

| Aspect | Claude API | HuggingFace Free |
|--------|-----------|------------------|
| **Speed** | Fast (2–5 sec) | Slow (5–30 sec) |
| **Quality** | Excellent (latest info) | Good (general knowledge) |
| **Monthly requests** | Unlimited (pay per use) | 30,000 free |
| **Cost** | $0.01–0.02 per query | Free |
| **Uptime** | 99.9% | ~95% (sometimes busy) |

**Bottom line:** HuggingFace is **free and works well**, but responses are **slower** and sometimes **timeout** if the model is busy.

---

## 🚀 Setup (3 Steps)

### Step 1: Create HuggingFace Account

1. Go to https://huggingface.co
2. Click **"Sign Up"**
3. Email + password (or GitHub/Google login)
4. Verify email
5. Done!

### Step 2: Get API Key

1. Go to https://huggingface.co/settings/tokens
2. Click **"New token"**
3. Name it: `focus-planner`
4. Choose: **"Read"** access (that's all you need)
5. Click **"Create token"**
6. Copy the token (starts with `hf_`)

### Step 3: Add to Your App

```bash
# In your focus-planner folder:
cp .env.local-huggingface.example .env.local

# Edit .env.local and paste your token:
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 4: Use the HuggingFace API Route

Replace the original `pages/api/search.js` with `pages-api-search-huggingface.js`:

```bash
# Backup the old one
mv pages/api/search.js pages/api/search-old.js

# Copy the HuggingFace version
cp pages-api-search-huggingface.js pages/api/search.js
```

### Step 5: Test

```bash
npm install  # Install axios if not already
npm run dev

# Open http://localhost:3000
# Click "Get latest FDE market data" button
# Wait 5-15 seconds...
# You should see a response!
```

---

## 📊 Expected Behavior

### Fast response (5–10 sec):
```
🟢 Success!

FDE roles are exploding in 2026. Demand up 700% YoY, salary median $174k...
[More insights]
```

### Slow response (15–30 sec):
```
⏳ Loading... HuggingFace model is busy, please wait
[Response comes after 20–30 seconds]
```

### Error (Model Overloaded):
```
❌ Request timeout
HuggingFace free tier is busy. Try again in 30 seconds.
```

**This is normal.** Free tier is slower, but it works!

---

## 💡 Tips for Best Results

1. **Avoid peak hours:** Don't use during 12 PM–3 PM UTC (model is busiest)
2. **Be patient:** Responses take 5–30 seconds, not instant
3. **Check rate limits:** 30k requests/month = ~1,000/day. You won't hit this.
4. **Cache responses:** If you ask the same question twice, the app could cache results (future feature)

---

## 🔧 Troubleshooting

### "HUGGINGFACE_API_KEY not found"
```
✗ Check: Is HUGGINGFACE_API_KEY in your .env.local?
✗ Did you copy the token correctly?
✗ Did you restart npm run dev?
```

### "Rate limited"
```
✓ You've made too many requests (30k/month limit)
✓ Solution: Wait until next month, or upgrade to Anthropic ($5/month)
```

### "Request timeout"
```
✓ HuggingFace free tier is slow/overloaded
✓ Solution: Try again in 30 seconds
```

### "Empty response"
```
✓ Model returned nothing
✓ Solution: Try a different question, or try again
```

---

## 📈 Upgrade Options

### If you hit the 30k limit:
- **Option 1:** Wait until next month (limit resets)
- **Option 2:** Switch to Anthropic Claude ($5/month for unlimited)
- **Option 3:** Use HuggingFace paid Inference (cheap, faster)

### To upgrade to Claude:
```bash
# Get Claude API key from https://console.anthropic.com
# Add $5+ credit card payment
# Replace pages/api/search-huggingface.js with original search.js
# Update .env.local with ANTHROPIC_API_KEY
```

---

## ✅ Checklist

- [ ] HuggingFace account created
- [ ] API token generated
- [ ] Token copied to `.env.local`
- [ ] Original `pages/api/search.js` backed up
- [ ] `pages-api-search-huggingface.js` renamed to `search.js` in `pages/api/`
- [ ] `npm run dev` works locally
- [ ] "Ask Claude" buttons show responses (after 5–30 sec wait)

---

## 🎯 Next Steps

1. **Setup:** Follow the 5 steps above (5 minutes)
2. **Test locally:** `npm run dev` → Click "Get latest FDE market data" → Wait 10 sec
3. **Deploy:** Push to GitLab/Vercel (auto-deploys with HuggingFace key)
4. **Use:** Add your financial info, search jobs, check visa rules

---

## 📞 Questions?

| Problem | Solution |
|---------|----------|
| Slow responses | HuggingFace free tier is naturally slower (5–30 sec) |
| Timeouts | Retry after 30 seconds |
| Bad responses | Model has limitations; try rephrasing |
| Want faster? | Upgrade to Anthropic Claude ($5/mo) or HF Pro |

---

**You're all set!** Free, no credit card, no limits (within reason). 🚀

HuggingFace FTW! 🤗
