import { ArrowRight } from 'lucide-react';
import { Container, Button } from '@/components/ui';

export function CTASection() {
  return (
    <section className="py-20">
      <Container size="sm">
        <div className="text-center">
          <h2 className="text-text-primary text-3xl font-extrabold tracking-tight sm:text-4xl">Your future shouldn&apos;t depend on luck.</h2>
          <p className="text-text-secondary mx-auto mt-4 max-w-md text-base leading-relaxed sm:text-lg">
            3 minutes. No sign-up. No cost.
            <br />
            Just a clear map from where you are to where you want to be.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="/quiz" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              Start the quiz
            </Button>
            <Button href="/careers" variant="secondary" size="lg">
              Browse careers
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
