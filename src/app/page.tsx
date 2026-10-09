import HeroBanner from "@/components/HeroBanner";

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

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

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

async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const json: unknown = await response.json();

  // API response may be an array or an object containing products.
  if (Array.isArray(json)) {
    return json as Product[];
  }

  if (json && typeof json === "object") {
    const data = json as {
      products?: Product[];
      data?: Product[] | { products?: Product[] };
    };

    if (Array.isArray(data.products)) return data.products;
    if (Array.isArray(data.data)) return data.data;

    if (
      data.data &&
      !Array.isArray(data.data) &&
      Array.isArray(data.data.products)
    ) {
      return data.data.products;
    }
  }

  return [];
}

function ProductCard({ product }: { product: Product }) {
  const direction = product.change?.dir ?? "flat";
  const percentage = Number(product.change?.pct ?? 0);

  const badgeStyle =
    direction === "up"
      ? "bg-red-50 text-red-600"
      : direction === "down"
        ? "bg-green-50 text-green-700"
        : "bg-gray-100 text-gray-500";

  const arrow =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  return (
    <article className="rounded-xl border border-[#e3ebe5] bg-[#f9fcfa] p-3 transition-shadow hover:shadow-sm sm:p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eff4ef] text-2xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[#17231b] sm:text-base">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            {unitNames[product.unit] ?? `প্রতি ${product.unit}`}
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
    </article>
  );
}

function ProductSection({
  title,
  products,
  subtitle,
}: {
  title: string;
  products: Product[];
  subtitle?: string;
}) {
  return (
    <section className="mt-8 first:mt-0">
      <h2 className="text-lg font-extrabold text-[#17231b]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      )}

      {products.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">
          এই বিভাগে কোনো পণ্য নেই।
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default async function Page() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to fetch bazardor products:", error);

    return (
      <main className="min-h-screen bg-[#f0f5f1] p-6">
        <div className="mx-auto max-w-7xl rounded-xl bg-white p-5 text-red-600">
          বাজারদর লোড করা যায়নি। Terminal-এর error পরীক্ষা করো।
        </div>
      </main>
    );
  }

  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f0f5f1] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
      <HeroBanner />
        <ProductSection
          title="🔺 আজ দাম বেড়েছে"
          products={risers}
        />

        <ProductSection
          title="🟢 আজ দাম কমেছে"
          products={fallers}
        />

        <ProductSection
          title="সব পণ্য"
          subtitle={`মোট ${bn.format(products.length)}টি পণ্যের বর্তমান বাজারদর`}
          products={products}
        />
      </div>
    </main>
  );
}