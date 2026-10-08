import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse wraps pdfjs-dist, which spins up a worker file at runtime.
  // Left to the default webpack server bundler, that worker's relative
  // path lookup breaks once it's chunked ("Cannot find module
  // '.../pdf.worker.mjs'"). Marking it external keeps its files intact
  // under node_modules and loaded via plain require() instead.
  serverExternalPackages: ["pdf-parse", "pdfjs-dist"],
};

export default nextConfig;
