export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 px-4 py-10">
      <div className="skeleton h-8 w-40" />
      <div className="skeleton h-24 w-full" />
      <div className="skeleton h-48 w-full" />
    </div>
  );
}