import { LinkItem } from "@/lib/types";
import { getDomain } from "@/lib/utils";
import { LinkGlyph } from "./icons";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="flex h-28 items-center justify-center bg-zinc-100 text-zinc-300">
        <LinkGlyph className="h-8 w-8" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="truncate text-sm font-semibold text-zinc-900 group-hover:underline">
          {link.title}
        </h3>
        <p className="line-clamp-2 text-xs text-zinc-500">{link.description}</p>
        <span className="mt-2 truncate text-xs text-zinc-400">{getDomain(link.url)}</span>
      </div>
    </a>
  );
}
