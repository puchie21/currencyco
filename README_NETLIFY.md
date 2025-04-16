# 🚀 SecureCurrency (Frontend Only)

This is a simplified frontend-only currency converter app using React + Vite + TailwindCSS. It uses the public [exchangerate.host](https://exchangerate.host) API directly in the browser and **does not require a backend or authentication**.

---

## 🌐 Deployment Instructions (Netlify)

### 1. Push to GitHub
Push your code (from `client/` folder) to GitHub.

### 2. Create a Netlify Site
- Go to [Netlify](https://netlify.com)
- Click "Add new site" > "Import from Git"
- Connect your GitHub repo

### 3. Configure Build Settings

Set these in the Netlify UI:

| Key              | Value           |
|------------------|-----------------|
| **Base directory** | `client`       |
| **Build command** | `npm run build` |
| **Publish directory** | `dist`       |

### 4. Add `netlify.toml` (optional but recommended)

Place this in the root of your project:

```toml
[build]
  base = "client"
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## ✅ Done!

Your site should now be live, fast, and serverless 🚀