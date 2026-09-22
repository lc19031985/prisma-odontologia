/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    // A exportação estática desativa o otimizador do next/image.
    // As imagens são pré-otimizadas por scripts/optimize-images.mjs (sharp).
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
