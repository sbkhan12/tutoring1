/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true, // Ensures static assets load correctly
    reactStrictMode: true,
    output: "export", // Ensures proper export for Netlify
    images: {
      unoptimized: true, // Fixes potential Next.js image issues on Netlify
    },
  };
  
  module.exports = nextConfig;
  