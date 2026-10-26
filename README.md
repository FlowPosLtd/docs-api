# FlowPOS Docs

The FlowPOS documentation site: the home page, the API reference and the blog. It's a static React + Vite app; there's no backend.

| URL | What |
|---|---|
| `/` | Home page |
| `/api/...` | API reference (old links like `/orders` redirect to `/api/orders`) |
| `/blogs/...` | Blog |

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

## Writing a blog post

Anyone can write a post: it's a Markdown file and a pull request.

1. Branch from `main`: `git checkout main && git pull && git checkout -b blog/<short-name>`
2. Run **`npm run new-post`**. It asks for:
   - the title
   - **your name**, suggesting your git user name. The post shows it as **"By Your Name · FlowPOS"**.
   - who it's for (`businesses`, `developers` or `everyone`), a one-line description, and tags

   It then creates `src/content/blog/<url>.md`.
3. Write the post below the front matter:
   - Start sections with `##`, because the page shows the title itself.
   - Keep it plain and friendly, with an example for each idea.
   - Callouts and code panels work:
     ```
     {% callout type="info" title="Good to know" %}…{% /callout %}
     {% code-panel language="curl" label="Example" %}…{% /code-panel %}
     ```
4. Preview with `npm run dev` at `/blogs/<url>`, then run `npm run build`.
5. Commit, push, and **open a pull request to `main`**. The post goes live once it's merged.

The file name is the URL: `src/content/blog/fulfillment-pipelines.md` becomes `/blogs/fulfillment-pipelines`. Files starting with `_` (like `_TEMPLATE.md`) are never published.
