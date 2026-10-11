"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [saving, setSaving] = useState(false);
  const [updatedName, setUpdatedName] = useState<string | null>(null);
  const okButtonRef = useRef<HTMLButtonElement>(null);

  function goToProfile() {
    router.push("/profile");
    router.refresh();
  }

  // While the pop-up is open: focus the button and close with Esc
  useEffect(() => {
    if (updatedName === null) return;

    okButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.push("/profile");
        router.refresh();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [updatedName, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    if (trimmed === currentName) {
      toast("নামে কোনো পরিবর্তন করা হয়নি", { icon: "ℹ️" });
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setSaving(false);

    if (error) {
      toast.error("তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    setUpdatedName(trimmed); // opens the pop-up
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            নাম
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-60"
        >
          {saving && <span className="loading loading-spinner loading-sm" />}
          তথ্য আপডেট করুন
        </button>
      </form>

      {/* Success pop-up */}
      {updatedName !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={goToProfile}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="update-success-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
              ✓
            </span>
            <h2
              id="update-success-title"
              className="mt-4 text-lg font-bold text-neutral-900"
            >
              তথ্য সফলভাবে আপডেট হয়েছে
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              আপনার নতুন নাম:{" "}
              <span className="font-semibold text-neutral-900">
                {updatedName}
              </span>
            </p>
            <button
              ref={okButtonRef}
              onClick={goToProfile}
              className="mt-5 w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}
    </>
  );
}