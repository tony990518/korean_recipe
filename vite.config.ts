import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  getAllRouteMeta,
  getNotFoundMeta,
  SITE_URL,
  type RouteMeta,
} from "./src/seo.ts";

function staticFallbackPlugin() {
  const headCleanupPattern = /<meta property="og:(?:title|description|url|image)"[^>]*>\s*/gi;
  const canonicalPattern = /<link rel="canonical"[^>]*>\s*/i;
  const robotsPattern = /<meta name="robots"[^>]*>\s*/i;
  const ldJsonPattern = /<script type="application\/ld\+json" data-prerender[^>]*>[\s\S]*?<\/script>\s*/gi;

  return {
    name: "static-fallback-plugin",
    apply: "build" as const,
    async closeBundle() {
      const projectRoot = process.cwd();
      const distDir = path.resolve(projectRoot, "dist");
      const templatePath = path.join(distDir, "index.html");

      let template: string;
      try {
        template = await fs.readFile(templatePath, "utf8");
      } catch (error) {
        console.warn("[static-fallback] index.html not found, skipping.");
        return;
      }

      const metas = getAllRouteMeta();
      const notFoundMeta = getNotFoundMeta();

      for (const meta of metas) {
        const html = applyMeta(template, meta, {
          headCleanupPattern,
          canonicalPattern,
          robotsPattern,
          ldJsonPattern,
        });
        const outputPath =
          meta.path === ""
            ? path.join(distDir, "index.html")
            : path.join(distDir, meta.path, "index.html");
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, html, "utf8");
      }

      const notFoundHtml = applyMeta(template, notFoundMeta, {
        headCleanupPattern,
        canonicalPattern,
        robotsPattern,
        ldJsonPattern,
      });
      await fs.writeFile(path.join(distDir, "404.html"), notFoundHtml, "utf8");

      const sitemapXml = buildSitemap(metas);
      await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
      await fs.writeFile(path.join(projectRoot, "public", "sitemap.xml"), sitemapXml, "utf8");

      const robotsTxt = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`;
      await fs.writeFile(path.join(distDir, "robots.txt"), robotsTxt, "utf8");
      await fs.writeFile(path.join(projectRoot, "public", "robots.txt"), robotsTxt, "utf8");

      console.log(`[static-fallback] Generated ${metas.length} HTML copies with SEO metadata.`);
    },
  };
}

function applyMeta(
  template: string,
  meta: RouteMeta,
  patterns: {
    headCleanupPattern: RegExp;
    canonicalPattern: RegExp;
    robotsPattern: RegExp;
    ldJsonPattern: RegExp;
  },
): string {
  let html = template;

  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);

  const descriptionTag = `<meta name="description" content="${escapeHtml(meta.description)}">`;
  if (/<meta name="description"/i.test(html)) {
    html = html.replace(/<meta name="description"[^>]*>/i, descriptionTag);
  } else {
    html = injectHead(html, descriptionTag);
  }

  html = html.replace(patterns.canonicalPattern, "");
  html = injectHead(html, `<link rel="canonical" href="${meta.canonical}">`);

  html = html.replace(patterns.headCleanupPattern, "");
  const ogTags = [
    `<meta property="og:title" content="${escapeHtml(meta.title)}">`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}">`,
    `<meta property="og:url" content="${meta.canonical}">`,
    `<meta property="og:type" content="${meta.ogType ?? "website"}">`,
    meta.ogImage ? `<meta property="og:image" content="${meta.ogImage}">` : null,
  ]
    .filter(Boolean)
    .join("\n");
  html = injectHead(html, ogTags);

  if (meta.robots) {
    if (patterns.robotsPattern.test(html)) {
      html = html.replace(patterns.robotsPattern, `<meta name="robots" content="${meta.robots}">\n`);
    } else {
      html = injectHead(html, `<meta name="robots" content="${meta.robots}">`);
    }
  } else {
    html = html.replace(patterns.robotsPattern, "");
  }

  if (meta.jsonLd) {
    html = html.replace(patterns.ldJsonPattern, "");
    html = injectHead(
      html,
      `<script type="application/ld+json" data-prerender="true">${meta.jsonLd}</script>`,
    );
  }

  return html;
}

function injectHead(html: string, snippet: string): string {
  return html.replace(
    "</head>",
    `${snippet
      .split("\n")
      .filter(Boolean)
      .map((line) => `  ${line}`)
      .join("\n")}\n</head>`,
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSitemap(metas: RouteMeta[]): string {
  const urls = metas
    .filter((meta) => !meta.robots || !/noindex/i.test(meta.robots))
    .map((meta) => {
      const priority = meta.path === "" ? "1.0" : meta.path.includes("/") ? "0.6" : "0.8";
      const lastmod = meta.lastmod ? `<lastmod>${meta.lastmod}</lastmod>` : "";
      return [
        "  <url>",
        `    <loc>${meta.canonical}</loc>`,
        lastmod ? `    ${lastmod}` : "",
        `    <priority>${priority}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
  ]
    .filter(Boolean)
    .join("\n");
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), staticFallbackPlugin()],
  base: "/",
});
