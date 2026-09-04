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
      <label htmlFor="link-url" className="mb-1.5 block text-sm font-medium text-zinc-700">
        링크 주소
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2.5 focus-within:border-zinc-900">
        <LinkGlyph className="h-4 w-4 shrink-0 text-zinc-400" />
        <input
          id="link-url"
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com"
          className="w-full text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
        />
      </div>
    </div>
  );
}
