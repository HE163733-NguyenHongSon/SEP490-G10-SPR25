// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'via.placeholder.com',
        },
        {
          protocol: 'https',
          hostname: 'th.bing.com',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'randomuser.me',
        }
      ],
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/patient',
            permanent: true,
          },
          {
            source: '/guest',
            destination: '/patient',
            permanent: true,
          },
          {
            source: '/guest/:path*',
            destination: '/patient/:path*',
            permanent: true,
          }
        ]
      },
  };
  
  export default nextConfig;
  