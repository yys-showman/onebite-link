"use client";

import { LinkItem } from "@/lib/types";

export default function DeleteLinkModal({
  link,
  onCancel,
  onConfirm,
}: {
  link: LinkItem | null;
  onCancel: () => void;
  onConfirm: (link: LinkItem) => void;
}) {
  if (!link) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-[var(--background)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          링크를 삭제할까요?
        </h2>
        <p className="mt-2 text-sm text-[var(--text-sub)]">
          &apos;{link.title}&apos; 링크를 삭제하면 되돌릴 수 없습니다.
        </p>
        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-[var(--accent)] transition-colors duration-300 hover:underline"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => onConfirm(link)}
            className="rounded-full bg-[var(--error)] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:opacity-90"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
