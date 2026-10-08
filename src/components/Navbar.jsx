"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth, DEFAULT_AVATAR, DEFAULT_NAME, DEFAULT_EMAIL } from "@/context/AuthContext";
import { getBanglaDate } from "@/lib/banglaUtils";

export default function Navbar({ categories = [] }) {
  const pathname = usePathname();
  const { user, signOut, isAuthenticated } = useAuth();
  const [dateStr, setDateStr] = useState(getBanglaDate());
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setDateStr(getBanglaDate());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="bg-white border-b border-[#E1E8E1] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex sm:hidden items-center justify-between h-16 relative">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#1D271F] hover:bg-[#F0F5F0] border border-[#E1E8E1] transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-bars text-lg"></i>
          </button>

          <Link href="/" className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-[#05893E] flex items-center justify-center p-1 shadow-2xs overflow-hidden">
                <img
                  src="/logo-icon.png"
                  alt="বাজার দর"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-black tracking-tight text-[#1D271F] leading-none">
                বাজার দর
              </span>
            </div>
            <span className="text-[10px] text-[#1D271F]/55 font-normal mt-0.5 block font-num" suppressHydrationWarning>
              {dateStr}
            </span>
          </Link>

          {isAuthenticated ? (
            <Link
              href="/profile"
              aria-label="Profile"
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#05893E]/20 hover:border-[#05893E] transition-all flex items-center justify-center shadow-xs cursor-pointer"
            >
              <img
                src={user?.avatar || DEFAULT_AVATAR}
                alt={user?.name || DEFAULT_NAME}
                className="w-full h-full object-cover"
              />
            </Link>
          ) : (
            <Link
              href="/signin"
              className="px-3 py-1.5 rounded-lg bg-[#05893E] hover:bg-[#047F39] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              সাইন ইন
            </Link>
          )}
        </div>

        <div className="hidden sm:flex items-center justify-between h-16 sm:h-18">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#05893E] flex items-center justify-center p-1.5 shadow-xs overflow-hidden">
              <img
                src="/logo-icon.png"
                alt="বাজার দর"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1D271F] block leading-none">
                বাজার দর
              </span>
              <span className="text-[11px] text-[#1D271F]/50 font-normal mt-0.5 block font-num" suppressHydrationWarning>
                {dateStr}
              </span>
            </div>
          </Link>

          <div>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E1E8E1] hover:border-[#05893E] transition-all bg-white cursor-pointer"
                >
                  <img
                    src={user.avatar || DEFAULT_AVATAR}
                    alt={user.name || DEFAULT_NAME}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-[#1D271F] max-w-[110px] truncate">
                    {user.name || DEFAULT_NAME}
                  </span>
                  <i className="fa-solid fa-chevron-down text-[10px] text-gray-400"></i>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#E1E8E1] p-2.5 z-50 space-y-1">
                    <div className="px-2.5 py-1.5 border-b border-[#F0F5F0] mb-1">
                      <p className="text-sm font-bold text-[#1D271F] truncate">{user.name || DEFAULT_NAME}</p>
                      <p className="text-xs text-[#1D271F]/50 truncate">{user.email || DEFAULT_EMAIL}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-[#1D271F] hover:bg-[#F0F5F0] rounded-lg transition-colors"
                    >
                      <i className="fa-regular fa-user text-xs text-[#05893E]"></i>
                      <span>আমার প্রোফাইল</span>
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/signin"
                  className="px-2 sm:px-3 py-1.5 text-xs font-semibold text-[#1D271F] hover:text-[#05893E] transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-3.5 sm:px-4 py-1.5 rounded-lg bg-[#05893E] hover:bg-[#047F39] text-white text-xs font-semibold shadow-sm transition-all"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 sm:gap-6 overflow-x-auto py-2.5 border-t border-[#E1E8E1] scrollbar-none text-xs sm:text-sm font-medium text-[#1D271F]/80">
          <Link
            href="/"
            className={`whitespace-nowrap transition-colors ${
              pathname === "/" ? "text-[#05893E] font-bold" : "hover:text-[#05893E]"
            }`}
          >
            সব পণ্য
          </Link>
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className={`whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                  isActive ? "text-[#05893E] font-bold" : "hover:text-[#05893E]"
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>

      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 left-0 w-[290px] bg-white shadow-2xl z-50 flex flex-col justify-between p-5 overflow-y-auto">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E1E8E1]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#05893E] flex items-center justify-center p-1 shadow-2xs">
                    <img src="/logo-icon.png" alt="বাজার দর" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-lg font-black text-[#1D271F]">বাজার দর</span>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1D271F]/60 hover:bg-[#F0F5F0] transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-base"></i>
                </button>
              </div>

              {isAuthenticated && (
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 bg-[#F0F5F0] rounded-xl border border-[#E1E8E1] hover:bg-[#E5ECE5] transition-colors"
                >
                  <img
                    src={user?.avatar || DEFAULT_AVATAR}
                    alt={user?.name || DEFAULT_NAME}
                    className="w-10 h-10 rounded-full object-cover border border-white"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-[#1D271F] truncate">{user?.name || DEFAULT_NAME}</p>
                    <p className="text-[11px] text-[#1D271F]/60 truncate">{user?.email || DEFAULT_EMAIL}</p>
                  </div>
                </Link>
              )}

              <div className="space-y-1">
                <p className="text-[11px] font-bold text-[#1D271F]/50 uppercase tracking-wider px-2 mb-2">
                  ক্যাটাগরি সমূহ
                </p>

                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === "/"
                      ? "bg-[#05893E] text-white"
                      : "text-[#1D271F] hover:bg-[#F0F5F0]"
                  }`}
                >
                  <i className="fa-solid fa-layer-group text-xs"></i>
                  <span>সব পণ্য</span>
                </Link>

                {categories.map((cat) => {
                  const isActive = pathname === `/category/${cat.slug}`;
                  return (
                    <Link
                      key={cat.id || cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? "bg-[#05893E] text-white"
                          : "text-[#1D271F] hover:bg-[#F0F5F0]"
                      }`}
                    >
                      <span className="text-sm">{cat.icon}</span>
                      <span>{cat.nameBn}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E1E8E1] space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#D5DDD5] hover:bg-[#F0F5F0] text-xs font-semibold text-[#1D271F] transition-colors"
                  >
                    <i className="fa-regular fa-user text-xs text-[#05893E]"></i>
                    <span>আমার প্রোফাইল</span>
                  </Link>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-600 transition-colors cursor-pointer"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
                    <span>সাইন আউট</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-2.5 rounded-xl bg-[#05893E] hover:bg-[#047F39] text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    সাইন ইন
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-2.5 rounded-xl border border-[#D5DDD5] hover:bg-[#F0F5F0] text-xs font-semibold text-[#1D271F] transition-colors"
                  >
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

