"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f5f9f6", color: "#0d1a12", fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#1c6f43",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              marginBottom: 24,
            }}
          >
            🧭
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Something went off-course</h1>
          <p style={{ color: "#44584c", marginTop: 12, maxWidth: 420 }}>
            An unexpected error occurred. Please reload the page.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 28,
              background: "#1c6f43",
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "12px 24px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload page
          </button>
        </div>
      </body>
    </html>
  );
}
