/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/:slug/recruit/permanent-apply",
        destination: "/:slug/recruit/permanent/apply",
        permanent: true,
      },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  images: {
    unoptimized: true,
    qualities: [100],
    domains: ["yatcuzdvcerijtlzevvf.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
