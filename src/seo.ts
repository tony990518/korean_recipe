import { DB } from "./data";
import type { Recipe, Tip } from "./types";

export const SITE_URL = "https://www.k-foodstudio.com";
const SITE_NAME = "Studio.K 韓味研究所";
const DEFAULT_OG_IMAGE = absoluteUrl("/images/logo_noText.png");
const BUILD_DATE = new Date().toISOString().split("T")[0];

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: "website" | "article";
  robots?: string;
  jsonLd?: string;
  lastmod?: string;
};

function absoluteUrl(input: string): string {
  if (!input) return SITE_URL;
  if (/^https?:\/\//i.test(input)) return input;
  const normalized = input.startsWith("/") ? input : `/${input}`;
  return `${SITE_URL}${normalized}`;
}

function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003C");
}

function baseMeta(meta: Omit<RouteMeta, "lastmod">): RouteMeta {
  return { lastmod: BUILD_DATE, ...meta };
}

export function getHomeMeta(): RouteMeta {
  return baseMeta({
    path: "",
    title: `${SITE_NAME}｜今天想吃什麼韓式？`,
    description: "用 Studio.K 韓味研究所，一起探索韓國料理：家常麵、甜點、料理小撇步通通都有，簡單上桌也能吃到道地風味。",
    canonical: `${SITE_URL}/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
  });
}

export function getRecipesMeta(): RouteMeta {
  return baseMeta({
    path: "recipes",
    title: `全部食譜｜${SITE_NAME}`,
    description: "韓式主食、小菜、甜點一次看，從新手入門到快速上桌的料理都在這裡。",
    canonical: `${SITE_URL}/recipes/`,
    ogImage: DB.recipes[0] ? absoluteUrl(DB.recipes[0].hero) : DEFAULT_OG_IMAGE,
    ogType: "website",
  });
}

export function getTipsMeta(): RouteMeta {
  return baseMeta({
    path: "tips",
    title: `料理小撇步｜${SITE_NAME}`,
    description: "整理韓國料理實用小技巧：保存祕訣、備料方法、味道調整一次掌握。",
    canonical: `${SITE_URL}/tips/`,
    ogImage: DB.tips[0] ? absoluteUrl(DB.tips[0].hero) : DEFAULT_OG_IMAGE,
    ogType: "website",
  });
}

export function getTermsMeta(): RouteMeta {
  return baseMeta({
    path: "terms",
    title: `使用條款｜${SITE_NAME}`,
    description: "閱讀 Studio.K 韓味研究所的服務使用條款，了解網站使用規範與權益說明。",
    canonical: `${SITE_URL}/terms/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
  });
}

export function getPrivacyMeta(): RouteMeta {
  return baseMeta({
    path: "privacy",
    title: `隱私權政策｜${SITE_NAME}`,
    description: "了解我們如何保護與使用您的個人資料，安心享受韓味研究所的各項服務。",
    canonical: `${SITE_URL}/privacy/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
  });
}

function buildRecipeJsonLd(recipe: Recipe, canonical: string) {
  return serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.shortDescription,
    image: absoluteUrl(recipe.hero),
    recipeYield: `${recipe.servings} 份`,
    totalTime: `PT${recipe.minutes}M`,
    recipeCategory: "Korean cuisine",
    recipeCuisine: "Korean",
    recipeIngredient: recipe.ingredients.map((i) => `${i.label}${i.amount ? ` ${i.amount}` : ""}`),
    recipeInstructions: recipe.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text,
      image: step.image ? absoluteUrl(step.image) : undefined,
    })),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: canonical,
  });
}

export function getRecipeMeta(recipe: Recipe): RouteMeta {
  const canonical = `${SITE_URL}/recipe/${recipe.id}/`;
  return baseMeta({
    path: `recipe/${recipe.id}`,
    title: `${recipe.title}｜${SITE_NAME}`,
    description: recipe.shortDescription ?? "跟著步驟簡單做出美味的韓式料理。",
    canonical,
    ogImage: absoluteUrl(recipe.hero),
    ogType: "article",
    jsonLd: buildRecipeJsonLd(recipe, canonical),
  });
}

function buildTipJsonLd(tip: Tip, canonical: string) {
  const body = tip.content?.sections?.map((section) => section.text).join("\n\n");
  return serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tip.title,
    description: tip.shortDescription,
    image: absoluteUrl(tip.hero),
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_OG_IMAGE,
      },
    },
    articleBody: body,
  });
}

export function getTipMeta(tip: Tip): RouteMeta {
  const canonical = `${SITE_URL}/tip/${tip.id}/`;
  return baseMeta({
    path: `tip/${tip.id}`,
    title: `${tip.title}｜${SITE_NAME}`,
    description: tip.shortDescription,
    canonical,
    ogImage: absoluteUrl(tip.hero),
    ogType: "article",
    jsonLd: buildTipJsonLd(tip, canonical),
  });
}

export function getRecipeMetaById(id: string): RouteMeta | undefined {
  const recipe = DB.recipes.find((r) => r.id === id);
  return recipe ? getRecipeMeta(recipe) : undefined;
}

export function getTipMetaById(id: string): RouteMeta | undefined {
  const tip = DB.tips.find((t) => t.id === id);
  return tip ? getTipMeta(tip) : undefined;
}

export function getNotFoundMeta(): RouteMeta {
  return baseMeta({
    path: "404",
    title: `找不到頁面｜${SITE_NAME}`,
    description: "您造訪的頁面不存在，請回到首頁探索更多韓式料理。",
    canonical: `${SITE_URL}/404`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    robots: "noindex, nofollow",
  });
}

export function getAllRouteMeta(): RouteMeta[] {
  const metas: RouteMeta[] = [
    getHomeMeta(),
    getRecipesMeta(),
    getTipsMeta(),
    getTermsMeta(),
    getPrivacyMeta(),
  ];

  for (const recipe of DB.recipes ?? []) {
    metas.push(getRecipeMeta(recipe));
  }
  for (const tip of DB.tips ?? []) {
    metas.push(getTipMeta(tip));
  }

  return metas;
}
