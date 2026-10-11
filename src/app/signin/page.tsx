"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthCard from "@/components/AuthCard";
import { authClient } from "@/lib/auth-client";
import { banglaAuthError } from "@/lib/auth-errors";

import { Suspense } from "react";
import RedirectToast from "@/components/RedirectToast";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fail(message: string) {
    setError(message);
    toast.error(message);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) return fail("ইমেইল ও পাসওয়ার্ড দিন");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      return fail(banglaAuthError(error, "সাইন ইন করা যায়নি, আবার চেষ্টা করুন"));
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh();
  }
  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
    provider: "google",
  });
  } 
  return (
    <>
    <Suspense fallback={null}>
      <RedirectToast />
    </Suspense>
    <AuthCard
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
      footerText="অ্যাকাউন্ট নেই?"
      footerLinkText="সাইন আপ করুন"
      footerHref="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div role="alert" className="alert alert-error alert-soft py-2 text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            ইমেইল
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="input w-full"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="input w-full"
          />
        </div>

        <button onClick= {handleGoogleSignIn} type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />}
          সাইন ইন
        </button>
      </form>
    </AuthCard>
    </>
  );
}