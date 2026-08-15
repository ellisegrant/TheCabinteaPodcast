// Runs after `vite build`. Vite/React only renders content in the browser, so
// crawlers that don't execute JS (Facebook, WhatsApp, X/Twitter, LinkedIn,
// iMessage, Slack, Discord…) never see per-page titles/images — every shared
// link falls back to whatever is in the raw index.html.
//
// This script takes the already-built dist/index.html (with its correct,
// hashed asset links) and writes a copy of it per route, swapping in that
// route's own title/description/image. Vercel serves a matching static file
// before it falls back to the SPA rewrite in vercel.json, so each route gets
// its own link-preview metadata while the app itself still boots and takes
// over client-side exactly as before.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { episodes, journalArticles } from "../src/data/episodes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const SITE_URL = "https://www.thecabintea.com";
const SITE_NAME = "Cabin Tea";
const DEFAULT_DESCRIPTION = "Africa's ocean podcast. Live conversations with the people shaping the continent's blue economy.";
const DEFAULT_IMAGE = "/podcast.jpg";

const staticPages = [
  { path: "/", title: "Cabin Tea — Sipping with the People Who Know the Sea", description: DEFAULT_DESCRIPTION, image: DEFAULT_IMAGE },
  { path: "/episodes", title: "Episodes — Cabin Tea", description: "Live conversations with the people shaping Africa's maritime future. Recorded in Accra, heard everywhere.", image: DEFAULT_IMAGE },
  { path: "/about", title: "About — Cabin Tea", description: "A 360° maritime media and industry network built for the African community and Diaspora.", image: "/abouthero1.jpg" },
  { path: "/partner", title: "Partner With Us — Cabin Tea", description: "Partner with Cabin Tea to reach Africa's maritime and blue economy audience.", image: DEFAULT_IMAGE },
  { path: "/shop", title: "Shop — Cabin Tea", description: "Cabin Tea merchandise and gear.", image: DEFAULT_IMAGE },
  { path: "/creative-agency", title: "Creative Agency — Cabin Tea", description: "Connecting brands to the vibrancy and commercial power of African maritime culture.", image: "/creativeagency.jpg" },
  { path: "/afrocean", title: "Afrocean — Cabin Tea", description: "A dynamic gathering that unites the African Diaspora with their maritime heritage.", image: "/handshero.jpg" },
  { path: "/anchorage", title: "Anchorage — Cabin Tea", description: "A centralized media hub curating personalized maritime content for the Diaspora.", image: "/pic2.jpeg" },
  { path: "/africa-ocean-dynamism", title: "Africa Ocean Dynamism — Cabin Tea", description: DEFAULT_DESCRIPTION, image: DEFAULT_IMAGE },
  { path: "/on-deck", title: "On Deck — Cabin Tea", description: DEFAULT_DESCRIPTION, image: DEFAULT_IMAGE },
  { path: "/whats-rising", title: "What's Rising — Cabin Tea", description: DEFAULT_DESCRIPTION, image: DEFAULT_IMAGE },
  { path: "/contact", title: "Contact — Cabin Tea", description: "Get in touch with the Cabin Tea team.", image: DEFAULT_IMAGE },
];

const articlePages = [
  ...episodes
    .filter((e) => e.article && e.slug)
    .map((e) => ({
      path: `/episodes/${e.slug}`,
      title: `${e.article.title} — Cabin Tea`,
      description: e.article.deck,
      image: e.article.img,
    })),
  ...journalArticles.map((a) => ({
    path: `/episodes/${a.slug}`,
    title: `${a.article.title} — Cabin Tea`,
    description: a.article.deck,
    image: a.article.img,
  })),
];

const pages = [...staticPages, ...articlePages];

function absoluteUrl(p) {
  if (p.startsWith("http")) return p;
  return `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function injectMeta(template, page) {
  const url = absoluteUrl(page.path);
  const image = absoluteUrl(page.image);
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const isArticle = page.path.startsWith("/episodes/") && page.path !== "/episodes";

  const metaBlock = `<title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="${isArticle ? "article" : "website"}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />`;

  return template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"[^>]*>/, "")
    .replace(/<link\s+rel="canonical"[^>]*>/, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/g, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/g, "")
    .replace("</head>", `${metaBlock}\n  </head>`);
}

async function main() {
  const template = await readFile(path.join(DIST, "index.html"), "utf-8");

  for (const page of pages) {
    const html = injectMeta(template, page);
    if (page.path === "/") {
      await writeFile(path.join(DIST, "index.html"), html);
      continue;
    }
    const dir = path.join(DIST, page.path.replace(/^\//, ""));
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), html);
  }

  console.log(`generate-meta: wrote per-page link-preview tags for ${pages.length} routes.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
