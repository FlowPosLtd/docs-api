# CLAUDE.md

This repo is the FlowPOS docs site: a static React + Vite app, no backend.

- `/` — the home page (`src/pages/LandingPage.tsx`)
- `/api/...` — the API reference (`src/data/resources/`, `src/pages/`, `src/components/Layout.tsx`). Old root links like `/orders` redirect to `/api/orders`.
- `/blogs/...` — the blog. Every post is a Markdoc file in `src/content/blog/`; the file name is the URL.

Build links with `apiPath()` / `blogPath()` from `src/utils/paths.ts`, never hard-coded paths.

```bash
npm install
npm run dev        # local preview
npm run build      # type-check + production build — run before every PR
npm run new-post   # start a blog post from the template
```

## Writing a blog post

When someone asks you to write, draft or add a blog post, do all of this:

1. **Ask for the author's name before writing anything.** Run `git config user.name` and suggest that value: *"Who should the post be by? Your git name is **<name>** — use that?"* Wait for the answer. Never pick or invent a name yourself. The post shows it as **"By <name> · FlowPOS"**.
2. If they haven't said, also ask who it's for (`businesses`, `developers` or `everyone`) and what it should cover.
3. Start from an up-to-date `main` and a new branch: `git checkout main && git pull && git checkout -b blog/<slug>`.
4. Create the file with `npm run new-post` (it asks the same questions), or copy `src/content/blog/_TEMPLATE.md` to `src/content/blog/<slug>.md` and fill in the front matter:
   ```yaml
   ---
   title: Introducing fulfillment pipelines
   description: One sentence on what the reader gets out of it.
   date: 2026-10-27            # yyyy-mm-dd, the day it goes live
   author: Sam Smith
   audience: businesses        # businesses | developers | everyone
   tags: [orders, fulfillment]
   ---
   ```
5. Write the body:
   - No `# Title`: the page shows the title. Start sections at `##`.
   - Plain, friendly English with short paragraphs and a concrete example for each idea.
   - Posts for businesses use no API or code words. Developer posts can use `{% code-panel %}`.
   - `{% callout type="info|warning|danger|success" title="…" %}…{% /callout %}` is available.
   - Only describe features that exist. Check the API reference in this repo, and ask if unsure.
6. Run `npm run build`, and preview with `npm run dev` at `/blogs/<slug>`.
7. Commit (`Blog: <title>`), push the branch, and **open a pull request to `main`**. Put the author's name in the PR description. The post goes live when the PR is merged.

Files starting with `_` in `src/content/blog/` are never published.
