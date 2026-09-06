"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-semibold tracking-tight text-[var(--text)]">
          한입 링크
        </h1>
        <div className="flex flex-col gap-4 rounded-xl bg-[var(--surface)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div>
            <label
              htmlFor="login-email"
              className="mb-1.5 block text-sm font-medium text-[var(--text)]"
            >
              이메일
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-[10px] border border-[var(--border)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] transition-[border-color,box-shadow] duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)] focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="mb-1.5 block text-sm font-medium text-[var(--text)]"
            >
              비밀번호
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full rounded-[10px] border border-[var(--border)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] transition-[border-color,box-shadow] duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)] focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="mt-2 rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white transition-colors duration-300 hover:bg-[var(--accent-hover)]"
          >
            로그인
          </button>
          <Link
            href="/signup"
            className="text-center text-sm font-medium text-[var(--accent)] transition-colors duration-300 hover:underline"
          >
            회원 가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
