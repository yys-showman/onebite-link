"use client";

import { useState } from "react";
import { useFolders } from "@/lib/folders-context";
import LinkUrlInput from "./link-url-input";
import FolderSelect from "./folder-select";

export default function NewLinkForm() {
  const { folders } = useFolders();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState<string | null>(null);

  const handleSave = () => {
    console.log({ url, folderId });
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-5 rounded-xl bg-[var(--surface)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
        새 링크 추가
      </h1>
      <LinkUrlInput value={url} onChange={setUrl} />
      <FolderSelect folders={folders} value={folderId} onChange={setFolderId} />
      <button
        type="button"
        onClick={handleSave}
        disabled={!url}
        className="mt-2 rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white transition-colors duration-300 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-30"
      >
        저장
      </button>
    </div>
  );
}
