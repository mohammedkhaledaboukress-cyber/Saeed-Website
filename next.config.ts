import type { NextConfig } from "next";

/* STATIC_EXPORT=1 builds a self-contained folder (out/) for previews that
   are hosted as plain files. Normal builds keep the server redirect. */
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isExport
  ? {
      output: "export",
      images: { unoptimized: true },
    }
  : {
      async redirects() {
        return [{ source: "/", destination: "/ar", permanent: false }];
      },
    };

export default nextConfig;
