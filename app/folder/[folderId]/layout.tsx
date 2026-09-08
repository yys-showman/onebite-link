import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "폴더",
};

export default function FolderLayout({
  children,
}: LayoutProps<"/folder/[folderId]">) {
  return children;
}
