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
        <svg width="56" height="56" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="cc-og-logo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2b8a57" />
              <stop offset="1" stopColor="#14472e" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="url(#cc-og-logo)" />
          <circle cx="32" cy="32" r="17.5" fill="none" stroke="#f4faf6" strokeWidth="3.5" />
          <path d="M32 14.5 L37.5 32 L32 49.5 L26.5 32 Z" fill="#fbbf24" />
          <path d="M32 14.5 L32 49.5" stroke="#f4faf6" strokeWidth="2.5" opacity="0.9" />
          <path d="M14.5 32 L49.5 32" stroke="#f4faf6" strokeWidth="2.5" opacity="0.9" />
        </svg>
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
