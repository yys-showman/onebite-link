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
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                isActive
                  ? "bg-zinc-200 font-medium text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-100"
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
