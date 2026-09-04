"use client";

import { useState } from "react";
import { Folder } from "@/lib/types";
import LinkUrlInput from "./link-url-input";
import FolderSelect from "./folder-select";

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState<string | null>(null);

  const handleSave = () => {
    console.log({ url, folderId });
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-lg font-bold text-zinc-900">새 링크 추가</h1>
      <LinkUrlInput value={url} onChange={setUrl} />
      <FolderSelect folders={folders} value={folderId} onChange={setFolderId} />
      <button
        type="button"
        onClick={handleSave}
        disabled={!url}
        className="mt-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
      >
        저장
      </button>
    </div>
  );
}
