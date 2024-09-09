/** @type {import('next').NextConfig} */
const nextConfig = {
  target: "serverless",
  env: {
    BASE_URL: "https://online-shop-backend-y1lp.onrender.com/api",
    PRODUCT_IMG:
      "https://online-shop-backend-y1lp.onrender.com/images/products/images/",
    PRODUCT_THUMB:
      "https://online-shop-backend-y1lp.onrender.com/images/products/thumbnails/",
    CATEGORY_ICON:
      "https://online-shop-backend-y1lp.onrender.com/images/categories/icons/",
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
