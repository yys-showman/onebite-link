"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder } from "@/lib/types";
import { LayersIcon } from "./icons";
import FolderList from "./folder-list";

export default function Sidebar({ folders }: { folders: Folder[] }) {
  const pathname = usePathname();
  const selectedFolderId = pathname.startsWith("/folder/")
    ? decodeURIComponent(pathname.split("/")[2] ?? "")
    : null;

  return (
    <aside className="w-60 shrink-0 border-r border-zinc-200 bg-zinc-50 p-4">
      <Link
        href="/"
        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
          selectedFolderId === null
            ? "bg-zinc-900 font-medium text-white"
            : "text-zinc-600 hover:bg-zinc-100"
        }`}
      >
        <LayersIcon className="h-4 w-4 shrink-0" />
        ALL
      </Link>

      <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        폴더
      </p>
      <div className="mt-2">
        <FolderList folders={folders} selectedFolderId={selectedFolderId} />
      </div>
    </aside>
  );
}
