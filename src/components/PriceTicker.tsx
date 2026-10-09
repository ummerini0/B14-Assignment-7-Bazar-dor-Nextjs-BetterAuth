type Product = {
  id: number;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
};

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const bnNumber = new Intl.NumberFormat("bn-BD");
const bnPercent = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

async function getProducts(): Promise<Product[]> {
  try {
    // Refresh the data at most every 5 minutes
    const res = await fetch(API_URL, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return (await res.json()) as Product[];
  } catch {
    return [];
  }
}

function Change({ dir, pct }: Product["change"]) {
  if (dir === "up") {
    return (
      <span className="font-semibold text-red-600">
        ▲ {bnPercent.format(Math.abs(pct))}%
      </span>
    );
  }
  if (dir === "down") {
    return (
      <span className="font-semibold text-green-600">
        ▼ {bnPercent.format(Math.abs(pct))}%
      </span>
    );
  }
  return <span className="font-semibold text-neutral-400">–</span>;
}

export default async function PriceTicker() {
  const products = await getProducts();
  if (products.length === 0) return null;

  return (
    <div
      className="ticker overflow-hidden border-b border-neutral-200 bg-white"
      aria-label="আজকের বাজার দর"
    >
      <div className="ticker-track flex w-max">
        {/* The list is rendered twice so the loop never shows a gap */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {products.map((p) => (
              <li
                key={`${copy}-${p.id}`}
                className="flex items-center gap-2 whitespace-nowrap border-r border-neutral-100 px-5 py-2.5 text-sm"
              >
                <span aria-hidden>{p.image}</span>
                <span className="font-medium text-neutral-800">{p.nameBn}</span>
                <span className="text-neutral-600">
                  {bnNumber.format(p.today)} টাকা/{unitBn[p.unit] ?? p.unit}
                </span>
                <Change {...p.change} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}