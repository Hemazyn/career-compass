import { Plus } from "lucide-react";
import { Container, Reveal, SectionHeader } from "@/components/ui";
import { FAQ_ITEMS } from "@/data/faq";

export function FAQSection() {
  return (
    <section className="py-24" id="faq">
      <Container size="md">
        <Reveal>
          <SectionHeader
            eyebrow="FAQ"
            title="Questions? Answered."
            description="The things parents and students ask us most — straight answers, no jargon."
          />
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 max-w-2xl space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={item.question}
              className="group border-line bg-surface shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] overflow-hidden rounded-2xl border transition-all duration-300"
              open={i === 0}
            >
              <summary className="text-ink flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-semibold select-none [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="bg-surface-2 text-ink-2 group-open:bg-brand-600 group-open:text-white flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300">
                  <Plus className="h-4 w-4 transition-transform duration-300 group-open:rotate-45" />
                </span>
              </summary>
              <p className="text-ink-2 border-line px-6 pb-6 text-sm leading-relaxed border-t pt-4">
                {item.answer}
              </p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
