
export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full border-t border-[#e1e9e3] bg-[#f0f5f1]">
      <div className="mx-auto flex min-height: 42px; w-full max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
        <p className="text-[11px] leading-5 text-[#234b3d] sm:text-xs">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-right text-[11px] leading-5 text-[#234b3d] sm:text-xs">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}