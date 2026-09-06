"use client";

import { useState } from "react";
import Link from "next/link";
import { Folder } from "@/lib/types";
import { useFolders } from "@/lib/folders-context";
import { FolderIcon, PencilIcon, TrashIcon } from "./icons";
import DeleteFolderModal from "./delete-folder-modal";
import EditFolderModal from "./edit-folder-modal";

export default function FolderList({
  folders,
  selectedFolderId,
}: {
  folders: Folder[];
  selectedFolderId: string | null;
}) {
  const { deleteFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);

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
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 pr-16 text-left text-sm transition-colors duration-300 ${
                  isActive
                    ? "bg-[var(--divider)] font-medium text-[var(--text)]"
                    : "text-[var(--text-sub)] hover:bg-[var(--divider)]"
                }`}
              >
                <FolderIcon className="h-4 w-4 shrink-0" />
                <span className="truncate">{folder.name}</span>
              </Link>
              <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFolderToEdit(folder);
                  }}
                  aria-label={`${folder.name} 폴더 수정`}
                  className="rounded-md p-1 text-[var(--text-sub)] hover:text-[var(--accent)]"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFolderToDelete(folder);
                  }}
                  aria-label={`${folder.name} 폴더 삭제`}
                  className="rounded-md p-1 text-[var(--text-sub)] hover:text-[var(--error)]"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <DeleteFolderModal
        folder={folderToDelete}
        onCancel={() => setFolderToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
      <EditFolderModal
        key={folderToEdit?.id}
        folder={folderToEdit}
        onClose={() => setFolderToEdit(null)}
      />
    </>
  );
}
