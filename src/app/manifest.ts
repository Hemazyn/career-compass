import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Career Compass — Find your path, Nigeria",
    short_name: "CareerCompass",
    description:
      "Career guidance for Nigerian students — from JSS3 stream choice to post-NYSC pivots.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f9f6",
    theme_color: "#1c6f43",
    categories: ["education", "career"],
    lang: "en-NG",
    // PNG only: launchers that can't rasterize an SVG manifest icon (common
    // on Android) fall back to showing a plain letter instead of the logo.
    // The browser-tab favicon still comes from src/app/icon.svg separately.
    icons: [
      {
        src: "/app-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/app-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
