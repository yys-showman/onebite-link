import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import NewLinkForm from "@/components/new-link-form";
import { mockFolders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={mockFolders} />
        <main className="flex-1 p-6">
          <NewLinkForm folders={mockFolders} />
        </main>
      </div>
    </div>
  );
}
