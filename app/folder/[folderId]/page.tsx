"use client";

import { useParams } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import LinkGrid from "@/components/link-grid";
import { useFolders } from "@/lib/folders-context";
import { mockLinks } from "@/lib/mock-data";

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const { folders } = useFolders();
  const folder = folders.find((item) => item.id === folderId);
  const links = mockLinks.filter((link) => link.folderId === folderId);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          {folder ? (
            <>
              <h1 className="mb-6 text-2xl font-semibold tracking-tight text-[var(--text)]">
                {folder.name}
              </h1>
              <LinkGrid links={links} />
            </>
          ) : (
            <p className="flex h-40 items-center justify-center text-sm text-[var(--text-sub)]">
              폴더를 찾을 수 없습니다.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
