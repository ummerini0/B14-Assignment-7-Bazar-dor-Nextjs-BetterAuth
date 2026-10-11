"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

type Props = {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
  children: React.ReactNode;
};

export default function AuthCard({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerHref,
  children,
}: Props) {
  const [busy, setBusy] = useState<"google" | "github" | null>(null);

  async function social(provider: "google" | "github") {
    setBusy(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      toast.error("সোশ্যাল সাইন ইন করা যায়নি, আবার চেষ্টা করুন");
      setBusy(null);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 py-12">
      <h1 className="text-center text-2xl font-bold text-neutral-900">
        {title}
      </h1>
      <p className="mt-1 mb-6 text-center text-xs text-neutral-500">
        {subtitle}
      </p>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        {children}

        <div className="divider my-4 text-xs text-neutral-500">অথবা</div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => social("google")}
            disabled={busy !== null}
            className="btn btn-sm h-10 border-base-300 bg-white"
          >
            {busy === "google" ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden>
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
                />
              </svg>
            )}
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={() => social("github")}
            disabled={busy !== null}
            className="btn btn-sm h-10 border-base-300 bg-white"
          >
            {busy === "github" ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path
                  fill="currentColor"
                  d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
                />
              </svg>
            )}
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-neutral-600">
          {footerText}{" "}
          <Link href={footerHref} className="font-semibold text-green-700">
            {footerLinkText}
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 text-center text-xs text-neutral-500 hover:text-neutral-800"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}