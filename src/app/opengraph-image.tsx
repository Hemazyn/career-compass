import { ImageResponse } from "next/og";
import { CareerCompassCard } from "@/components/og/CareerCompassCard";

export const alt = "Career Compass — Find your path, Nigeria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    <CareerCompassCard
      title="Your career is a map, not a guess."
      subtitle="Trace any Nigerian career backwards — stream, JAMB subjects, O'Level, course."
    />,
    size
  );
}
