
export function buildRecipeUrl(id: string) {
    if (typeof window !== "undefined" && window.location?.origin) {
      return `${window.location.origin}/recipe/${id}/`;
    }
    return `/recipe/${id}/`;
  }
  
export function withUTM(
    baseUrl: string,
    { source, medium, campaign, content }: { source: string; medium: string; campaign: string; content?: string }
  ) {
    try {
      const u = new URL(baseUrl, typeof window !== "undefined" ? window.location.origin : undefined);
      u.searchParams.set("utm_source", source);
      u.searchParams.set("utm_medium", medium);
      u.searchParams.set("utm_campaign", campaign);
      if (content) u.searchParams.set("utm_content", content);
      return u.toString();
    } catch {
      const qs = `utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(medium)}&utm_campaign=${encodeURIComponent(campaign)}${content ? `&utm_content=${encodeURIComponent(content)}` : ""}`;
      return baseUrl.includes("?") ? `${baseUrl}&${qs}` : `${baseUrl}?${qs}`;
    }
  }
