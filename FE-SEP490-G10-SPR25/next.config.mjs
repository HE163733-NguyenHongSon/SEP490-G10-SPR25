// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
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
        },
        {
          protocol: 'https',
          hostname: 'suckhoedoisong.qltns.mediacdn.vn',
        }
      ],
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/guest',
            permanent: true,
          },
        ]
      },
  };
  
  export default nextConfig;
  