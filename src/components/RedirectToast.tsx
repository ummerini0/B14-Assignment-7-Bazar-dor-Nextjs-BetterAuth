"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function RedirectToast() {
  const params = useSearchParams();
  const router = useRouter();
  const reason = params.get("reason");

  useEffect(() => {
    if (reason === "login-required") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
      router.replace("/signin"); // removes ?reason so a refresh doesn't repeat it
    }
  }, [reason, router]);

  return null;
}