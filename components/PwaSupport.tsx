"use client";

import { useEffect } from "react";
import { startPwa } from "@/lib/pwa";

// Mounted once in the root layout: registers the service worker and listens for the install prompt.
export default function PwaSupport() {
  useEffect(() => {
    startPwa();
  }, []);
  return null;
}
