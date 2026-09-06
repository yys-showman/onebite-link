"use client";

import { useState } from "react";
import { Folder } from "@/lib/types";
import { useFolders } from "@/lib/folders-context";

export default function EditFolderModal({
  folder,
  onClose,
}: {
  folder: Folder | null;
  onClose: () => void;
}) {
  const { renameFolder } = useFolders();
  const [name, setName] = useState(folder?.name ?? "");

  if (!folder) {
    return null;
  }

  const handleSave = () => {
    if (!name.trim()) {
      return;
    }
    renameFolder(folder.id, name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-[var(--background)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          폴더 이름 수정
        </h2>
        <div className="mt-5">
          <label
            htmlFor="edit-folder-name"
            className="mb-1.5 block text-sm font-medium text-[var(--text)]"
          >
            폴더 이름
          </label>
          <input
            id="edit-folder-name"
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder="폴더 이름을 입력하세요"
            className="w-full rounded-[10px] border border-[var(--border)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] transition-[border-color,box-shadow] duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)] focus:outline-none"
          />
        </div>
        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium text-[var(--accent)] transition-colors duration-300 hover:underline"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim()}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
