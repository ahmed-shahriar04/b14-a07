"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const DEFAULT_NAME = "Shahriar Ahmed Riaz";
export const DEFAULT_EMAIL = "riaz.bazardor@gmail.com";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncSession = async () => {
    try {
      const res = await authClient.getSession();
      if (res?.data?.user) {
        setUser({
          ...res.data.user,
          avatar: res.data.user.image || DEFAULT_AVATAR,
        });
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    syncSession();
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড প্রদান করুন");
      setLoading(false);
      return false;
    }

    if (password.length < 6) {
      toast.error("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে");
      setLoading(false);
      return false;
    }

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res?.error) {
        toast.error(res.error.message || "লগইন ব্যর্থ হয়েছে");
        setLoading(false);
        return false;
      }

      if (res?.data?.user) {
        setUser({
          ...res.data.user,
          avatar: res.data.user.image || DEFAULT_AVATAR,
        });
        toast.success("লগইন সফল হয়েছে");
        setLoading(false);
        return true;
      }
    } catch (err) {
      toast.error(err?.message || "লগইন করতে সমস্যা হয়েছে");
      setLoading(false);
      return false;
    }

    setLoading(false);
    return false;
  };

  const signUp = async (name, email, password, division = "ঢাকা") => {
    setLoading(true);

    if (!name || !email || !password) {
      toast.error("সবগুলো তথ্য পূরণ করুন");
      setLoading(false);
      return false;
    }

    if (password.length < 6) {
      toast.error("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে");
      setLoading(false);
      return false;
    }

    try {
      const res = await authClient.signUp.email({
        name,
        email,
        password,
        image: DEFAULT_AVATAR,
      });

      if (res?.error) {
        toast.error(res.error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
        setLoading(false);
        return false;
      }

      if (res?.data?.user) {
        setUser({
          ...res.data.user,
          avatar: res.data.user.image || DEFAULT_AVATAR,
        });
        toast.success("রেজিস্ট্রেশন সফল হয়েছে");
        setLoading(false);
        return true;
      }
    } catch (err) {
      toast.error(err?.message || "রেজিস্ট্রেশন করতে সমস্যা হয়েছে");
      setLoading(false);
      return false;
    }

    setLoading(false);
    return false;
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const callbackURL = typeof window !== "undefined" ? `${window.location.origin}/` : "/";
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
      if (res?.error) {
        toast.error(res.error.message || "Google সাইন ইন ব্যর্থ হয়েছে");
        setLoading(false);
        return false;
      }
      return true;
    } catch (err) {
      toast.error(err?.message || "Google সাইন ইন করতে সমস্যা হয়েছে");
      setLoading(false);
      return false;
    }
  };

  const signInWithGithub = async () => {
    setLoading(true);
    try {
      const callbackURL = typeof window !== "undefined" ? `${window.location.origin}/` : "/";
      const res = await authClient.signIn.social({
        provider: "github",
        callbackURL,
      });
      if (res?.error) {
        toast.error(res.error.message || "GitHub সাইন ইন ব্যর্থ হয়েছে");
        setLoading(false);
        return false;
      }
      return true;
    } catch (err) {
      toast.error(err?.message || "GitHub সাইন ইন করতে সমস্যা হয়েছে");
      setLoading(false);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
    } catch {}
    setUser(null);
    try {
      localStorage.removeItem("bazardor_session");
    } catch {}
    toast.success("সাইন আউট সম্পন্ন হয়েছে");
  };

  const updateProfile = async (updated) => {
    if (!user) return;
    try {
      if (authClient.updateUser) {
        await authClient.updateUser(updated);
      }
    } catch {}
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
    toast.success("প্রোফাইল আপডেট করা হয়েছে");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithGithub,
        signOut,
        updateProfile,
        syncSession,
        isAuthenticated: !!user,
        DEFAULT_AVATAR,
        DEFAULT_NAME,
        DEFAULT_EMAIL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

