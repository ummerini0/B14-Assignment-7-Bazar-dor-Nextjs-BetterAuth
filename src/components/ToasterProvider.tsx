"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{ duration: 3500, style: { fontSize: "14px" } }}
    />
  );
}