import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import LinkGrid from "@/components/link-grid";
import { mockFolders, mockLinks } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={mockFolders} />
        <main className="flex-1 p-8">
          <LinkGrid links={mockLinks} />
        </main>
      </div>
    </div>
  );
}
