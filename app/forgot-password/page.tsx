"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/toast";

function getResetErrorMessage(message: string): string {
  if (message.includes("rate limit")) {
    return "잠시 후 다시 시도해주세요.";
  }
  return "링크 발송에 실패했습니다. 다시 시도해주세요.";
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const canSubmit = email.trim() && !isSubmitting;

  const handleSendResetLink = async () => {
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setToastMessage(getResetErrorMessage(error.message));
        return;
      }

      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-4">
      <Toast message={toastMessage} />
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-semibold tracking-tight text-[var(--text)]">
          한입 링크
        </h1>
        <div className="flex flex-col gap-4 rounded-xl bg-[var(--surface)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          {isSent ? (
            <p className="text-center text-sm text-[var(--text-sub)]">
              비밀번호 재설정 링크를 이메일로 보냈습니다. 메일함을 확인해주세요.
            </p>
          ) : (
            <>
              <div>
                <label
                  htmlFor="forgot-password-email"
                  className="mb-1.5 block text-sm font-medium text-[var(--text)]"
                >
                  이메일
                </label>
                <input
                  id="forgot-password-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendResetLink()}
                  placeholder="you@example.com"
                  className="w-full rounded-[10px] border border-[var(--border)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] transition-[border-color,box-shadow] duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)] focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleSendResetLink}
                disabled={!canSubmit}
                className="mt-2 rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white transition-colors duration-300 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-30"
              >
                {isSubmitting ? "발송 중..." : "재설정 링크 보내기"}
              </button>
            </>
          )}
          <Link
            href="/login"
            className="text-center text-sm font-medium text-[var(--accent)] transition-colors duration-300 hover:underline"
          >
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
