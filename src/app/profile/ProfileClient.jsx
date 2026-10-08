"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, DEFAULT_AVATAR, DEFAULT_NAME, DEFAULT_EMAIL } from "@/context/AuthContext";

export default function ProfileClient() {
  const router = useRouter();
  const { user, isAuthenticated, loading, updateProfile, signOut } = useAuth();
  const [name, setName] = useState(user?.name || DEFAULT_NAME);
  const [savedMessage, setSavedMessage] = useState(false);

  const currentUser = user || {
    name: DEFAULT_NAME,
    email: DEFAULT_EMAIL,
    avatar: DEFAULT_AVATAR,
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile({ name });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-3xl font-bold text-[#1D271F]">আমার প্রোফাইল</h1>
        <p className="text-xs sm:text-sm text-[#1D271F]/60">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5ECE5] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 shadow-xs">
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
          <img
            src={currentUser.avatar || DEFAULT_AVATAR}
            alt={currentUser.name || DEFAULT_NAME}
            className="w-13 h-13 sm:w-16 sm:h-16 rounded-xl object-cover border border-[#E5ECE5] shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-bold text-[#1D271F] truncate">
              {currentUser.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#1D271F]/55 truncate">
              {currentUser.email}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            signOut();
            router.push("/");
          }}
          className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 active:bg-red-100 text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0"
        >
          <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
          <span>সাইন আউট</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5ECE5] p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5">
        <h3 className="text-base sm:text-lg font-bold text-[#1D271F]">তথ্য</h3>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#1D271F] mb-1.5 sm:mb-2">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFCFA] border border-[#D5DDD5] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#05893E] text-[#1D271F]"
              required
            />
          </div>

          {savedMessage && (
            <div className="text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-2 rounded-lg">
              তথ্য সফলভাবে আপডেট করা হয়েছে!
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 bg-[#05893E] hover:bg-[#047F39] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            আপডেট
          </button>
        </form>
      </div>
    </div>
  );
}

