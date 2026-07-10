import { ImageResponse } from "next/og";
import { STREAM_INFO } from "@/data/quiz";
import type { Stream } from "@/types";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Career Compass stream result";

const STREAM_EMOJI: Record<Stream, string> = {
  science: "🔬",
  art: "🎨",
  commercial: "💼",
};

export default async function OgImage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  const s = (["science", "art", "commercial"].includes(stream) ? stream : "science") as Stream;
  const info = STREAM_INFO[s];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0c2011 0%, #24572d 60%, #398a44 100%)",
        fontFamily: "sans-serif",
        color: "white",
        padding: 60,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36 }}>
        <span>🧭</span>
        <span style={{ fontWeight: 700, letterSpacing: 1 }}>Career Compass</span>
      </div>
      <div style={{ display: "flex", fontSize: 30, color: "#b0d9b3", marginTop: 40 }}>
        My recommended SSS stream is…
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          fontSize: 120,
          fontWeight: 800,
          marginTop: 10,
          color: "#fbbf24",
        }}
      >
        <span>{STREAM_EMOJI[s]}</span>
        <span>{info.label.toUpperCase()}</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#d7ecd8",
          marginTop: 36,
          textAlign: "center",
        }}
      >
        {info.opens[0]} · {info.opens[1]}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          background: "#fbbf24",
          color: "#0c2011",
          fontSize: 28,
          fontWeight: 700,
          padding: "18px 44px",
          borderRadius: 16,
        }}
      >
        Find YOUR stream — free 3-min quiz
      </div>
    </div>,
    size
  );
}
