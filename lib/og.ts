import { OpenGraphInfo } from "./types";
import { getDomain } from "./utils";

function extractMeta(html: string, property: string): string | null {
  const pattern = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["'][^>]*>`,
    "i",
  );
  const reversed = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["'][^>]*>`,
    "i",
  );
  const match = html.match(pattern) ?? html.match(reversed);
  return match ? match[1] : null;
}

function extractTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : null;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

function resolveUrl(candidate: string | null, baseUrl: string): string | null {
  if (!candidate) {
    return null;
  }
  try {
    return new URL(candidate, baseUrl).toString();
  } catch {
    return null;
  }
}

export async function fetchOpenGraphInfo(url: string): Promise<OpenGraphInfo> {
  const domain = getDomain(url);

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; OneBiteLinkBot/1.0)",
    },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`URL을 가져올 수 없습니다. (status: ${response.status})`);
  }

  const html = await response.text();

  const title =
    extractMeta(html, "og:title") ?? extractTitleTag(html) ?? domain;
  const description =
    extractMeta(html, "og:description") ?? extractMeta(html, "description") ?? "";
  const thumbnail = resolveUrl(extractMeta(html, "og:image"), url);

  return {
    title: decodeHtmlEntities(title),
    description: decodeHtmlEntities(description),
    thumbnail,
    url,
  };
}
