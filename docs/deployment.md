# Deployment

## GitHub Pages with Custom Domain

The site deploys to **shaders.guinetik.com** via GitHub Pages.

### Deploy

```bash
npm run deploy
```

This builds the app and pushes the `dist/` output to the `gh-pages` branch.

### DNS Setup

Add a **CNAME** record for your domain:

| Type | Name   | Value                    |
|------|--------|--------------------------|
| CNAME| shaders| \<username\>.github.io   |

Replace `<username>` with your GitHub username or org.

### GitHub Repository Settings

1. **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `gh-pages` / `/(root)`
4. **Custom domain:** `shaders.guinetik.com` (optional; CNAME file in `public/` also configures this)

### Build Output

- `public/CNAME` is copied to the build root so GitHub Pages serves the custom domain.
- `base: '/'` in Vite config since the site is served from the root of the custom domain.
