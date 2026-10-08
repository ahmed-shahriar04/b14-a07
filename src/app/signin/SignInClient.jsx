"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, DEFAULT_EMAIL } from "@/context/AuthContext";

export default function SignInClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const { signIn, signInWithGoogle, signInWithGithub, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            <label className="block text-sm font-bold text-[#1D271F] mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-white border border-[#DCE4DC] rounded-xl text-sm placeholder:text-[#8E9B8E] focus:outline-none focus:border-[#05893E] text-[#1D271F]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1D271F] mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
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
            <i className="fa-brands fa-google text-red-500 text-sm"></i>
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
