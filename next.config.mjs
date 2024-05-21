/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "dkstatics-public.digikala.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
