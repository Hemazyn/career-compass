"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("cc-theme", next ? "dark" : "light");
    } catch {
      /* private mode — ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "text-ink-2 hover:bg-surface-2 hover:text-ink relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200",
        className
      )}
    >
      <Sun className={cn("h-[18px] w-[18px] transition-all duration-300", dark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100")} />
      <Moon className={cn("absolute h-[18px] w-[18px] transition-all duration-300", dark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0")} />
    </button>
  );
}
