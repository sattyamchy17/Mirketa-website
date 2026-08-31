// ============================================================
// Shared YouTube URL helper — parses a real, given watch/share URL
// into the pieces every webinar/video page needs (embed URL, real
// thumbnail, start time), so each page doesn't re-derive these by
// hand and metadata stays computed from one real source URL.
// ============================================================

export function parseYouTubeUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    let id = null;
    if (host === "youtu.be") {
      id = parsed.pathname.slice(1);
    } else if (host.endsWith("youtube.com")) {
      id = parsed.searchParams.get("v") || (parsed.pathname.startsWith("/embed/") ? parsed.pathname.split("/embed/")[1] : null);
    }
    if (!id) return null;

    const rawStart = parsed.searchParams.get("t") || parsed.searchParams.get("start") || "0";
    const start = parseInt(rawStart, 10) || 0;

    return {
      id,
      start,
      watchUrl: `https://www.youtube.com/watch?v=${id}`,
      embedUrl: `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`,
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  } catch {
    return null;
  }
}
