"use client";

import Image from "next/image";

export default function HeroBanner() {
  const currentDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <section className="px-4 py-5 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 rounded-[22px] border border-[#e2ebe5] bg-[#f9fcfa] px-5 py-6 sm:px-8 md:grid-cols-[1.5fr_0.8fr]">
        <div>
          <span className="inline-flex rounded-full bg-[#e1f1e7] px-3 py-1 text-xs font-medium text-[#07833d]">
            {currentDate}
          </span>

          <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[#101c16] sm:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-width: 530px; text-sm leading-6 text-[#68776e]">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম –
            বাজারের সর্বনিম্ন, সর্বোচ্চ এবং দামের পরিবর্তন
            এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md border border-[#159447] px-5 py-2 text-sm font-semibold text-[#087d38] transition-colors hover:bg-[#138b43] hover:text-white"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="তাজা সবজির ঝুড়ি"
            width={240}
            height={210}
            priority
            className="h-auto w-full max-width: 240px; object-contain"
          />
        </div>
      </div>
    </section>
  );
}