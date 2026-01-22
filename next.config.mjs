/** @type {import('next').NextConfig} */
const nextConfig = {
  // Biarkan typescript ignore tetap ada (biasanya ini masih didukung)
  typescript: {
    ignoreBuildErrors: true,
  },
  // HAPUS BAGIAN ESLINT DARI SINI
};

export default nextConfig;