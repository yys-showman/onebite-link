"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useFolders } from "@/lib/folders-context";
import { LayersIcon, LogoutIcon } from "./icons";
import FolderList from "./folder-list";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { folders } = useFolders();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const selectedFolderId = pathname.startsWith("/folder/")
    ? decodeURIComponent(pathname.split("/")[2] ?? "")
    : null;

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-[var(--divider)] bg-[var(--surface)] p-4">
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

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="mt-auto flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[var(--text-sub)] transition-colors duration-300 hover:bg-[var(--divider)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <LogoutIcon className="h-4 w-4 shrink-0" />
        {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
      </button>
    </aside>
  );
}
