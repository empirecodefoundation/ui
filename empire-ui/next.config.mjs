import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";
import nextra from "nextra";
import path from "path";

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  components: { code: "Code" },
  syntaxHighlighting: {
    theme: "github-dark",
  },
};

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
  webpack: (config, { isServer }) => {
    // Handle .glb files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    
    // Fix for Windows permission issues - exclude system directories
    if (process.platform === 'win32') {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
          '**/C:/Users/*/AppData/Local/Temp/**',
          '**/C:/Windows/**',
          '**/C:/System Volume Information/**',
          '**/C:/pagefile.sys',
          '**/C:/hiberfil.sys',
          '**/WinSAT/**',
          '**/*WinSAT*/**',
        ]
      };
      
      // Also exclude these directories from file-watching
      config.infrastructureLogging = {
        level: 'error',
      };
    }
    
    return config;
  },
};

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, [remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    jsx: true,
  },
});

export default withMDX(nextConfig);
