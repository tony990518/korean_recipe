import { Recipe } from "../types";
import { buildRecipeUrl, withUTM } from "../utils";
import Icon from "./Icon";

// ===== Share Icons: minimal (no circle) =====
const ShareIcons = ({ recipe }: { recipe: Recipe }) => {
  const baseUrl = buildRecipeUrl(recipe.id);
  const title = `${recipe.title}｜Studio.K 韓味研究所`;
  const text = `${recipe.shortDescription ?? ""}`.trim();

  // UTM
  const urlLine = withUTM(baseUrl, { source: "line", medium: "social", campaign: "recipe_share", content: recipe.id });
  const urlFacebook = withUTM(baseUrl, { source: "facebook", medium: "social", campaign: "recipe_share", content: recipe.id });
  const urlCopyInstagram = withUTM(baseUrl, { source: "instagram", medium: "copy", campaign: "recipe_share", content: recipe.id });
  const urlCopyThreads = withUTM(baseUrl, { source: "threads", medium: "copy", campaign: "recipe_share", content: recipe.id });
  const urlCopyDcard = withUTM(baseUrl, { source: "dcard", medium: "copy", campaign: "recipe_share", content: recipe.id });
  const urlWebShare = withUTM(baseUrl, { source: "webshare", medium: "web_share", campaign: "recipe_share", content: recipe.id });

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: urlWebShare });
      } catch {
        /* no-op */
      }
    } else {
      await navigator.clipboard?.writeText(`【${title}】\n${text ? text + "\n" : ""}${urlWebShare}`);
      alert("링크를 클립보드에 복사했어요. 원하는 앱에 붙여넣기 해주세요!");
    }
  };

  const onCopyTemplate = async (platform: "dcard" | "instagram" | "threads") => {
    const shareUrl =
      platform === "instagram" ? urlCopyInstagram : platform === "threads" ? urlCopyThreads : urlCopyDcard;
    const tpl = `【${title}】\n${text ? text + "\n" : ""}${shareUrl}`;
    await navigator.clipboard?.writeText(tpl);
    alert(
      `${platform === "dcard" ? "Dcard" : platform === "instagram" ? "Instagram" : "Threads"}에 붙여넣기 하세요! 링크를 복사했어요.`
    );
  };

  const open = (href: string) => window.open(href, "_blank", "noopener,noreferrer");

  const items = [
    {
      key: "native",
      onClick: shareNative,
      // 심플한 공유 아이콘(SVG)
      icon: <Icon.link className="w-8 h-8 md:w-10 md:h-10" />,
      aria: "分享",
    },
    {
      key: "line",
      onClick: () => open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(urlLine)}`),
      icon: <Icon.line className="w-8 h-8 md:w-10 md:h-10" />,
      aria: "LINE",
    },
    {
      key: "facebook",
      onClick: () => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlFacebook)}`),
      icon: <Icon.facebook className="w-8 h-8 md:w-10 md:h-10" />,
      aria: "Facebook",
    },
    {
      key: "instagram",
      onClick: () => onCopyTemplate("instagram"),
      icon: <Icon.instagram className="w-8 h-8 md:w-10 md:h-10" />,
      aria: "Instagram",
    },
    {
      key: "threads",
      onClick: () => onCopyTemplate("threads"),
      icon: <Icon.threads className="w-8 h-8 md:w-10 md:h-10" />,
      aria: "Threads",
    },
    {
      key: "dcard",
      onClick: () => onCopyTemplate("dcard"),
      icon: <Icon.dcard className="w-8 h-8 md:w-10 md:h-10" />,
      aria: "Dcard",
    },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-4 py-3">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={it.onClick}
          className="
            group inline-flex items-center justify-center
            p-1.5 md:p-2
            text-slate-700
            hover:opacity-90 hover:-translate-y-0.5 hover:scale-[1.03]
            active:translate-y-0 active:scale-100
            transition
            focus:outline-none focus:ring-2 focus:ring-red-500/40 rounded
          "
          aria-label={it.aria}
          title={it.aria}
        >
          {/* 아이콘만 (배경/테두리 없음) */}
          <span className="drop-shadow-[0_0_0_rgba(0,0,0,0)] group-hover:drop-shadow-sm">
            {it.icon}
          </span>
          <span className="sr-only">{it.aria}</span>
        </button>
      ))}
    </div>
  );
};

export default ShareIcons;
