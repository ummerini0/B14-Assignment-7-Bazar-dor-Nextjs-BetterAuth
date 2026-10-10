
import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image?: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: string; pct: number };
  markets: Market[];
};

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(API_URL, { cache: "no-store" });

    if (!response.ok) return null;

    const data = await response.json();

    const products: Product[] = Array.isArray(data)
      ? data
      : data.products ?? data.data ?? [];

    return products.find((item) => item.slug === slug) ?? null;
  } catch {
    return null;
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const prices = product.markets.flatMap((market) => [
    market.min,
    market.max,
  ]);

  const minPrice = prices.length ? Math.min(...prices) : product.today;
  const maxPrice = prices.length ? Math.max(...prices) : product.today;
  const avgPrice = prices.length
    ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length)
    : product.today;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            হোম
          </Link>
          {" / "}
          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-600"
          >
            {product.categoryNameBn}
          </Link>
          {" / "}
          <span className="text-gray-800">{product.nameBn}</span>
        </nav>

        <section className="mb-6 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-green-50 text-5xl">
              {product.image || product.categoryIcon}
            </div>

            <div className="flex-1">
              <p className="mb-2 text-sm text-green-700">
                {product.categoryNameBn}
              </p>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                একক: {product.unit === "kg" ? "কেজি" : product.unit}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">আজকের দাম</p>
              <p className="text-3xl font-bold text-green-700">
                ৳{product.today}
                <span className="text-sm font-normal text-gray-500">
                  /{product.unit === "kg" ? "কেজি" : product.unit}
                </span>
              </p>
              <p
                className={`mt-1 text-sm ${
                  product.change.dir === "up"
                    ? "text-red-600"
                    : product.change.dir === "down"
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {Math.abs(product.change.pct)}%
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-2 text-2xl font-bold text-green-700">
              ৳{minPrice}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">গড় দাম</p>
            <p className="mt-2 text-2xl font-bold text-blue-700">
              ৳{avgPrice}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
            <p className="mt-2 text-2xl font-bold text-red-600">
              ৳{maxPrice}
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="border-b p-5">
            <h2 className="text-lg font-bold text-gray-900">
              বাজারভিত্তিক দামের তুলনা
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-4">বাজার</th>
                  <th className="p-4">বিভাগ</th>
                  <th className="p-4">সর্বনিম্ন দাম</th>
                  <th className="p-4">সর্বোচ্চ দাম</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t hover:bg-green-50"
                  >
                    <td className="p-4 font-medium">{market.market}</td>
                    <td className="p-4">{market.division}</td>
                    <td className="p-4 text-green-700">৳{market.min}</td>
                    <td className="p-4 text-red-600">৳{market.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-6">
          <Link href="/" className="text-sm font-medium text-green-700 hover:underline">
            ← হোম পেজে ফিরে যাও
          </Link>
        </div>
      </div>
    </main>
  );
}