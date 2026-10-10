
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
  today: number;
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

export default function CategoryProductsClient({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "asc") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "desc") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <>
      <div className="flex items-center justify-end gap-2 rounded-xl border border-[#e3ebe5] bg-[#f9fcfa] px-4 py-3">
        <label
          htmlFor="category-sort"
          className="text-sm text-gray-600"
        >
          সাজান
        </label>

        <select
          id="category-sort"
          value={sort}
          onChange={(event) =>
            setSort(event.target.value as SortOption)
          }
          className="max-w-full rounded-lg border border-[#dce7de] bg-white px-3 py-2 text-sm text-[#234b3d] outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => {
          const direction = product.change?.dir ?? "flat";
          const percentage = Number(product.change?.pct ?? 0);

          const badgeStyle =
            direction === "up"
              ? "bg-red-50 text-red-600"
              : direction === "down"
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-500";

          const arrow =
            direction === "up"
              ? "▲"
              : direction === "down"
                ? "▼"
                : "—";

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
                    {unitNames[product.unit] ??
                      `প্রতি ${product.unit}`}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-500">আজকের দাম</p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-base font-bold text-[#17231b]">
                    {bn.format(product.today)} টাকা
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