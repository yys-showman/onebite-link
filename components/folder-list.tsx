"use client";

import { useState } from "react";
import Link from "next/link";
import { Folder } from "@/lib/types";
import { useFolders } from "@/lib/folders-context";
import { FolderIcon, TrashIcon } from "./icons";
import DeleteFolderModal from "./delete-folder-modal";

export default function FolderList({
  folders,
  selectedFolderId,
}: {
  folders: Folder[];
  selectedFolderId: string | null;
}) {
  const { deleteFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  const handleConfirmDelete = (folder: Folder) => {
    deleteFolder(folder.id);
    setFolderToDelete(null);
  };

  return (
    <>
      <ul className="flex flex-col gap-1">
        {folders.map((folder) => {
          const isActive = selectedFolderId === folder.id;
          return (
            <li key={folder.id} className="group relative">
              <Link
                href={`/folder/${folder.id}`}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 pr-9 text-left text-sm transition-colors duration-300 ${
                  isActive
                    ? "bg-[var(--divider)] font-medium text-[var(--text)]"
                    : "text-[var(--text-sub)] hover:bg-[var(--divider)]"
                }`}
              >
                <FolderIcon className="h-4 w-4 shrink-0" />
                <span className="truncate">{folder.name}</span>
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFolderToDelete(folder);
                }}
                aria-label={`${folder.name} 폴더 삭제`}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-[var(--text-sub)] opacity-0 transition-opacity duration-300 hover:text-[var(--error)] group-hover:opacity-100"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </li>
          );
        })}
      </ul>
      <DeleteFolderModal
        folder={folderToDelete}
        onCancel={() => setFolderToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
