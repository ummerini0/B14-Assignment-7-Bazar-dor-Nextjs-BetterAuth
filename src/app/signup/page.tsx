"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthCard from "@/components/AuthCard";
import { authClient } from "@/lib/auth-client";
import { banglaAuthError } from "@/lib/auth-errors";

export default function SignUpPage() {
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
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (!name) return fail("আপনার নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("সঠিক ইমেইল দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মিলছে না");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      return fail(
        banglaAuthError(error, "অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন"),
      );
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <AuthCard
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
      footerText="অ্যাকাউন্ট আছে?"
      footerLinkText="সাইন ইন করুন"
      footerHref="/signin"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div role="alert" className="alert alert-error alert-soft py-2 text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            নাম
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="input w-full"
          />
        </div>

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
            autoComplete="new-password"
            className="input w-full"
          />
        </div>

        <div>
          <label htmlFor="confirm" className="mb-1 block text-sm font-medium">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            className="input w-full"
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />}
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>
    </AuthCard>
  );
}