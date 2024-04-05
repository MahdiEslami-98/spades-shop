/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  env: {
    BASE_URL: "http://localhost:8000/api",
    PRODUCT_IMG: "http://localhost:8000/images/products/images/",
    PRODUCT_THUMB: "http://localhost:8000/images/products/thumbnails/",
    CATEGORY_ICON: "http://localhost:8000/images/categories/icons/",
  },
};

export default nextConfig;
