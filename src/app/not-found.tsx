import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-20 text-center">
      <span className="text-6xl" aria-hidden>
        🛒
      </span>
      <h1 className="mt-4 text-5xl font-bold text-green-700">৪০৪</h1>
      <h2 className="mt-2 text-xl font-bold text-neutral-900">
        পেজটি খুঁজে পাওয়া যায়নি
      </h2>
      <p className="mt-2 text-sm text-neutral-600">
        আপনি যে পেজটি খুঁজছেন তা হয়তো সরানো হয়েছে, অথবা ঠিকানাটি ভুল।
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}