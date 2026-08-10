interface CareerCompassCardProps {
  title: string;
  subtitle?: string;
}

/** Branded OG card body — must only use inline styles (satori-friendly). */
export function CareerCompassCard({ title, subtitle }: CareerCompassCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #072115 0%, #175a37 55%, #2b8a57 100%)",
        fontFamily: "sans-serif",
        color: "white",
        padding: 64,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "#1c6f43",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          🧭
        </div>
        <span style={{ fontWeight: 700, letterSpacing: 1 }}>Career Compass</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ display: "flex", fontSize: 30, color: "#d8eee0", marginTop: 28, maxWidth: 800 }}>
            {subtitle}
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            background: "#fbbf24",
            color: "#072115",
            fontSize: 26,
            fontWeight: 700,
            padding: "16px 36px",
            borderRadius: 14,
          }}
        >
          Free · 3 minutes · No sign-up
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#b2dcc3" }}>
          From JSS3 stream choice to post-NYSC pivots
        </div>
      </div>
    </div>
  );
}
