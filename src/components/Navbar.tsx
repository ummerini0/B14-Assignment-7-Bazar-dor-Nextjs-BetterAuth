"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

type NavUser = {
  name: string;
  image?: string | null;
};

type NavbarProps = {
  user?: NavUser | null;
  onSignOut?: () => void;
};

const categories = [
  { label: "চাল", slug: "rice", icon: "🍚" },
  { label: "ডাল", slug: "dal", icon: "🫘" },
  { label: "তেল", slug: "oil", icon: "🛢️" },
  { label: "সবজি", slug: "vegetables", icon: "🥬" },
  { label: "মাছ", slug: "fish", icon: "🐟" },
  { label: "মাংস", slug: "meat", icon: "🍗" },
  { label: "ডিম-দুধ", slug: "egg-milk", icon: "🥛" },
  { label: "মসলা", slug: "spices", icon: "🌶️" },
];

// Example output: মঙ্গলবার, ৬ অক্টোবর, ২০২৬
function formatBanglaDate(date: Date) {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return `${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`;
}

// Server renders an empty date, the browser fills it in (no hydration mismatch)
const subscribe = () => () => {};
const getClientDate = () => formatBanglaDate(new Date());
const getServerDate = () => "";

export default function Navbar({ user = null, onSignOut }: NavbarProps) {
  const pathname = usePathname();
  const today = useSyncExternalStore(subscribe, getClientDate, getServerDate);

  return (
    <header className="border-t-2 border-violet-400 bg-white">
      {/* Row 1: logo + date, auth */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-xl shadow-sm">
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-bold text-neutral-900">
              বাজার দর
            </span>
            <span className="block min-h-4 text-xs text-neutral-500">
              {today}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-neutral-100"
              >
                <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-sm font-semibold text-neutral-600">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </span>
                <span className="hidden text-sm font-medium text-neutral-800 sm:block">
                  {user.name}
                </span>
                <span className="text-[10px] text-neutral-400">▼</span>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-2 w-48 rounded-box bg-white p-2 shadow-lg"
              >
                <li>
                  <Link href="/profile">আমার প্রোফাইল</Link>
                </li>
                <li>
                  <Link href="/orders">আমার অর্ডার</Link>
                </li>
                <li>
                  <button onClick={onSignOut}>সাইন আউট</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/sign-in" className="btn btn-ghost btn-sm">
                সাইন ইন
              </Link>
              <Link
                href="/sign-up"
                className="btn btn-sm border-green-600 bg-green-600 text-white hover:bg-green-700"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Row 2: category links */}
      
<nav className="border-t border-neutral-100 bg-green-50/40">
  <ul className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2 scrollbar-width: none;">
    {categories.map((c) => {
      const slug = c.slug === "rice" ? "chal" : c.slug;
      const href = `/category/${slug}`;
      const active = pathname === href || pathname.startsWith(`${href}/`);

      return (
        <li key={c.slug} className="shrink-0">
          <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
              active
                ? "bg-green-600 font-semibold text-white shadow-sm"
                : "text-neutral-700 hover:bg-green-100"
            }`}
          >
            <span aria-hidden>{c.icon}</span>
            {c.label}
          </Link>
        </li>
      );
    })}
  </ul>
</nav>


    </header>
  );
}