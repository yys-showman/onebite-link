import { Folder } from "@/lib/types";
import { FolderIcon } from "./icons";

export default function FolderSelect({
  folders,
  value,
  onChange,
}: {
  folders: Folder[];
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <div>
      <label htmlFor="folder" className="mb-1.5 block text-sm font-medium text-zinc-700">
        폴더
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2.5 focus-within:border-zinc-900">
        <FolderIcon className="h-4 w-4 shrink-0 text-zinc-400" />
        <select
          id="folder"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
          className="w-full bg-transparent text-sm text-zinc-900 focus:outline-none"
        >
          <option value="">폴더 없음</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
