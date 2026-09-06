"use client";

import { useState } from "react";
import { Folder, LinkItem } from "@/lib/types";
import { useLinks } from "@/lib/links-context";
import { FolderIcon } from "./icons";

export default function EditLinkModal({
  link,
  folders,
  onClose,
}: {
  link: LinkItem;
  folders: Folder[];
  onClose: () => void;
}) {
  const { updateLink } = useLinks();
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const [folderId, setFolderId] = useState<string | null>(link.folderId);

  const handleSave = async () => {
    if (!title.trim()) {
      return;
    }
    await updateLink(link.id, {
      title: title.trim(),
      description: description.trim(),
      folderId,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-[var(--background)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          링크 정보 수정
        </h2>
        <div className="mt-5 flex flex-col gap-4">
          <div>
            <label
              htmlFor="edit-link-folder"
              className="mb-1.5 block text-sm font-medium text-[var(--text)]"
            >
              폴더
            </label>
            <div className="flex items-center gap-2 rounded-[10px] border border-[var(--border)] px-4 py-3 transition-[border-color,box-shadow] duration-300 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]">
              <FolderIcon className="h-4 w-4 shrink-0 text-[var(--placeholder)]" />
              <select
                id="edit-link-folder"
                value={folderId ?? ""}
                onChange={(e) =>
                  setFolderId(e.target.value === "" ? null : e.target.value)
                }
                className="w-full bg-transparent text-[17px] text-[var(--text)] focus:outline-none"
              >
                <option value="">폴더 없음</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="edit-link-title"
              className="mb-1.5 block text-sm font-medium text-[var(--text)]"
            >
              제목
            </label>
            <input
              id="edit-link-title"
              type="text"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="링크 제목을 입력하세요"
              className="w-full rounded-[10px] border border-[var(--border)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] transition-[border-color,box-shadow] duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)] focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="edit-link-description"
              className="mb-1.5 block text-sm font-medium text-[var(--text)]"
            >
              설명
            </label>
            <textarea
              id="edit-link-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="링크 설명을 입력하세요"
              className="w-full resize-none rounded-[10px] border border-[var(--border)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] transition-[border-color,box-shadow] duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)] focus:outline-none"
            />
          </div>
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
            disabled={!title.trim()}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
