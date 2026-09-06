"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusIcon } from "./icons";
import NewFolderModal from "./new-folder-modal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--divider)] bg-[rgba(255,255,255,0.72)] px-6 backdrop-blur-[20px] backdrop-saturate-[1.8]">
      <Link
        href="/"
        className="text-[17px] font-semibold tracking-tight text-[var(--text)]"
      >
        한입 링크
      </Link>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--divider)]"
        >
          <PlusIcon className="h-4 w-4" />
          새 폴더
        </button>
        <Link
          href="/new"
          className="flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-[var(--accent-hover)]"
        >
          <PlusIcon className="h-4 w-4" />
          새 링크
        </Link>
      </div>
      <NewFolderModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}
