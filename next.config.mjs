/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/math-calculator',
          permanent: true,
        },
      ];
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "i.ibb.co",
          hostname:"i.giphy.com",
          port: "",
          pathname: "/**",
        },
      ],
    },
  };
  
  export default nextConfig;
  