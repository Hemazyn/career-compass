"use client";

import { Compass, RefreshCcw } from "lucide-react";
import { Container } from "@/components/ui";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container size="md" className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="bg-brand-600 dark:bg-brand-500 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-white">
        <Compass className="h-7 w-7" />
      </div>
      <h1 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
        Something went off-course
      </h1>
      <p className="text-ink-2 mt-4 max-w-md">
        An unexpected error occurred while loading this page. It&apos;s not your fault — give it
        another try.
      </p>
      {error.digest && <p className="text-ink-3 mt-4 font-mono text-xs">Ref: {error.digest}</p>}
      <button
        onClick={reset}
        className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400 mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-colors"
      >
        <RefreshCcw className="h-4 w-4" /> Try again
      </button>
    </Container>
  );
}
