import { notFound } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import LinkGrid from "@/components/link-grid";
import { mockFolders, mockLinks } from "@/lib/mock-data";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const folder = mockFolders.find((item) => item.id === folderId);

  if (!folder) {
    notFound();
  }

  const links = mockLinks.filter((link) => link.folderId === folderId);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={mockFolders} />
        <main className="flex-1 p-8">
          <h1 className="mb-6 text-2xl font-semibold tracking-tight text-[var(--text)]">
            {folder.name}
          </h1>
          <LinkGrid links={links} />
        </main>
      </div>
    </div>
  );
}
