import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { promises as fs } from "node:fs";
import path from "node:path";
import { DB, STORIES, LABS } from "./src/data.ts";

function staticFallbackPlugin() {
  return {
    name: "static-fallback-plugin",
    apply: "build" as const,
    async closeBundle() {
      const distDir = path.resolve(process.cwd(), "dist");
      const templatePath = path.join(distDir, "index.html");

      let template: string;
      try {
        template = await fs.readFile(templatePath, "utf8");
      } catch (error) {
        console.warn("[static-fallback] index.html not found, skipping.");
        return;
      }

      const routes = new Set<string>(["recipes", "tips", "terms", "privacy"]);

      for (const recipe of DB.recipes ?? []) {
        if (recipe?.id) routes.add(`recipe/${recipe.id}`);
      }

      for (const tip of DB.tips ?? []) {
        if (tip?.id) routes.add(`tip/${tip.id}`);
      }

      for (const story of STORIES ?? []) {
        if (story?.id) routes.add(`story/${story.id}`);
      }

      for (const lab of LABS ?? []) {
        if (lab?.id) routes.add(`lab/${lab.id}`);
      }

      await fs.writeFile(path.join(distDir, "404.html"), template, "utf8");

      await Promise.all(
        Array.from(routes).map(async (route) => {
          const routeDir = path.join(distDir, route);
          await fs.mkdir(routeDir, { recursive: true });
          await fs.writeFile(path.join(routeDir, "index.html"), template, "utf8");
        }),
      );

      console.log(`[static-fallback] Generated ${routes.size} HTML copies.`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), staticFallbackPlugin()],
  base: "/",
});
