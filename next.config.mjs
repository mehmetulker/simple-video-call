/** @type {import('next').NextConfig} */
const nextConfig = {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./*"],
    },
  },
};

export default nextConfig;
