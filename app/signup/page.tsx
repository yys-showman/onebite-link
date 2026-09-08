"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/toast";

function getSignupErrorMessage(message: string): string {
  if (message.includes("already registered")) {
    return "이미 가입된 이메일입니다.";
  }
  if (message.includes("Password should be at least")) {
    return "비밀번호는 6자 이상이어야 합니다.";
  }
  if (message.includes("Unable to validate email address") || message.includes("invalid")) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return "회원 가입에 실패했습니다. 다시 시도해주세요.";
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const canSubmit = email.trim() && password && passwordConfirm && !isSubmitting;

  const handleSignup = async () => {
    if (!canSubmit) {
      return;
    }

    if (password !== passwordConfirm) {
      setToastMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        setToastMessage(getSignupErrorMessage(error.message));
        return;
      }

      router.push("/");
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
          <div>
            <label
              htmlFor="signup-email"
              className="mb-1.5 block text-sm font-medium text-[var(--text)]"
            >
              이메일
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-[10px] border border-[var(--border)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] transition-[border-color,box-shadow] duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)] focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="signup-password"
              className="mb-1.5 block text-sm font-medium text-[var(--text)]"
            >
              비밀번호
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full rounded-[10px] border border-[var(--border)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] transition-[border-color,box-shadow] duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)] focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="signup-password-confirm"
              className="mb-1.5 block text-sm font-medium text-[var(--text)]"
            >
              비밀번호 확인
            </label>
            <input
              id="signup-password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full rounded-[10px] border border-[var(--border)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] transition-[border-color,box-shadow] duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)] focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleSignup}
            disabled={!canSubmit}
            className="mt-2 rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white transition-colors duration-300 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isSubmitting ? "가입 중..." : "회원 가입"}
          </button>
          <Link
            href="/login"
            className="text-center text-sm font-medium text-[var(--accent)] transition-colors duration-300 hover:underline"
          >
            로그인 페이지로 이동
          </Link>
          <p className="text-center text-xs text-[var(--text-sub)]">
            가입 시{" "}
            <Link href="/privacy" className="underline">
              개인정보 처리방침
            </Link>
            에 동의하게 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
