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
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={mockFolders} />
        <main className="flex-1 p-6">
          <h1 className="mb-4 text-lg font-bold text-zinc-900">{folder.name}</h1>
          <LinkGrid links={links} />
        </main>
      </div>
    </div>
  );
}
