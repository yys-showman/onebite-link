import { LinkItem } from "@/lib/types";
import { getDomain } from "@/lib/utils";
import { LinkGlyph } from "./icons";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl bg-[var(--surface)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    >
      <div className="flex h-28 items-center justify-center overflow-hidden bg-[var(--divider)] text-[var(--placeholder)]">
        {link.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.thumbnail}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <LinkGlyph className="h-8 w-8" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="truncate text-sm font-semibold text-[var(--text)] group-hover:underline">
          {link.title}
        </h3>
        <p className="line-clamp-2 text-xs text-[var(--text-sub)]">
          {link.description}
        </p>
        <span className="mt-2 truncate text-xs text-[var(--placeholder)]">
          {getDomain(link.url)}
        </span>
      </div>
    </a>
  );
}
