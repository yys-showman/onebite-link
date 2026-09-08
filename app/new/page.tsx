import type { Metadata } from "next";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import NewLinkForm from "@/components/new-link-form";

export const metadata: Metadata = {
  title: "새 링크 추가",
};

export default function NewLinkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <NewLinkForm />
        </main>
      </div>
    </div>
  );
}
