"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/lib/folders-context";
import { useLinks } from "@/lib/links-context";
import { OpenGraphInfo } from "@/lib/types";
import LinkUrlInput from "./link-url-input";
import FolderSelect from "./folder-select";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!url || isSaving) {
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "오픈 그래프 정보를 가져오지 못했습니다.");
      }
      const info = data as OpenGraphInfo;
      await addLink({
        url: info.url,
        title: info.title,
        description: info.description,
        thumbnail: info.thumbnail,
        folderId,
      });
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "오픈 그래프 정보를 가져오지 못했습니다.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-5 rounded-xl bg-[var(--surface)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
        새 링크 추가
      </h1>
      <LinkUrlInput value={url} onChange={setUrl} />
      <FolderSelect folders={folders} value={folderId} onChange={setFolderId} />
      {error && <p className="text-sm text-[var(--error)]">{error}</p>}
      <button
        type="button"
        onClick={handleSave}
        disabled={!url || isSaving}
        className="mt-2 rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white transition-colors duration-300 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-30"
      >
        {isSaving ? "저장 중..." : "저장"}
      </button>
    </div>
  );
}
