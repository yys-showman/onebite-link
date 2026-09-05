import Link from "next/link";
import { Folder } from "@/lib/types";
import { FolderIcon } from "./icons";

export default function FolderList({
  folders,
  selectedFolderId,
}: {
  folders: Folder[];
  selectedFolderId: string | null;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => {
        const isActive = selectedFolderId === folder.id;
        return (
          <li key={folder.id}>
            <Link
              href={`/folder/${folder.id}`}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-300 ${
                isActive
                  ? "bg-[var(--divider)] font-medium text-[var(--text)]"
                  : "text-[var(--text-sub)] hover:bg-[var(--divider)]"
              }`}
            >
              <FolderIcon className="h-4 w-4 shrink-0" />
              <span className="truncate">{folder.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
