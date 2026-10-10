
import Link from "next/link";
import Footer from "@/components/Footer";
import CategoryProductsClient from "./CategoryProductsClient";

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

type Category = {
  id?: string | number;
  slug: string;
  nameBn: string;
  icon: string;
};

const API = "https://api.abcz.workers.dev/api/bazardor";

function normalize(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

function extractArray(json: unknown, key: string): unknown[] {
  if (Array.isArray(json)) return json;

  if (json && typeof json === "object") {
    const obj = json as Record<string, unknown>;

    if (Array.isArray(obj[key])) return obj[key] as unknown[];

    if (Array.isArray(obj.data)) return obj.data;

    if (obj.data && typeof obj.data === "object") {
      const data = obj.data as Record<string, unknown>;
      if (Array.isArray(data[key])) return data[key] as unknown[];
    }
  }

  return [];
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API}/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
  const details = await res.text();
  throw new Error(
    `Could not load categories: ${res.status} ${details}`
  );
}

  const json: unknown = await res.json();

  return extractArray(json, "categories").map((item) => {
    const c = item as Record<string, unknown>;

    return {
      id: c.id as string | number | undefined,
      slug: String(c.slug ?? ""),
      nameBn: String(
        c.nameBn ?? c.categoryNameBn ?? c.name ?? c.title ?? ""
      ),
      icon: String(
        c.categoryIcon ?? c.icon ?? c.emoji ?? "🛒"
      ),
    };
  });
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
  const details = await res.text();
  throw new Error(
    `Could not load categories: ${res.status} ${details}`
  );
}

  const json: unknown = await res.json();

  return extractArray(json, "products") as Product[];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let categories: Category[];
  let products: Product[];

  try {
    [categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);
  } catch (error) {
    console.error("Category API error:", error);

    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center">
        <main className="flex min-h-[50vh] items-center justify-center p-6">
          <section className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-bold text-gray-950">
              তথ্য লোড করা যায়নি
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              আবার চেষ্টা করুন অথবা হোম পেজে ফিরে যান।
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-emerald-700 px-5 py-3 text-white no-underline"
            >
              হোম পেজে ফিরে যান
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Match the URL slug to the category returned by the API.
 const categoryNames: Record<string, string> = {
  rice: "চাল",
  chal: "চাল",
  dal: "ডাল",
  lentils: "ডাল",
  oil: "তেল",
  tel: "তেল",
  vegetables: "সবজি",
  vegetable: "সবজি",
  sobji: "সবজি",
  fish: "মাছ",
  mach: "মাছ",
  meat: "মাংস",
  mangsho: "মাংস",
  spices: "মসলা",
  mosla: "মসলা",
  "eggs-dairy": "ডিম-দুধ",
  "egg-milk": "ডিম-দুধ",
  "dim-dudh": "ডিম-দুধ",
};

const category = categories.find(
  (c) =>
    c.slug?.toLowerCase() === slug.toLowerCase() ||
    c.nameBn === categoryNames[slug.toLowerCase()]
);

  if (!category) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f0f6f1]">
        <main className="flex flex-1 items-center justify-center p-6">
          <section className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mb-4 text-5xl">🛒</div>
            <h1 className="mb-3 text-xl font-bold">
              এই বিভাগটি পাওয়া যায়নি
            </h1>
            <Link
              href="/"
              className="inline-block rounded-lg bg-emerald-700 px-5 py-3 text-white no-underline"
            >
              হোম পেজে ফিরে যান
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Filter products using the category slug and, as a fallback,
  // the category's Bengali name.
  const categoryProducts = products.filter((product) => {
    const productCategory = normalize(product.category);

    return (
      productCategory === normalize(category.slug) ||
      productCategory === normalize(category.nameBn) ||
      normalize(product.categoryNameBn) === normalize(category.nameBn)
    );
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f6f1]">
      <main className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-6xl">
          <section className="mb-5 flex items-center gap-4 rounded-xl border border-[#e0e9e2] bg-[#f9fcfa] p-4 sm:p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#edf4ee] text-3xl">
              {category.icon}
            </div>

            <div>
              

<h1 className="text-2xl font-bold text-gray-950">
  {categoryNames[slug.toLowerCase()] ?? category.nameBn}
</h1>


              <p className="mt-1 text-sm text-gray-500">
                আজকের বাজারদর ও পণ্যের দামের পরিবর্তন
              </p>
            </div>
          </section>

          <p className="mb-3 text-sm text-gray-500">
            মোট {new Intl.NumberFormat("bn-BD").format(categoryProducts.length)}টি পণ্য
            দেখানো হচ্ছে
          </p>

          {categoryProducts.length > 0 ? (
            <CategoryProductsClient products={categoryProducts} />
          ) : (
            <section className="rounded-xl border border-[#e0e9e2] bg-[#f9fcfa] px-5 py-12 text-center">
              <div className="mb-4 text-5xl">🛒</div>
              <h2 className="mb-3 text-xl font-bold text-gray-900">
                এই বিভাগে কোনো পণ্য পাওয়া যায়নি
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                অন্য বিভাগ দেখুন অথবা হোম পেজে ফিরে যান।
              </p>
              <Link
                href="/"
                className="inline-block rounded-lg bg-emerald-700 px-5 py-3 text-white no-underline hover:bg-emerald-800"
              >
                হোম পেজে ফিরে যান
              </Link>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
