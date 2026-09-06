"use client";

import { useState } from "react";
import { LinkItem } from "@/lib/types";
import { getDomain } from "@/lib/utils";
import { useFolders } from "@/lib/folders-context";
import { useLinks } from "@/lib/links-context";
import { LinkGlyph, PencilIcon, TrashIcon } from "./icons";
import DeleteLinkModal from "./delete-link-modal";
import EditLinkModal from "./edit-link-modal";

export default function LinkCard({ link }: { link: LinkItem }) {
  const { folders } = useFolders();
  const { deleteLink } = useLinks();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowEdit(true);
          }}
          aria-label={`${link.title} 링크 수정`}
          className="rounded-md bg-[var(--background)]/90 p-1.5 text-[var(--text-sub)] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:text-[var(--accent)]"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowConfirm(true);
          }}
          aria-label={`${link.title} 링크 삭제`}
          className="rounded-md bg-[var(--background)]/90 p-1.5 text-[var(--text-sub)] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:text-[var(--error)]"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      <DeleteLinkModal
        link={showConfirm ? link : null}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
      />
      {showEdit && (
        <EditLinkModal
          link={link}
          folders={folders}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}
