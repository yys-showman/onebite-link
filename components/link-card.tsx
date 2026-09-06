"use client";

import { useState } from "react";
import { LinkItem } from "@/lib/types";
import { getDomain } from "@/lib/utils";
import { useLinks } from "@/lib/links-context";
import { LinkGlyph, TrashIcon } from "./icons";
import DeleteLinkModal from "./delete-link-modal";

export default function LinkCard({ link }: { link: LinkItem }) {
  const { deleteLink } = useLinks();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmDelete = () => {
    deleteLink(link.id);
    setShowConfirm(false);
  };

  return (
    <div className="group relative">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col overflow-hidden rounded-xl bg-[var(--surface)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
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
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setShowConfirm(true);
        }}
        aria-label={`${link.title} 링크 삭제`}
        className="absolute top-2 right-2 rounded-md bg-[var(--background)]/90 p-1.5 text-[var(--text-sub)] opacity-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-opacity duration-300 hover:text-[var(--error)] group-hover:opacity-100"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
      <DeleteLinkModal
        link={showConfirm ? link : null}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
