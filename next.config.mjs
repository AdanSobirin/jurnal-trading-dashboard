/** @type {import('next').NextConfig} */
const nextConfig = {
  // Matikan pengecekan error Type saat build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Matikan pengecekan error ESLint saat build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;