"use client";

import { useCallback, useEffect, useState } from "react";

// The browser's install prompt arrives once, possibly before any screen mounts,
// so it is kept here and shared with whoever shows an "install" button.
type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };

const CHANGE_EVENT = "tv-english-install-change";
let deferred: InstallPromptEvent | null = null;
let started = false;

export function startPwa() {
  if (started || typeof window === "undefined") return;
  started = true;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as InstallPromptEvent;
    window.dispatchEvent(new Event(CHANGE_EVENT));
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    window.dispatchEvent(new Event(CHANGE_EVENT));
  });

  // Only in production builds: a service worker would fight with dev hot-reloading.
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    const register = () => void navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }
}

export function useInstallPrompt() {
  const [canInstall, setCanInstall] = useState(false);
  useEffect(() => {
    const sync = () => setCanInstall(!!deferred);
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, []);
  const install = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice.catch(() => null);
    deferred = null;
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);
  return { canInstall, install };
}

// Drop cached vocabulary (e.g. on sign-out).
export function clearOfflineData() {
  if (typeof navigator !== "undefined" && navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage({ type: "clear-data" });
  }
}
