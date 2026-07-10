import { HeroSection, BrokenChainSection, ReversePathSection, WhoIsThisForSection, StatsSection, PivotSection, CTASection } from '@/components/home';
import { Divider } from '@/components/ui';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrokenChainSection />
      <Divider className="mx-auto max-w-5xl px-4" />
      <ReversePathSection />
      <WhoIsThisForSection />
      <StatsSection />
      <Divider className="mx-auto max-w-5xl px-4" />
      <PivotSection />
      <CTASection />
    </>
  );
}
