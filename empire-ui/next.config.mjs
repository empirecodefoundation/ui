import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';
import { remarkCodeHike } from '@code-hike/mdx';
import nextra from 'nextra';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["pbs.twimg.com"],
    },
    reactStrictMode: true,
    experimental: {
        appDir: true,  // Enables the app directory if you use Next.js 13+ 
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx'
})

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm, [remarkCodeHike, { theme: 'css-variables' }]],
    },
});

export default withMDX(nextConfig);