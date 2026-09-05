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
      <label
        htmlFor="folder"
        className="mb-1.5 block text-sm font-medium text-[var(--text)]"
      >
        폴더
      </label>
      <div className="flex items-center gap-2 rounded-[10px] border border-[var(--border)] px-4 py-3 transition-[border-color,box-shadow] duration-300 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]">
        <FolderIcon className="h-4 w-4 shrink-0 text-[var(--placeholder)]" />
        <select
          id="folder"
          value={value ?? ""}
          onChange={(e) =>
            onChange(e.target.value === "" ? null : e.target.value)
          }
          className="w-full bg-transparent text-[17px] text-[var(--text)] focus:outline-none"
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
