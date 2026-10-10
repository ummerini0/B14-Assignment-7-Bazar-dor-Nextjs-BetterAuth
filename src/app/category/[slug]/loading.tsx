
export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f0f5f1] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="flex items-center gap-4 rounded-xl border border-[#e3ebe5] bg-white p-5">
          <div className="size-14 rounded-xl bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-36 rounded bg-gray-200" />
            <div className="h-3 w-64 max-w-full rounded bg-gray-100" />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <div className="h-10 w-56 rounded-lg bg-gray-200" />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-[#e3ebe5] bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-3 w-20 rounded bg-gray-100" />
                </div>
              </div>
              <div className="mt-5 h-3 w-20 rounded bg-gray-100" />
              <div className="mt-2 h-5 w-28 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}