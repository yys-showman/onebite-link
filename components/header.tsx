import Link from "next/link";
import { PlusIcon } from "./icons";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-6">
      <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
      >
        <PlusIcon className="h-4 w-4" />
        새 링크
      </Link>
    </header>
  );
}
