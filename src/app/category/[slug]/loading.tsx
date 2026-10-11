export default function CategoryLoading() {
  return (
    <div
      className="bg-[#f0f5f1] px-4 py-6 sm:px-6"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4 rounded-xl border border-[#e3ebe5] bg-white p-5">
          <div className="skeleton size-14 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-5 w-36" />
            <div className="skeleton h-3 w-64 max-w-full" />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <div className="skeleton h-10 w-56 rounded-lg" />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-[#e3ebe5] bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="skeleton size-11 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-24" />
                  <div className="skeleton h-3 w-20" />
                </div>
              </div>
              <div className="skeleton mt-5 h-3 w-20" />
              <div className="skeleton mt-2 h-5 w-28" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}