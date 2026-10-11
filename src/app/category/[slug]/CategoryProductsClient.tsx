"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number | string; // may arrive as a number or Bengali text like "১,২৫০"
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type SortOption = "default" | "asc" | "desc";

const bn = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

const unitNames: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  gram: "প্রতি গ্রাম",
};

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

// Converts 1250, "1250", "১২৫০", "১,২৫০ টাকা" or "৳৯৯" to a real number.
// Returns NaN when the value cannot be read as a number.
function toNumber(value: number | string): number {
  if (typeof value === "number") return value;

  const ascii = value
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/[^\d.]/g, "");

  return ascii ? parseFloat(ascii) : NaN;
}

export default function CategoryProductsClient({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    if (sort === "default") return products; // original order

    return [...products].sort((a, b) => {
      const priceA = toNumber(a.today);
      const priceB = toNumber(b.today);

      // Unreadable prices always go to the end
      if (Number.isNaN(priceA) && Number.isNaN(priceB)) return 0;
      if (Number.isNaN(priceA)) return 1;
      if (Number.isNaN(priceB)) return -1;

      return sort === "asc" ? priceA - priceB : priceB - priceA;
    });
  }, [products, sort]);

  return (
    <>
      <div className="flex items-center justify-end gap-2 rounded-xl border border-[#e3ebe5] bg-[#f9fcfa] px-4 py-3">
        <label htmlFor="category-sort" className="text-sm text-gray-600">
          সাজান
        </label>

        <div className="relative">
          <select
            id="category-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="max-w-full appearance-none rounded-lg border border-[#dce7de] bg-white py-2 pl-3 pr-9 text-sm text-[#234b3d] outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>

          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#234b3d]"
            aria-hidden
          >
            <path d="M5 8l5 5 5-5" />
          </svg>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => {
          const direction = product.change?.dir ?? "flat";
          const percentage = Number(product.change?.pct ?? 0);
          const price = toNumber(product.today);

          const badgeStyle =
            direction === "up"
              ? "bg-red-50 text-red-600"
              : direction === "down"
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-500";

          const arrow =
            direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

          return (
            <Link
              key={product.id}
              href={`/product/${encodeURIComponent(product.slug)}`}
              className="block no-underline rounded-xl border border-[#e3ebe5] bg-[#f9fcfa] p-3 text-inherit transition-shadow hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eff4ef] text-2xl">
                  {product.image || product.categoryIcon || "🛒"}
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-[#17231b] no-underline sm:text-base">
                    {product.nameBn}
                  </h2>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {unitNames[product.unit] ?? `প্রতি ${product.unit}`}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-500">আজকের দাম</p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-base font-bold text-[#17231b]">
                    {Number.isNaN(price) ? "—" : `${bn.format(price)} টাকা`}
                  </p>

                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold ${badgeStyle}`}
                  >
                    {arrow} {bn.format(Math.abs(percentage))}%
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}