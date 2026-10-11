import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateForm from "./UpdateForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <Link
        href="/profile"
        className="text-xs text-neutral-500 hover:text-neutral-800"
      >
        ← প্রোফাইলে ফিরে যান
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-neutral-900">
        তথ্য আপডেট করুন
      </h1>
      <p className="mb-6 text-xs text-neutral-500">
        আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
      </p>

      <UpdateForm currentName={session.user.name} />
    </div>
  );
}