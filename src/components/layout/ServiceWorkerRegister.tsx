"use client";

import { useEffect } from "react";

/**
 * Registers the service worker for offline support and installability.
 * Registration is production-only: in development the worker would cache
 * hot-reload chunks and stale dev HTML, causing confusing behaviour.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* Service workers unsupported or blocked — the site still works. */
    });
  }, []);

  return null;
}
