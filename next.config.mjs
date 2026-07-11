/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Stray lockfiles higher in the filesystem otherwise make Next infer the
  // wrong workspace root, which breaks Turbopack file watching.
  turbopack: {
    root: import.meta.dirname,
  },
}

export default nextConfig
