import { useEffect, useState } from "react";
import { Recipe } from "../types";
import { buildRecipeUrl, withUTM } from "../utils";

function buildShareText(recipe: Recipe) {
  const preview = recipe.preview?.trim();
  if (preview) return preview;

  const firstParagraph = recipe.shortDescription
    ?.split(/\n\s*\n/)
    .map((part) => part.trim())
    .find(Boolean);

  if (!firstParagraph) return "";

  return firstParagraph.length > 72
    ? `${firstParagraph.slice(0, 72).trimEnd()}…`
    : firstParagraph;
}

const ShareIcons = ({ recipe }: { recipe: Recipe }) => {
  const baseUrl = buildRecipeUrl(recipe.id);
  const title = `${recipe.title}｜Studio.K 韓味研究所`;
  const text = buildShareText(recipe);
  const [feedback, setFeedback] = useState<string | null>(null);

  const shareUrl = withUTM(baseUrl, {
    source: "webshare",
    medium: "web_share",
    campaign: "recipe_share",
    content: recipe.id,
  });

  useEffect(() => {
    if (!feedback) return;
    const timeoutId = window.setTimeout(() => setFeedback(null), 2400);
    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  const shareRecipe = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {
        // Silent cancel keeps the action lightweight.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setFeedback("已複製分享連結");
    } catch {
      setFeedback("目前無法自動複製連結");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={shareRecipe}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-headline text-sm font-bold text-white shadow-[0_12px_28px_rgba(172,65,45,0.22)] transition hover:-translate-y-0.5 hover:bg-primary-dim focus:outline-none focus:ring-2 focus:ring-primary/30"
        aria-label="分享食譜"
      >
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          share
        </span>
        <span>分享食譜</span>
      </button>
      <p className="text-xs text-on-surface-variant" aria-live="polite">
        {feedback ?? "手機可直接分享，桌機會複製連結"}
      </p>
    </div>
  );
};

export default ShareIcons;
