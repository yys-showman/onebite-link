import { LinkGlyph } from "./icons";

export default function LinkUrlInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor="link-url"
        className="mb-1.5 block text-sm font-medium text-[var(--text)]"
      >
        링크 주소
      </label>
      <div className="flex items-center gap-2 rounded-[10px] border border-[var(--border)] px-4 py-3 transition-[border-color,box-shadow] duration-300 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]">
        <LinkGlyph className="h-4 w-4 shrink-0 text-[var(--placeholder)]" />
        <input
          id="link-url"
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com"
          className="w-full text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] focus:outline-none"
        />
      </div>
    </div>
  );
}
