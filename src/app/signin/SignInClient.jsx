"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, DEFAULT_EMAIL } from "@/context/AuthContext";

export default function SignInClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const { signIn, signInWithGoogle, signInWithGithub, isAuthenticated, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push(redirectPath);
    }
  }, [loading, isAuthenticated, router, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await signIn(email, password);
    if (ok) {
      router.push(redirectPath);
    }
  };

  const handleGoogleSignIn = async () => {
    const ok = await signInWithGoogle();
    if (ok) {
      router.push(redirectPath);
    }
  };

  const handleGithubSignIn = async () => {
    const ok = await signInWithGithub();
    if (ok) {
      router.push(redirectPath);
    }
  };

  return (
    <div className="w-full max-w-[460px] mx-auto space-y-6">
      <div className="text-center space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1D271F] tracking-tight">
          সাইন ইন
        </h1>
        <p className="text-xs sm:text-sm text-[#1D271F]/60">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#DCE4DC] shadow-xs space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="signin-email" className="block text-sm font-bold text-[#1D271F] mb-1.5">
              ইমেইল
            </label>
            <input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-white border border-[#DCE4DC] rounded-xl text-sm placeholder:text-[#8E9B8E] focus:outline-none focus:border-[#05893E] text-[#1D271F]"
            />
          </div>

          <div>
            <label htmlFor="signin-password" className="block text-sm font-bold text-[#1D271F] mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              id="signin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-white border border-[#DCE4DC] rounded-xl text-sm placeholder:text-[#8E9B8E] focus:outline-none focus:border-[#05893E] text-[#1D271F]"
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#05893E] hover:bg-[#047F39] text-white text-sm font-bold shadow-[0_4px_12px_rgba(5,137,62,0.35)] transition-all cursor-pointer"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3 pt-2">
          <div className="h-[1px] bg-[#E1E8E1] flex-1"></div>
          <span className="text-xs text-[#1D271F]/60 font-medium">অথবা</span>
          <div className="h-[1px] bg-[#E1E8E1] flex-1"></div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-[#DCE4DC] bg-white hover:bg-[#F3FBF4] text-xs sm:text-[13px] font-bold text-[#1D271F] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span className="truncate">Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            onClick={handleGithubSignIn}
            disabled={loading}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-[#DCE4DC] bg-white hover:bg-[#F3FBF4] text-xs sm:text-[13px] font-bold text-[#1D271F] transition-colors cursor-pointer"
          >
            <i className="fa-brands fa-github text-black text-base"></i>
            <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <div className="pt-2 text-center">
          <p className="text-xs sm:text-sm text-[#1D271F]/80">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="text-[#05893E] font-bold hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/"
          className="text-xs sm:text-sm text-[#1D271F]/60 hover:text-[#05893E] inline-flex items-center gap-1.5 font-medium transition-colors"
        >
          <span>← হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
