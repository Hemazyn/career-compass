import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container size="md" className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="bg-brand-600 dark:bg-brand-500 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-[var(--shadow-soft-brand)]">
        <Compass className="h-7 w-7" />
      </div>
      <p className="text-brand-600 dark:text-brand-400 font-mono text-sm font-semibold tracking-widest uppercase">
        404 · Off the map
      </p>
      <h1 className="text-ink mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        This path doesn&apos;t exist
      </h1>
      <p className="text-ink-2 mt-4 max-w-md">
        Like a wrong UTME subject combination, this URL leads nowhere. Let&apos;s get you back to a
        route that works.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" size="lg" icon={<Compass className="h-5 w-5" />}>
          Back to home
        </Button>
        <Button href="/careers" variant="secondary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
          Explore careers
        </Button>
      </div>
      <p className="text-ink-3 mt-8 text-sm">
        Or take the quiz — it knows exactly where you are.{" "}
        <Link href="/quiz" className="text-brand-600 hover:underline dark:text-brand-400">
          Start here →
        </Link>
      </p>
    </Container>
  );
}
