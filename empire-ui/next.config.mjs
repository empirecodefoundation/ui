import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";
import { remarkCodeHike } from "@code-hike/mdx";
import nextra from "nextra";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    // No experimental options needed at this time
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, [remarkCodeHike, { theme: "github-dark" }]],
  },
});

export default withMDX(nextConfig);
