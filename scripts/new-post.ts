/**
 * Start a blog post: asks for the title, your name (suggesting your git
 * user name), who it's for and some tags, then writes
 * src/content/blog/<slug>.md from the template.
 *
 *   npm run new-post
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const BLOG_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "content", "blog");
const AUDIENCES = ["businesses", "developers", "everyone"];

const gitUserName = () => {
  try {
    return execSync("git config user.name", { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
};

const slugify = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Read answers line by line rather than with rl.question(), which drops
// lines when the answers are piped in (e.g. by a script or an agent).
const rl = createInterface({ input: process.stdin });
const lines = rl[Symbol.asyncIterator]();
const ask = async (question: string, suggestion = "") => {
  process.stdout.write(suggestion ? `${question} (${suggestion}): ` : `${question}: `);
  const { value, done } = await lines.next();
  if (!process.stdin.isTTY) process.stdout.write("\n");
  return (done ? "" : String(value).trim()) || suggestion;
};

const title = await ask("Title");
if (!title) {
  console.error("A post needs a title.");
  process.exit(1);
}

const author = await ask("Your name, shown as \"By <name> · FlowPOS\"", gitUserName());
if (!author) {
  console.error("A post needs an author name.");
  process.exit(1);
}

let audience = await ask(`Who is it for? ${AUDIENCES.join(" / ")}`, "businesses");
if (!AUDIENCES.includes(audience)) audience = "everyone";

const description = await ask("One-line description");
const tags = (await ask("Tags, comma separated", ""))
  .split(",")
  .map((t) => t.trim().toLowerCase())
  .filter(Boolean);
const slug = await ask("URL (/blogs/...)", slugify(title));
rl.close();

const file = join(BLOG_DIR, `${slug}.md`);
if (existsSync(file)) {
  console.error(`${file} already exists. Pick another URL.`);
  process.exit(1);
}

const template = readFileSync(join(BLOG_DIR, "_TEMPLATE.md"), "utf8");
const body = template.replace(/^---\n[\s\S]*?\n---\n/, "");
const today = new Date().toISOString().slice(0, 10);
const quote = (v: string) => (/[:#]/.test(v) ? JSON.stringify(v) : v);

writeFileSync(
  file,
  [
    "---",
    `title: ${quote(title)}`,
    `description: ${quote(description)}`,
    `date: ${today}`,
    `author: ${quote(author)}`,
    `audience: ${audience}`,
    `tags: [${tags.join(", ")}]`,
    "---",
    body,
  ].join("\n"),
);

console.log(`\nCreated ${file}`);
console.log(`It will be at /blogs/${slug}. Write it, run \`npm run dev\` to preview, then open a pull request to main.`);
