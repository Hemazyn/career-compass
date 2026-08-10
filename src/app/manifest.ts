import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Career Compass — Find your path, Nigeria",
    short_name: "CareerCompass",
    description:
      "Career guidance for Nigerian students — from JSS3 stream choice to post-NYSC pivots.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f9f6",
    theme_color: "#1c6f43",
    categories: ["education", "career"],
    lang: "en-NG",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
