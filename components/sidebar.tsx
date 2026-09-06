"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFolders } from "@/lib/folders-context";
import { LayersIcon } from "./icons";
import FolderList from "./folder-list";

export default function Sidebar() {
  const pathname = usePathname();
  const { folders } = useFolders();
  const selectedFolderId = pathname.startsWith("/folder/")
    ? decodeURIComponent(pathname.split("/")[2] ?? "")
    : null;

  return (
    <aside className="w-60 shrink-0 border-r border-[var(--divider)] bg-[var(--surface)] p-4">
      <Link
        href="/"
        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-300 ${
          selectedFolderId === null
            ? "bg-[var(--accent)] font-medium text-white"
            : "text-[var(--text-sub)] hover:bg-[var(--divider)]"
        }`}
      >
        <LayersIcon className="h-4 w-4 shrink-0" />
        ALL
      </Link>

      <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-sub)]">
        폴더
      </p>
      <div className="mt-2">
        <FolderList folders={folders} selectedFolderId={selectedFolderId} />
      </div>
    </aside>
  );
}
