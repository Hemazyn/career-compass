"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Smartphone, X } from "lucide-react";
import { SITE_NAME } from "@/lib/site";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error — non-standard iOS Safari property
      navigator.standalone === true;
    if (isStandalone) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setDeferred(null);
      setShowIosHint(false);
      setDismissed(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    // iOS Safari has no beforeinstallprompt — show a gentle "Add to Home Screen" hint.
    const isIosSafari = /iphone|ipad|ipod/i.test(navigator.userAgent) && !isStandalone;
    if (isIosSafari) {
      timerRef.current = window.setTimeout(() => setShowIosHint(true), 8000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  async function handleInstall() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setDismissed(true);
  }

  function dismiss() {
    setDeferred(null);
    setShowIosHint(false);
    setDismissed(true);
  }

  if (dismissed || (!deferred && !showIosHint)) return null;

  return (
    <div
      role="dialog"
      aria-label="Install app"
      className="border-line bg-surface shadow-[var(--shadow-pop)] fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl border p-4"
    >
      <span className="bg-brand-600 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white">
        {showIosHint ? <Smartphone className="h-5 w-5" /> : <Download className="h-5 w-5" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-ink text-sm font-semibold">
          {showIosHint ? "Install on your Home Screen" : `Install ${SITE_NAME}`}
        </p>
        <p className="text-ink-3 text-xs leading-relaxed">
          {showIosHint
            ? "Tap Share, then “Add to Home Screen” for one-tap access."
            : "Get offline access and one-tap opening — free, no account."}
        </p>
      </div>
      {!showIosHint && (
        <button
          type="button"
          onClick={handleInstall}
          className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400 shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold text-white transition-colors"
        >
          Install
        </button>
      )}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss install prompt"
        className="text-ink-3 hover:text-ink shrink-0 rounded-lg p-1.5 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
